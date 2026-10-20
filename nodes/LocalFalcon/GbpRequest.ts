import { IDataObject, IExecuteFunctions, NodeOperationError } from 'n8n-workflow';
import { parseJsonParameter } from './GenericFunctions';

const GBP_BASE_URL = 'https://api.localfalcon.com/v2/gbp/';

/**
 * Confirm tokens the API demands for irreversible operations, keyed by
 * `${resource}.${operation}`. Update Open Status is handled separately because
 * its token is only required when the status is CLOSED_PERMANENTLY.
 */
export const GBP_CONFIRM_TOKENS: Record<string, string> = {
	'gbpPost.delete': 'DELETE_POST',
	'gbpMedia.delete': 'DELETE_MEDIA',
	'gbpLink.delete': 'DELETE_LINK',
	'gbpReview.deleteReply': 'DELETE_REPLY',
	'gbpProfile.setAttributes': 'SET_ATTRIBUTES',
	'gbpService.replace': 'REPLACE_SERVICES',
};

const CONFIRM_LABELS: Record<string, string> = {
	'gbpPost.delete': 'Delete Post',
	'gbpMedia.delete': 'Delete Media',
	'gbpLink.delete': 'Delete Link',
	'gbpReview.deleteReply': 'Delete Reply',
	'gbpProfile.setAttributes': 'Set Attributes',
	'gbpService.replace': 'Replace Services',
	'gbpProfile.updateStatus': 'Update Open Status to Closed Permanently',
};

export interface IGbpRequest {
	endpoint: string;
	body: IDataObject;
}

/** Remove filter-style booleans that are false, so only `true` ever reaches the API. */
function dropFalseFlags(body: IDataObject, keys: string[]): void {
	for (const key of keys) {
		if (body[key] !== true) delete body[key];
	}
}

function isBlank(value: unknown): boolean {
	return value === undefined || value === null || String(value).trim() === '';
}

/**
 * Build the endpoint and form body for a Google Business Profile operation.
 * Irreversible operations are refused here, before any request is made, unless
 * the user has enabled the confirmation toggle on the node.
 */
export function buildGbpRequest(
	this: IExecuteFunctions,
	resource: string,
	operation: string,
	i: number,
): IGbpRequest {
	const body: IDataObject = {
		place_id: this.getNodeParameter('placeId', i) as string,
	};
	let path = '';

	const fail = (message: string, description?: string): never => {
		throw new NodeOperationError(this.getNode(), message, { itemIndex: i, description });
	};
	const collection = (name: string): IDataObject =>
		this.getNodeParameter(name, i, {}) as IDataObject;
	const json = (name: string, label: string) => parseJsonParameter.call(this, name, i, label);

	const readServices = (): IDataObject[] => {
		const { service = [] } = collection('services') as { service?: IDataObject[] };
		if (service.length === 0) fail('Add at least one service');
		return service.map((entry) => {
			if (isBlank(entry.name) && isBlank(entry.service_type_id)) {
				fail('Each service needs a Name or a Service Type ID');
			}
			let price: unknown = entry.price;
			if (typeof price === 'string') {
				price = price.trim() === '' ? undefined : JSON.parse(price);
			}
			return {
				name: entry.name,
				service_type_id: entry.service_type_id,
				description: entry.description,
				price,
			} as IDataObject;
		});
	};

	const readPostFields = (): void => {
		body.summary = this.getNodeParameter('summary', i, '');
		const cta = collection('callToAction') as { button?: IDataObject };
		if (cta.button) body.call_to_action = cta.button;
		const media = collection('media') as { item?: IDataObject[] };
		if (media.item && media.item.length > 0) body.media = media.item;
		body.event = json('event', 'Event (JSON)');
		body.offer = json('offer', 'Offer (JSON)');
	};

	if (resource === 'gbpProfile') {
		switch (operation) {
			case 'getDetails':
				path = 'location';
				break;
			case 'getGoogleUpdated':
				path = 'google-updated';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'getVerification':
				path = 'verification';
				break;
			case 'getMetrics':
				path = 'metrics';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'getAttributes':
				path = 'attributes';
				break;
			case 'listAttributeMetadata':
				path = 'attribute-metadata';
				Object.assign(body, collection('additionalFields'));
				dropFalseFlags(body, ['show_all']);
				break;
			case 'searchCategories':
				path = 'categories';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'searchChains':
				path = 'chains';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'setAttributes': {
				path = 'update-attributes';
				const attributes = json('attributes', 'Attributes (JSON)');
				if (!Array.isArray(attributes) || attributes.length === 0) {
					fail('Attributes (JSON) must be a non-empty array of attributes');
				}
				body.attributes = attributes;
				break;
			}
			case 'updateDetails': {
				path = 'update-location';
				body.updates = json('updates', 'Updates (JSON)');
				Object.assign(body, collection('additionalFields'));
				if (body.updates === undefined && isBlank(body.clear) && isBlank(body.replace)) {
					fail('Provide Updates (JSON), or a Clear or Replace field');
				}
				break;
			}
			case 'updateHours': {
				path = 'update-hours';
				const { period = [] } = collection('regularHours') as { period?: IDataObject[] };
				if (period.length > 0) body.regular = period;
				body.special = json('special', 'Special Hours (JSON)');
				Object.assign(body, collection('additionalFields'));
				if (body.regular === undefined && body.special === undefined && isBlank(body.clear)) {
					fail('Provide Regular Hours, Special Hours (JSON) or a Clear field');
				}
				break;
			}
			case 'updateStatus':
				path = 'update-status';
				body.status = this.getNodeParameter('status', i);
				Object.assign(body, collection('additionalFields'));
				break;
			default:
				break;
		}
	} else if (resource === 'gbpPost') {
		switch (operation) {
			case 'list':
				path = 'posts';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'get':
				path = 'posts';
				body.post_id = this.getNodeParameter('postId', i);
				break;
			case 'create': {
				path = 'create-post';
				body.topic_type = this.getNodeParameter('topicType', i);
				readPostFields();
				Object.assign(body, collection('additionalFields'));
				if (body.topic_type === 'EVENT' && body.event === undefined) {
					fail('Event (JSON) is required when Topic Type is Event');
				}
				if (body.topic_type === 'OFFER' && body.offer === undefined) {
					fail('Offer (JSON) is required when Topic Type is Offer');
				}
				break;
			}
			case 'update':
				path = 'update-post';
				body.post_id = this.getNodeParameter('postId', i);
				readPostFields();
				Object.assign(body, collection('updateFields'));
				break;
			case 'delete':
				path = 'delete-post';
				body.post_id = this.getNodeParameter('postId', i);
				break;
			default:
				break;
		}
	} else if (resource === 'gbpMedia') {
		switch (operation) {
			case 'list':
				path = 'media';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'listCustomerMedia':
				path = 'customer-media';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'get':
				path = 'media';
				body.media_id = this.getNodeParameter('mediaId', i);
				break;
			case 'add':
				path = 'create-media';
				body.media_format = this.getNodeParameter('mediaFormat', i);
				body.source_url = this.getNodeParameter('sourceUrl', i);
				body.category = this.getNodeParameter('category', i);
				Object.assign(body, collection('additionalFields'));
				break;
			case 'updateCategory':
				path = 'update-media';
				body.media_id = this.getNodeParameter('mediaId', i);
				body.category = this.getNodeParameter('category', i);
				break;
			case 'delete':
				path = 'delete-media';
				body.media_id = this.getNodeParameter('mediaId', i);
				break;
			default:
				break;
		}
	} else if (resource === 'gbpReview') {
		switch (operation) {
			case 'list':
				path = 'reviews';
				Object.assign(body, collection('additionalFields'));
				dropFalseFlags(body, ['unanswered']);
				break;
			case 'get':
				path = 'reviews';
				body.review_id = this.getNodeParameter('reviewId', i);
				break;
			case 'reply':
				path = 'reply-review';
				body.review_id = this.getNodeParameter('reviewId', i);
				body.reply = this.getNodeParameter('reply', i);
				break;
			case 'deleteReply':
				path = 'delete-review-reply';
				body.review_id = this.getNodeParameter('reviewId', i);
				break;
			default:
				break;
		}
	} else if (resource === 'gbpLink') {
		switch (operation) {
			case 'list':
				path = 'links';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'listActionTypes':
				path = 'action-types';
				Object.assign(body, collection('additionalFields'));
				break;
			case 'get':
				path = 'links';
				body.link_id = this.getNodeParameter('linkId', i);
				break;
			case 'add':
				path = 'create-link';
				body.action_type = this.getNodeParameter('actionType', i);
				Object.assign(body, collection('additionalFields'));
				break;
			case 'update':
				path = 'update-link';
				body.link_id = this.getNodeParameter('linkId', i);
				Object.assign(body, collection('updateFields'));
				break;
			case 'delete':
				path = 'delete-link';
				body.link_id = this.getNodeParameter('linkId', i);
				break;
			default:
				break;
		}
	} else if (resource === 'gbpService') {
		switch (operation) {
			case 'list':
				path = 'services';
				break;
			case 'add':
				path = 'add-services';
				body.services = readServices();
				break;
			case 'replace':
				path = 'replace-services';
				body.services = readServices();
				break;
			case 'remove': {
				path = 'remove-services';
				const names = (this.getNodeParameter('names', i, []) as string[]).filter(
					(name) => !isBlank(name),
				);
				if (names.length === 0) fail('Add at least one service name to remove');
				body.names = names;
				break;
			}
			default:
				break;
		}
	}

	if (path === '') {
		fail(`The operation "${operation}" is not supported for resource "${resource}"`);
	}

	// ---- Irreversible operations: refuse to call the API unless the user opted in ----
	const confirmKey = `${resource}.${operation}`;
	let confirmToken = GBP_CONFIRM_TOKENS[confirmKey];
	if (confirmKey === 'gbpProfile.updateStatus' && body.status === 'CLOSED_PERMANENTLY') {
		confirmToken = 'CLOSED_PERMANENTLY';
	}
	if (confirmToken !== undefined) {
		const confirmed = this.getNodeParameter('confirmAction', i, false) as boolean;
		if (confirmed !== true) {
			fail(
				`"${CONFIRM_LABELS[confirmKey]}" is irreversible and has not been confirmed`,
				'Enable the confirmation toggle on this operation to run it. No request was sent.',
			);
		}
		body.confirm = confirmToken;
	}

	return { endpoint: `${GBP_BASE_URL}${path}/`, body };
}

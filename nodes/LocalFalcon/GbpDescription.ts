import { INodeProperties } from 'n8n-workflow';

// ============================================================================
// Google Business Profile resources
//
// Every operation here acts on the live Google Business Profile behind a
// location connected to a Google account in Local Falcon, and is keyed on the
// Google Place ID of that location. Irreversible operations carry a warning
// notice and a confirmation toggle; the request builder refuses to run them
// until the toggle is enabled.
// ============================================================================

export const gbpOperations: INodeProperties[] = [
	// Google Business Profile Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
			},
		},
		options: [
			{
				name: 'Get Attributes',
				value: 'getAttributes',
				description: 'List the attributes currently set on the profile',
				action: 'Get business profile attributes',
			},
			{
				name: 'Get Details',
				value: 'getDetails',
				description: 'Get the live profile details as Google provides them',
				action: 'Get business profile details',
			},
			{
				name: 'Get Google Updated Version',
				value: 'getGoogleUpdated',
				description:
					'Get the version of the profile Google holds, with the fields that differ from yours',
				action: 'Get the updated version of a business profile',
			},
			{
				name: 'Get Performance Metrics',
				value: 'getMetrics',
				description: 'Get daily performance metrics for the profile',
				action: 'Get business profile performance metrics',
			},
			{
				name: 'Get Verification Status',
				value: 'getVerification',
				description: 'Get the verification standing of the profile',
				action: 'Get business profile verification status',
			},
			{
				name: 'List Available Attributes',
				value: 'listAttributeMetadata',
				description: 'List the attributes available for a category and region',
				action: 'List available business profile attributes',
			},
			{
				name: 'Search Categories',
				value: 'searchCategories',
				description: 'Search the business profile category list',
				action: 'Search business profile categories',
			},
			{
				name: 'Search Chains',
				value: 'searchChains',
				description: 'Search the business chain list',
				action: 'Search business profile chains',
			},
			{
				name: 'Set Attributes',
				value: 'setAttributes',
				description:
					'Set attributes on the profile. Attributes can be set or changed but not removed.',
				action: 'Set business profile attributes',
			},
			{
				name: 'Update Details',
				value: 'updateDetails',
				description: 'Update profile details such as title, phone, website or description',
				action: 'Update business profile details',
			},
			{
				name: 'Update Hours',
				value: 'updateHours',
				description: 'Update the regular or special hours of the profile',
				action: 'Update business profile hours',
			},
			{
				name: 'Update Open Status',
				value: 'updateStatus',
				description: 'Mark the profile open, temporarily closed or permanently closed',
				action: 'Update business profile open status',
			},
		],
		default: 'getDetails',
	},

	// Google Business Profile Post Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpPost'],
			},
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Publish a post to the profile',
				action: 'Create a business profile post',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently delete a post from the profile',
				action: 'Delete a business profile post',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single post by ID',
				action: 'Get a business profile post',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the posts published to the profile',
				action: 'List business profile posts',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update an existing post on the profile',
				action: 'Update a business profile post',
			},
		],
		default: 'list',
	},

	// Google Business Profile Media Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Add a photo or video to the profile',
				action: 'Add business profile media',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently delete a photo or video from the profile',
				action: 'Delete business profile media',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single media item by ID',
				action: 'Get a business profile media item',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the photos and videos on the profile',
				action: 'List business profile media',
			},
			{
				name: 'List Customer Media',
				value: 'listCustomerMedia',
				description: 'List the photos customers have added to the profile',
				action: 'List business profile customer media',
			},
			{
				name: 'Update Category',
				value: 'updateCategory',
				description: 'Move a photo or video into a different category',
				action: 'Update the category of a business profile media item',
			},
		],
		default: 'list',
	},

	// Google Business Profile Review Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpReview'],
			},
		},
		options: [
			{
				name: 'Delete Reply',
				value: 'deleteReply',
				description: 'Permanently delete the reply on a review',
				action: 'Delete a business profile review reply',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single review by ID',
				action: 'Get a business profile review',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List live reviews for one or more connected locations',
				action: 'List business profile reviews',
			},
			{
				name: 'Reply',
				value: 'reply',
				description: 'Publish a reply to a review',
				action: 'Reply to a business profile review',
			},
		],
		default: 'list',
	},

	// Google Business Profile Link Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpLink'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Add an action link, such as a booking or ordering button',
				action: 'Add a business profile action link',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Permanently delete an action link',
				action: 'Delete a business profile action link',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a single action link by ID',
				action: 'Get a business profile action link',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the action links on the profile',
				action: 'List business profile action links',
			},
			{
				name: 'List Action Types',
				value: 'listActionTypes',
				description: 'List the action link types the location is allowed to use',
				action: 'List available business profile action link types',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Change an action link',
				action: 'Update a business profile action link',
			},
		],
		default: 'list',
	},

	// Google Business Profile Service Operations
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpService'],
			},
		},
		options: [
			{
				name: 'Add',
				value: 'add',
				description: 'Add services to the profile, keeping the ones already there',
				action: 'Add business profile services',
			},
			{
				name: 'List',
				value: 'list',
				description: 'List the services on the profile',
				action: 'List business profile services',
			},
			{
				name: 'Remove',
				value: 'remove',
				description: 'Remove named services from the profile, keeping the rest',
				action: 'Remove business profile services',
			},
			{
				name: 'Replace',
				value: 'replace',
				description: 'Replace the entire service list. Everything not in the list is discarded.',
				action: 'Replace all business profile services',
			},
		],
		default: 'list',
	},
];

export const gbpFields: INodeProperties[] = [
	// ===== SHARED =====
	{
		displayName: 'Place ID',
		name: 'placeId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpLink', 'gbpMedia', 'gbpPost', 'gbpProfile', 'gbpReview', 'gbpService'],
			},
		},
		default: '',
		description:
			'Google Place ID of a location connected to a Google account in Local Falcon. Use Location → List with GBP Linked enabled to find eligible locations. Google Business Profile Review → List accepts up to 10 comma-separated Place IDs.',
	},

	// ===== GOOGLE BUSINESS PROFILE FIELDS =====

	// Get Google Updated Version
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['getGoogleUpdated'],
			},
		},
		options: [
			{
				displayName: 'Fields Mask',
				name: 'fields_mask',
				type: 'string',
				default: '',
				placeholder: 'title,phoneNumbers,regularHours',
				description:
					'Comma-separated Google field names to compare. Defaults to the same set as Get Details.',
			},
		],
	},

	// Get Performance Metrics
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['getMetrics'],
			},
		},
		options: [
			{
				displayName: 'End Date',
				name: 'end_date',
				type: 'string',
				default: '',
				placeholder: '2026-08-31',
				description: 'Last day to report (YYYY-MM-DD)',
			},
			{
				displayName: 'Metrics',
				name: 'metrics',
				type: 'string',
				default: '',
				placeholder: 'BUSINESS_IMPRESSIONS_DESKTOP_MAPS,CALL_CLICKS',
				description: 'Comma-separated metric names. Defaults to every available metric.',
			},
			{
				displayName: 'Start Date',
				name: 'start_date',
				type: 'string',
				default: '',
				placeholder: '2026-08-01',
				description: 'First day to report (YYYY-MM-DD)',
			},
		],
	},

	// List Available Attributes
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['listAttributeMetadata'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				placeholder: 'gcid:plumber',
				description: 'Category name including the gcid: prefix',
			},
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Language code. Defaults to en.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
			{
				displayName: 'Region Code',
				name: 'region_code',
				type: 'string',
				default: '',
				placeholder: 'US',
				description: 'Two letter country code. Defaults to the country of the location.',
			},
			{
				displayName: 'Show All',
				name: 'show_all',
				type: 'boolean',
				default: false,
				description: 'Whether to return every attribute rather than only those for the category',
			},
		],
	},

	// Search Categories
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['searchCategories'],
			},
		},
		options: [
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Language code. Defaults to en.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Names',
				name: 'names',
				type: 'string',
				default: '',
				placeholder: 'gcid:plumber,gcid:electrician',
				description: 'Comma-separated category names to look up directly instead of searching',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Text to search categories for',
			},
			{
				displayName: 'Region Code',
				name: 'region_code',
				type: 'string',
				default: '',
				placeholder: 'US',
				description: 'Two letter country code. Defaults to the country of the location.',
			},
		],
	},

	// Search Chains
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['searchChains'],
			},
		},
		options: [
			{
				displayName: 'Chain ID',
				name: 'chain_id',
				type: 'string',
				default: '',
				description: 'Retrieve a single chain instead of searching',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Query',
				name: 'query',
				type: 'string',
				default: '',
				description: 'Chain name to search for',
			},
		],
	},

	// Set Attributes
	{
		displayName:
			'Attributes can be set or changed but not removed: sending false records an explicit negative rather than clearing it. Identity attributes such as is_small_business are public claims about the business that this API cannot withdraw. Enable "Confirm Attribute Changes" to proceed.',
		name: 'setAttributesNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['setAttributes'],
			},
		},
	},
	{
		displayName: 'Attributes (JSON)',
		name: 'attributes',
		type: 'json',
		required: true,
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['setAttributes'],
			},
		},
		default: '[]',
		placeholder: '[{"name": "has_wifi", "values": [true]}]',
		description:
			'Array of attributes to set. Each entry has a name and one of values, set_values, unset_values or uris. Use List Available Attributes to discover accepted names and values.',
	},
	{
		displayName: 'Confirm Attribute Changes',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['setAttributes'],
			},
		},
		description:
			'Whether to set these attributes on the live profile. The node refuses to run until this is enabled.',
	},

	// Update Details
	{
		displayName: 'Updates (JSON)',
		name: 'updates',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateDetails'],
			},
		},
		default: '{}',
		placeholder:
			'{"title": "Example Plumbing Co.", "profile": {"description": "Family owned since 1998"}}',
		description:
			'Fields to update, keyed by Google field name. Fields you do not send are left as they are.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateDetails'],
			},
		},
		options: [
			{
				displayName: 'Clear',
				name: 'clear',
				type: 'string',
				default: '',
				placeholder: 'profile.description,websiteUri',
				description: 'Comma-separated field names to clear',
			},
			{
				displayName: 'Replace',
				name: 'replace',
				type: 'string',
				default: '',
				placeholder: 'categories',
				description: 'Comma-separated field names to write wholesale rather than merge',
			},
		],
	},

	// Update Hours
	{
		displayName: 'Regular Hours',
		name: 'regularHours',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Period',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateHours'],
			},
		},
		description: 'Regular weekly opening periods. Leave empty to keep the current regular hours.',
		options: [
			{
				name: 'period',
				displayName: 'Period',
				values: [
					{
						displayName: 'Open Day',
						name: 'open_day',
						type: 'options',
						options: [
							{ name: 'Friday', value: 'FRIDAY' },
							{ name: 'Monday', value: 'MONDAY' },
							{ name: 'Saturday', value: 'SATURDAY' },
							{ name: 'Sunday', value: 'SUNDAY' },
							{ name: 'Thursday', value: 'THURSDAY' },
							{ name: 'Tuesday', value: 'TUESDAY' },
							{ name: 'Wednesday', value: 'WEDNESDAY' },
						],
						default: 'MONDAY',
						description: 'Day the period opens',
					},
					{
						displayName: 'Open Time',
						name: 'open_time',
						type: 'string',
						default: '',
						placeholder: '09:00',
						description: 'Opening time in 24-hour HH:MM format',
					},
					{
						displayName: 'Close Day',
						name: 'close_day',
						type: 'options',
						options: [
							{ name: 'Friday', value: 'FRIDAY' },
							{ name: 'Monday', value: 'MONDAY' },
							{ name: 'Saturday', value: 'SATURDAY' },
							{ name: 'Sunday', value: 'SUNDAY' },
							{ name: 'Thursday', value: 'THURSDAY' },
							{ name: 'Tuesday', value: 'TUESDAY' },
							{ name: 'Wednesday', value: 'WEDNESDAY' },
						],
						default: 'MONDAY',
						description: 'Day the period closes',
					},
					{
						displayName: 'Close Time',
						name: 'close_time',
						type: 'string',
						default: '',
						placeholder: '17:00',
						description: 'Closing time in 24-hour HH:MM format. Use 24:00 for the end of the day.',
					},
				],
			},
		],
	},
	{
		displayName: 'Special Hours (JSON)',
		name: 'special',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateHours'],
			},
		},
		default: '',
		placeholder: '[{"start_date": {"year": 2026, "month": 12, "day": 25}, "closed": true}]',
		description:
			'Array of special hour periods, each keyed by date. Sending one date does not disturb the others. Leave empty to keep the current special hours.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateHours'],
			},
		},
		options: [
			{
				displayName: 'Clear',
				name: 'clear',
				type: 'string',
				default: '',
				placeholder: 'special',
				description: 'Comma-separated hours to clear: regular and/or special',
			},
			{
				displayName: 'Replace',
				name: 'replace',
				type: 'string',
				default: '',
				placeholder: 'regular',
				description:
					'Comma-separated hours to write wholesale rather than merge: regular and/or special',
			},
		],
	},

	// Update Open Status
	{
		displayName: 'Status',
		name: 'status',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateStatus'],
			},
		},
		options: [
			{ name: 'Open', value: 'OPEN' },
			{ name: 'Closed Temporarily', value: 'CLOSED_TEMPORARILY' },
			{ name: 'Closed Permanently', value: 'CLOSED_PERMANENTLY' },
		],
		default: 'OPEN',
		description: 'The open status to set on the profile',
	},
	{
		displayName:
			'A permanent closure is very hard to undo through Google and should be treated as final. Enable "Confirm Permanent Closure" to proceed.',
		name: 'closePermanentlyNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateStatus'],
				status: ['CLOSED_PERMANENTLY'],
			},
		},
	},
	{
		displayName: 'Confirm Permanent Closure',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateStatus'],
				status: ['CLOSED_PERMANENTLY'],
			},
		},
		description:
			'Whether to mark the business permanently closed on Google. The node refuses to run until this is enabled.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpProfile'],
				operation: ['updateStatus'],
			},
		},
		options: [
			{
				displayName: 'Opening Date',
				name: 'opening_date',
				type: 'string',
				default: '',
				placeholder: '2026-11-01',
				description: 'Optional opening date (YYYY-MM-DD)',
			},
		],
	},

	// ===== GOOGLE BUSINESS PROFILE POST FIELDS =====

	{
		displayName: 'Post ID',
		name: 'postId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['delete', 'get', 'update'],
			},
		},
		default: '',
		description: 'ID of the post, as returned by List',
	},
	{
		displayName: 'Topic Type',
		name: 'topicType',
		type: 'options',
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create'],
			},
		},
		options: [
			{ name: 'Standard', value: 'STANDARD' },
			{ name: 'Event', value: 'EVENT' },
			{ name: 'Offer', value: 'OFFER' },
			{ name: 'Alert', value: 'ALERT' },
		],
		default: 'STANDARD',
		description: 'The kind of post to publish',
	},
	{
		displayName: 'Summary',
		name: 'summary',
		type: 'string',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create', 'update'],
			},
		},
		default: '',
		description: 'Post text, up to 1500 characters',
	},
	{
		displayName: 'Call to Action',
		name: 'callToAction',
		type: 'fixedCollection',
		placeholder: 'Add Button',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create', 'update'],
			},
		},
		description: 'Optional button shown on the post',
		options: [
			{
				name: 'button',
				displayName: 'Button',
				values: [
					{
						displayName: 'Action Type',
						name: 'action_type',
						type: 'options',
						options: [
							{ name: 'Book', value: 'BOOK' },
							{ name: 'Call', value: 'CALL' },
							{ name: 'Learn More', value: 'LEARN_MORE' },
							{ name: 'Order', value: 'ORDER' },
							{ name: 'Shop', value: 'SHOP' },
							{ name: 'Sign Up', value: 'SIGN_UP' },
						],
						default: 'LEARN_MORE',
						description: 'What the button does',
					},
					{
						displayName: 'URL',
						name: 'url',
						type: 'string',
						default: '',
						description: 'Destination URL. Not used for Call.',
					},
				],
			},
		],
	},
	{
		displayName: 'Media',
		name: 'media',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Media Item',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create', 'update'],
			},
		},
		description:
			'Photos or videos attached to the post. On Update this replaces every media item on the post.',
		options: [
			{
				name: 'item',
				displayName: 'Media Item',
				values: [
					{
						displayName: 'Media Format',
						name: 'media_format',
						type: 'options',
						options: [
							{ name: 'Photo', value: 'PHOTO' },
							{ name: 'Video', value: 'VIDEO' },
						],
						default: 'PHOTO',
						description: 'Whether the item is a photo or a video',
					},
					{
						displayName: 'Source URL',
						name: 'source_url',
						type: 'string',
						default: '',
						description: 'Public URL Google can fetch the file from',
					},
				],
			},
		],
	},
	{
		displayName: 'Event (JSON)',
		name: 'event',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create'],
				topicType: ['EVENT'],
			},
		},
		default: '',
		description:
			'Event details as a JSON object with the title and schedule. Required when Topic Type is Event.',
	},
	{
		displayName: 'Offer (JSON)',
		name: 'offer',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create'],
				topicType: ['OFFER'],
			},
		},
		default: '',
		description:
			'Offer details as a JSON object, such as coupon code, terms and redeem URL. Required when Topic Type is Offer.',
	},
	{
		displayName: 'Event (JSON)',
		name: 'event',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Event details as a JSON object. Leave empty to keep the current event details.',
	},
	{
		displayName: 'Offer (JSON)',
		name: 'offer',
		type: 'json',
		typeOptions: {
			rows: 6,
		},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['update'],
			},
		},
		default: '',
		description: 'Offer details as a JSON object. Leave empty to keep the current offer details.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['create'],
			},
		},
		options: [
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Language code. Defaults to en.',
			},
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Replace',
				name: 'replace',
				type: 'string',
				default: '',
				placeholder: 'event,call_to_action',
				description: 'Comma-separated field names to write wholesale rather than merge',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
		],
	},
	{
		displayName:
			'Deleting a post removes it from the live Google Business Profile immediately and cannot be undone. Enable "Confirm Deletion" to proceed.',
		name: 'deletePostNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['delete'],
			},
		},
	},
	{
		displayName: 'Confirm Deletion',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpPost'],
				operation: ['delete'],
			},
		},
		description:
			'Whether to permanently delete this post. The node refuses to run until this is enabled.',
	},

	// ===== GOOGLE BUSINESS PROFILE MEDIA FIELDS =====

	{
		displayName: 'Media ID',
		name: 'mediaId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['delete', 'get', 'updateCategory'],
			},
		},
		default: '',
		description: 'ID of the media item, as returned by List',
	},
	{
		displayName: 'Media Format',
		name: 'mediaFormat',
		type: 'options',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['add'],
			},
		},
		options: [
			{ name: 'Photo', value: 'PHOTO' },
			{ name: 'Video', value: 'VIDEO' },
		],
		default: 'PHOTO',
		description: 'Whether the item is a photo or a video',
	},
	{
		displayName: 'Source URL',
		name: 'sourceUrl',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['add'],
			},
		},
		default: '',
		description: 'Public URL Google can fetch the file from',
	},
	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['add'],
			},
		},
		default: '',
		placeholder: 'INTERIOR',
		description: 'Category to file the item under, for example INTERIOR, EXTERIOR, LOGO or COVER',
	},
	{
		displayName: 'Category',
		name: 'category',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['updateCategory'],
			},
		},
		default: '',
		placeholder: 'INTERIOR',
		description:
			'New category, for example INTERIOR or EXTERIOR. COVER and PROFILE are not accepted here.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['add'],
			},
		},
		options: [
			{
				displayName: 'Description',
				name: 'description',
				type: 'string',
				default: '',
				description: 'Optional description. Cannot be changed later.',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Category',
				name: 'category',
				type: 'string',
				default: '',
				placeholder: 'INTERIOR',
				description: 'Filter by category, for example INTERIOR or LOGO',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['listCustomerMedia'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Media ID',
				name: 'media_id',
				type: 'string',
				default: '',
				description: 'Retrieve a single customer media item instead of a list',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
		],
	},
	{
		displayName:
			'Deleting a photo or video removes it from the live Google Business Profile and cannot be undone. Enable "Confirm Deletion" to proceed.',
		name: 'deleteMediaNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['delete'],
			},
		},
	},
	{
		displayName: 'Confirm Deletion',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpMedia'],
				operation: ['delete'],
			},
		},
		description:
			'Whether to permanently delete this media item. The node refuses to run until this is enabled.',
	},

	// ===== GOOGLE BUSINESS PROFILE REVIEW FIELDS =====

	{
		displayName: 'Review ID',
		name: 'reviewId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpReview'],
				operation: ['deleteReply', 'get', 'reply'],
			},
		},
		default: '',
		description: 'ID of the review, as returned by List',
	},
	{
		displayName: 'Reply',
		name: 'reply',
		type: 'string',
		required: true,
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['gbpReview'],
				operation: ['reply'],
			},
		},
		default: '',
		description:
			'Reply text to publish, up to 4096 characters. It is publicly visible immediately, and replaces any reply the review already has.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpReview'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token. Can only be used with a single Place ID.',
			},
			{
				displayName: 'Rating',
				name: 'rating',
				type: 'string',
				default: '',
				placeholder: '1,2',
				description: 'Comma-separated star ratings to include, from 1 to 5',
			},
			{
				displayName: 'Unanswered Only',
				name: 'unanswered',
				type: 'boolean',
				default: false,
				description: 'Whether to return only reviews that do not yet have a reply',
			},
		],
	},
	{
		displayName:
			'Deleting a reply removes it from public view and cannot be recovered. Enable "Confirm Reply Deletion" to proceed.',
		name: 'deleteReplyNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpReview'],
				operation: ['deleteReply'],
			},
		},
	},
	{
		displayName: 'Confirm Reply Deletion',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpReview'],
				operation: ['deleteReply'],
			},
		},
		description:
			'Whether to permanently delete the reply on this review. The node refuses to run until this is enabled.',
	},

	// ===== GOOGLE BUSINESS PROFILE LINK FIELDS =====

	{
		displayName: 'Link ID',
		name: 'linkId',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['delete', 'get', 'update'],
			},
		},
		default: '',
		description: 'ID of the action link, as returned by List',
	},
	{
		displayName: 'Action Type',
		name: 'actionType',
		type: 'string',
		required: true,
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['add'],
			},
		},
		default: '',
		placeholder: 'APPOINTMENT',
		description:
			'Action type the location supports, for example APPOINTMENT or FOOD_ORDERING. Use List Action Types to see the valid set.',
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['add'],
			},
		},
		options: [
			{
				displayName: 'Is Preferred',
				name: 'is_preferred',
				type: 'boolean',
				default: false,
				description: 'Whether this is the preferred link for its type',
			},
			{
				displayName: 'URI',
				name: 'uri',
				type: 'string',
				default: '',
				placeholder: 'https://www.example.com/book',
				description: 'Where the button sends people',
			},
		],
	},
	{
		displayName: 'Update Fields',
		name: 'updateFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['update'],
			},
		},
		options: [
			{
				displayName: 'Is Preferred',
				name: 'is_preferred',
				type: 'boolean',
				default: false,
				description: 'Whether this is the preferred link for its type',
			},
			{
				displayName: 'URI',
				name: 'uri',
				type: 'string',
				default: '',
				placeholder: 'https://www.example.com/book',
				description: 'New destination for the button',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['list'],
			},
		},
		options: [
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
		],
	},
	{
		displayName: 'Additional Fields',
		name: 'additionalFields',
		type: 'collection',
		placeholder: 'Add Field',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['listActionTypes'],
			},
		},
		options: [
			{
				displayName: 'Language',
				name: 'language',
				type: 'string',
				default: '',
				description: 'Language code. Defaults to en.',
			},
			{
				displayName: 'Limit',
				name: 'limit',
				type: 'number',
				typeOptions: {
					minValue: 1,
				},
				default: 50,
				description: 'Max number of results to return',
			},
			{
				displayName: 'Next Token',
				name: 'next_token',
				type: 'string',
				typeOptions: { password: true },
				default: '',
				description: 'Pagination token',
			},
		],
	},
	{
		displayName:
			'Deleting an action link removes it from the live Google Business Profile and cannot be undone. Enable "Confirm Deletion" to proceed.',
		name: 'deleteLinkNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['delete'],
			},
		},
	},
	{
		displayName: 'Confirm Deletion',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpLink'],
				operation: ['delete'],
			},
		},
		description:
			'Whether to permanently delete this action link. The node refuses to run until this is enabled.',
	},

	// ===== GOOGLE BUSINESS PROFILE SERVICE FIELDS =====

	{
		displayName:
			'Replacing services discards every service not present in the list you send, and they cannot be recovered. Enable "Confirm Replacement" to proceed.',
		name: 'replaceServicesNotice',
		type: 'notice',
		default: '',
		displayOptions: {
			show: {
				resource: ['gbpService'],
				operation: ['replace'],
			},
		},
	},
	{
		displayName: 'Services',
		name: 'services',
		type: 'fixedCollection',
		typeOptions: {
			multipleValues: true,
		},
		placeholder: 'Add Service',
		default: {},
		displayOptions: {
			show: {
				resource: ['gbpService'],
				operation: ['add', 'replace'],
			},
		},
		description: 'Each service needs either a Name or a Service Type ID',
		options: [
			{
				name: 'service',
				displayName: 'Service',
				values: [
					{
						displayName: 'Name',
						name: 'name',
						type: 'string',
						default: '',
						placeholder: 'Drain cleaning',
						description: 'Free-form service name. Provide this or a Service Type ID.',
					},
					{
						displayName: 'Service Type ID',
						name: 'service_type_id',
						type: 'string',
						default: '',
						placeholder: 'job_type_id:water_heater_repair',
						description: 'Google structured service type ID. Provide this or a Name.',
					},
					{
						displayName: 'Description',
						name: 'description',
						type: 'string',
						default: '',
						description: 'Optional service description',
					},
					{
						displayName: 'Price (JSON)',
						name: 'price',
						type: 'json',
						default: '',
						description: 'Optional price as a JSON object',
					},
				],
			},
		],
	},
	{
		displayName: 'Confirm Replacement',
		name: 'confirmAction',
		type: 'boolean',
		default: false,
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['gbpService'],
				operation: ['replace'],
			},
		},
		description:
			'Whether to replace the entire service list with the services above. The node refuses to run until this is enabled.',
	},
	{
		displayName: 'Service Names',
		name: 'names',
		type: 'string',
		required: true,
		typeOptions: {
			multipleValues: true,
			multipleValueButtonText: 'Add Name',
		},
		displayOptions: {
			show: {
				resource: ['gbpService'],
				operation: ['remove'],
			},
		},
		default: [],
		placeholder: 'Drain cleaning',
		description:
			'Names of the services to remove, matched without regard to case against the names returned by List',
	},
];

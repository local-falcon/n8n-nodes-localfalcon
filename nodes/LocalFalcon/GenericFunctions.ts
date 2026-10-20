import { IDataObject, IExecuteFunctions, NodeOperationError, jsonParse } from 'n8n-workflow';

/**
 * True for values the API should never receive: undefined, null, empty strings,
 * and arrays or objects whose every member is itself empty. Zero and false are
 * real values and are kept.
 */
function isEmptyValue(value: unknown): boolean {
	if (value === undefined || value === null || value === '') return true;
	if (Array.isArray(value)) return value.every(isEmptyValue);
	if (typeof value === 'object') return Object.values(value as IDataObject).every(isEmptyValue);
	return false;
}

/**
 * Recursively flatten a value into PHP-style bracket form fields, which is the
 * shape the Local Falcon API expects for array and object parameters
 * (services[0][name]=..., call_to_action[action_type]=..., names[0]=...).
 *
 * Empty values are dropped rather than sent blank, matching the behaviour the
 * node has always had for flat fields. Empty array entries are compacted so the
 * indices the API receives stay contiguous.
 */
export function appendFormValue(form: URLSearchParams, key: string, value: unknown): void {
	if (isEmptyValue(value)) return;
	if (Array.isArray(value)) {
		value
			.filter((entry) => !isEmptyValue(entry))
			.forEach((entry, index) => appendFormValue(form, `${key}[${index}]`, entry));
		return;
	}
	if (typeof value === 'object') {
		for (const [subKey, subValue] of Object.entries(value as IDataObject)) {
			appendFormValue(form, `${key}[${subKey}]`, subValue);
		}
		return;
	}
	if (typeof value === 'boolean') {
		form.append(key, value ? 'true' : 'false');
		return;
	}
	form.append(key, String(value));
}

/** Encode a request body as application/x-www-form-urlencoded, nesting included. */
export function toFormBody(body: IDataObject): string {
	const form = new URLSearchParams();
	for (const [key, value] of Object.entries(body)) {
		appendFormValue(form, key, value);
	}
	return form.toString();
}

/**
 * Read a JSON-typed node parameter. n8n hands back a string when the value was
 * typed into the editor, or an already-parsed object when an expression
 * resolved to one. Empty input yields undefined so the field is simply omitted.
 */
export function parseJsonParameter(
	this: IExecuteFunctions,
	name: string,
	itemIndex: number,
	label: string,
): IDataObject | IDataObject[] | undefined {
	const raw = this.getNodeParameter(name, itemIndex, '') as unknown;
	if (raw === undefined || raw === null) return undefined;
	if (typeof raw === 'object') return raw as IDataObject | IDataObject[];
	const text = String(raw).trim();
	if (text === '') return undefined;
	try {
		return jsonParse<IDataObject | IDataObject[]>(text);
	} catch {
		throw new NodeOperationError(this.getNode(), `${label} must be valid JSON`, { itemIndex });
	}
}

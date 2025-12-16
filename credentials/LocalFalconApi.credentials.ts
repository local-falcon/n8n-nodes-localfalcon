import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class LocalFalconApi implements ICredentialType {
	name = 'localFalconApi';
	displayName = 'Local Falcon API';
	documentationUrl = 'https://www.localfalcon.com/api/credentials/';
	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'Your Local Falcon API key. Generate it from the API Credentials page.',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://api.localfalcon.com',
			url: '/v2/account/',
			method: 'POST',
			body: {},
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
		},
	};
}

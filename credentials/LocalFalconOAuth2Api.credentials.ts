import {
	ICredentialType,
	Icon,
	INodeProperties,
} from 'n8n-workflow';

export class LocalFalconOAuth2Api implements ICredentialType {
	name = 'localFalconOAuth2Api';
	displayName = 'Local Falcon OAuth2 API';
	icon: Icon = 'file:localfalcon.svg';
	extends = ['oAuth2Api'];
	documentationUrl = 'https://www.localfalcon.com/api/credentials/';
	// The client_id and client_secret are statically assigned OAuth application
	// credentials from Local Falcon — they are not user secrets.
	properties: INodeProperties[] = [
		{
			displayName: 'Grant Type',
			name: 'grantType',
			type: 'hidden',
			default: 'authorizationCode',
		},
		{
			displayName: 'Authorization URL',
			name: 'authUrl',
			type: 'hidden',
			// Use the app host consistently: Local Falcon's "Sign in with Google"
			// redirects to https://app.localfalcon.com/oauth-v2/google, and the
			// PHPSESSID cookie is host-scoped (no Domain attribute). Sending users
			// to a different host loses the session across the Google round-trip.
			default: 'https://app.localfalcon.com/oauth-v2/authorize',
		},
		{
			displayName: 'Access Token URL',
			name: 'accessTokenUrl',
			type: 'hidden',
			default: 'https://app.localfalcon.com/oauth-v2/token',
		},
		{
			displayName: 'Client ID',
			name: 'clientId',
			type: 'hidden',
			default: '095581ed732e1ba32016.localfalconapps.com',
		},
		{
			displayName: 'Client Secret',
			name: 'clientSecret',
			type: 'hidden',
			typeOptions: {
				password: true,
			},
			default: '8e4f0a0729b6195d06c38a9bbe47704f4edb5538857ce213454ec5014e002884',
		},
		{
			displayName: 'Scope',
			name: 'scope',
			type: 'hidden',
			default: 'api',
		},
		{
			displayName: 'Auth URI Query Parameters',
			name: 'authQueryParameters',
			type: 'hidden',
			default: 'client_id=095581ed732e1ba32016.localfalconapps.com',
		},
		{
			displayName: 'Authentication',
			name: 'authentication',
			type: 'hidden',
			default: 'body',
		},
	];
}

import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	IDataObject,
	NodeOperationError,
} from 'n8n-workflow';

export class LocalFalcon implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Local Falcon',
		name: 'localFalcon',
		icon: 'file:localfalcon.svg',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Local Falcon API for local SEO rank tracking',
		defaults: {
			name: 'Local Falcon',
		},
		inputs: ['main'],
		outputs: ['main'],
		credentials: [
			{
				name: 'localFalconApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Scans',
						value: 'scan',
					},
					{
						name: 'Campaigns',
						value: 'campaign',
					},
					{
						name: 'Locations',
						value: 'location',
					},
					{
						name: 'Reports',
						value: 'report',
					},
					{
						name: 'Scheduled Scans',
						value: 'scheduledScan',
					},
					{
						name: 'Falcon Guard',
						value: 'falconGuard',
					},
					{
						name: 'Reviews Analysis',
						value: 'reviewsAnalysis',
					},
					{
						name: 'Account',
						value: 'account',
					},
				],
				default: 'scan',
			},

			// Scan Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['scan'],
					},
				},
				options: [
					{
						name: 'List Reports',
						value: 'listReports',
						description: 'List all scan reports',
						action: 'List scan reports',
					},
					{
						name: 'Get Report',
						value: 'getReport',
						description: 'Get scan report by key',
						action: 'Get a scan report',
					},
					{
						name: 'Run',
						value: 'run',
						description: 'Run a new scan',
						action: 'Run a scan',
					},
				],
				default: 'listReports',
			},

			// Campaign Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all campaigns',
						action: 'List campaigns',
					},
					{
						name: 'Get Report',
						value: 'getReport',
						description: 'Get campaign report',
						action: 'Get campaign report',
					},
					{
						name: 'Create',
						value: 'create',
						description: 'Create a new campaign',
						action: 'Create a campaign',
					},
					{
						name: 'Run',
						value: 'run',
						description: 'Run a campaign',
						action: 'Run a campaign',
					},
					{
						name: 'Pause',
						value: 'pause',
						description: 'Pause a campaign',
						action: 'Pause a campaign',
					},
					{
						name: 'Resume',
						value: 'resume',
						description: 'Resume a campaign',
						action: 'Resume a campaign',
					},
					{
						name: 'Reactivate',
						value: 'reactivate',
						description: 'Reactivate a campaign',
						action: 'Reactivate a campaign',
					},
					
				],
				default: 'list',
			},

			// Location Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['location'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all locations',
						action: 'List locations',
					},
					{
						name: 'Search',
						value: 'search',
						description: 'Search for locations',
						action: 'Search locations',
					},
					{
						name: 'Save',
						value: 'save',
						description: 'Save a location',
						action: 'Save a location',
					},
				],
				default: 'list',
			},

			// Report Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['report'],
					},
				},
				options: [
					{
						name: 'List Competitor Reports',
						value: 'listCompetitor',
						description: 'Get the list of competitor reports',
						action: 'List Competitor Reports',
					},
					{
						name: 'Get Competitor',
						value: 'getCompetitor',
						description: 'Get competitor report',
						action: 'Get competitor report',
					},
					{
						name: 'List Trend Reports',
						value: 'listTrend',
						description: 'Get the list of Trend reports',
						action: 'List Trend Reports',
					},
					{
						name: 'Get Trend',
						value: 'getTrend',
						description: 'Get trend report',
						action: 'Get trend report',
					},
					{
						name: 'List Keyword Reports',
						value: 'listKeyword',
						description: 'Get the list of Keyword reports',
						action: 'List Keyword Reports',
					},
					{
						name: 'Get Keyword',
						value: 'getKeyword',
						description: 'Get keyword report',
						action: 'Get keyword report',
					},
					{
						name: 'List Location Reports',
						value: 'listLocation',
						description: 'Get the list of Location reports',
						action: 'List Location Reports',
					},
					{
						name: 'Get Location',
						value: 'getLocation',
						description: 'Get location report',
						action: 'Get location report',
					},
					{
						name: 'Get Reviews',
						value: 'getReviews',
						description: 'Get reviews analysis report',
						action: 'Get reviews report',
					},
				],
				default: 'listCompetitor',
			},

			// Reviews Analysis Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['reviewsAnalysis'],
					},
				},
				options: [
					{
						name: 'List Reviews Analysis',
						value: 'listReviews',
						description: 'Get the list of Reviews Analysis reports',
						action: 'List Reviews Analysis',
					},
					{
						name: 'Get Reviews Report',
						value: 'getReviews',
						description: 'Get reviews analysis report',
						action: 'Get reviews analysis report',
					},
				],
				default: 'listReviews',
			},

			// Scheduled Scan Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['scheduledScan'],
					},
				},
				options: [
					{
						name: 'List',
						value: 'list',
						description: 'List all scheduled scans',
						action: 'List scheduled scans',
					},
				],
				default: 'list',
			},

			// Falcon Guard Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['falconGuard'],
					},
				},
				options: [
					{
						name: 'List Locations',
						value: 'listLocations',
						description: 'List all Falcon Guard protected locations',
						action: 'List Falcon Guard Locations',
					},
					{
						name: 'Get Falcon Guard Report',
						value: 'getGuardReport',
						description: 'Get specific Falcon Guard Report',
						action: 'Get specific Falcon Guard Report',
					},
					{
						name: 'Add Location',
						value: 'addLocation',
						description: 'Add location to Falcon Guard',
						action: 'Add location to Falcon Guard',
					},
					{
						name: 'Pause',
						value: 'pause',
						description: 'Pause Falcon Guard for location',
						action: 'Pause Falcon Guard',
					},
					{
						name: 'Resume',
						value: 'resume',
						description: 'Resume Falcon Guard for location',
						action: 'Resume Falcon Guard',
					},
					{
						name: 'Delete',
						value: 'delete',
						description: 'Delete location from Falcon Guard',
						action: 'Delete from Falcon Guard',
					},
				],
				default: 'listLocations',
			},

			// Account Operations
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				displayOptions: {
					show: {
						resource: ['account'],
					},
				},
				options: [
					{
						name: 'Get Info',
						value: 'getInfo',
						description: 'Get account information',
						action: 'Get account info',
					},
				],
				default: 'getInfo',
			},

			// ===== SCAN FIELDS =====

			// Run Scan Fields
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				options: [
					{ name: 'Google', value: 'google' },
					{ name: 'Apple Maps', value: 'apple' },
					{ name: 'ChatGPT', value: 'chatgpt' },
					{ name: 'Gemini', value: 'gemini' },
					{ name: 'Google AI Overview (GAIO)', value: 'giao' },
					{ name: 'Gemini Advanced (GAIO)', value: 'gaio' },
					{ name: 'Grok', value: 'grok' },
					{ name: 'AI Mode', value: 'aimode' },
				],
				default: 'google',
				description: 'The platform to scan on',
			},
			{
				displayName: 'Place ID',
				name: 'placeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				default: '',
				description: 'The platform-specific place ID for the location',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				default: '',
				description: 'The keyword to search for',
			},
			{
				displayName: 'Latitude',
				name: 'lat',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				default: '',
				description: 'Latitude coordinate for scan center',
			},
			{
				displayName: 'Longitude',
				name: 'lng',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				default: '',
				description: 'Longitude coordinate for scan center',
			},
			{
				displayName: 'Grid Size',
				name: 'gridSize',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				options: [
					{ name: '3x3', value: 3 },
					{ name: '5x5', value: 5 },
					{ name: '7x7', value: 7 },
					{ name: '9x9', value: 9 },
					{ name: '11x11', value: 11 },
					{ name: '13x13', value: 13 },
					{ name: '15x15', value: 15 },
					{ name: '17x17', value: 17 },
					{ name: '19x19', value: 19 },
					{ name: '21x21', value: 21 },
				],
				default: 3,
				description: 'The grid size for the scan',
			},
			{
				displayName: 'Radius',
				name: 'radius',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				default: 0.5,
				description: 'The radius from center point',
			},
			{
				displayName: 'Measurement',
				name: 'measurement',
				type: 'options',
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				options: [
					{ name: 'Miles', value: 'mi' },
					{ name: 'Kilometers', value: 'km' },
				],
				default: 'mi',
				description: 'Unit of measurement for radius',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['run'],
					},
				},
				options: [
					{
						displayName: 'AI Analyze',
						name: 'ai_analyze',
						type: 'boolean',
						default: false,
						description: 'Whether to include AI analysis',
					},
				],
			},

			// Get Scan Report Fields
			{
				displayName: 'Report Key',
				name: 'reportKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['getReport'],
					},
				},
				default: '',
				description: 'The unique report key',
			},

			// List Scan Reports Fields
			{
				displayName: 'Optional Filters',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Filter',
				default: {},
				displayOptions: {
					show: {
						resource: ['scan'],
						operation: ['listReports'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Place ID',
						name: 'place_id',
						type: 'string',
						default: '',
						description: 'Filter by place ID. Supports multiple Platform Place IDs, seperated by commas.',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter by keyword',
					},
					{
						displayName: 'Grid Size',
						name: 'grid_size',
						type: 'options',
						options: [
							{ name: '3x3', value: 3 },
							{ name: '5x5', value: 5 },
							{ name: '7x7', value: 7 },
							{ name: '9x9', value: 9 },
							{ name: '11x11', value: 11 },
							{ name: '13x13', value: 13 },
							{ name: '15x15', value: 15 },
							{ name: '17x17', value: 17 },
							{ name: '19x19', value: 19 },
							{ name: '21x21', value: 21 },
						],
						default: 3,
						description: 'Filter by grid size',
					},
					{
						displayName: 'Campaign Key',
						name: 'campaignKey',
						type: 'string',
						default: '',
						description: 'Filter only for scans from a specific Campaign',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'string',
						default: '',
						description: 'Expects either one or multiple values of aimode, apple, chatgpt, gaio, gemini, google, grok; seperated by commas.',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// ===== CAMPAIGN FIELDS =====

			// Create Campaign Fields
			{
				displayName: 'Campaign Name',
				name: 'campaignName',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Name for the campaign',
			},
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				options: [
					{ name: 'Google', value: 'google' },
					{ name: 'Apple Maps', value: 'apple' },
					{ name: 'ChatGPT', value: 'chatgpt' },
					{ name: 'Gemini', value: 'gemini' },
					{ name: 'Google AI Overview (GIAO)', value: 'giao' },
					{ name: 'Gemini Advanced (GAIO)', value: 'gaio' },
					{ name: 'Grok', value: 'grok' },
					{ name: 'AI Mode', value: 'aimode' },
				],
				default: 'google',
				description: 'The platform to scan on',
			},
			{
				displayName: 'Place ID',
				name: 'placeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The platform-specific place ID',
			},
			{
				displayName: 'Keyword',
				name: 'keyword',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'The keyword to track',
			},
			{
				displayName: 'Latitude',
				name: 'lat',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Latitude coordinate',
			},
			{
				displayName: 'Longitude',
				name: 'lng',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Longitude coordinate',
			},
			{
				displayName: 'Grid Size',
				name: 'gridSize',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				options: [
					{ name: '3x3', value: 3 },
					{ name: '5x5', value: 5 },
					{ name: '7x7', value: 7 },
					{ name: '9x9', value: 9 },
					{ name: '11x11', value: 11 },
					{ name: '13x13', value: 13 },
					{ name: '15x15', value: 15 },
					{ name: '17x17', value: 17 },
					{ name: '19x19', value: 19 },
					{ name: '21x21', value: 21 },
				],
				default: 3,
				description: 'The grid size',
			},
			{
				displayName: 'Radius',
				name: 'radius',
				type: 'number',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: 0.5,
				description: 'The radius from center',
			},
			{
				displayName: 'Measurement',
				name: 'measurement',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				options: [
					{ name: 'Miles', value: 'mi' },
					{ name: 'Kilometers', value: 'km' },
				],
				default: 'mi',
				description: 'Unit of measurement',
			},
			{
				displayName: 'Frequency',
				name: 'frequency',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				options: [
					{ name: 'One-Time', value: 'one-time' },
					{ name: 'Daily', value: 'daily' },
					{ name: 'Weekly', value: 'weekly' },
					{ name: 'Bi-Weekly', value: 'biweekly' },
					{ name: 'Monthly', value: 'monthly' },
				],
				default: 'weekly',
				description: 'How often to run the campaign',
			},
			{
				displayName: 'Start Date',
				name: 'startDate',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				default: '',
				description: 'Campaign start date (MM/DD/YYYY)',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['create'],
					},
				},
				options: [
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'Campaign end date (MM/DD/YYYY)',
					},
					{
						displayName: 'Time',
						name: 'time',
						type: 'string',
						default: '',
						description: 'Time to run (HH:MM format)',
					},
					{
						displayName: 'Timezone',
						name: 'timezone',
						type: 'string',
						default: '',
						description: 'Timezone for the campaign',
					},
					{
						displayName: 'AI Analyze',
						name: 'ai_analyze',
						type: 'boolean',
						default: false,
						description: 'Whether to include AI analysis',
					},
				],
			},

			// Campaign Key (for run, pause, resume, reactivate)
			{
				displayName: 'Campaign Key',
				name: 'campaignKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['run', 'pause', 'resume', 'reactivate'],
					},
				},
				default: '',
				description: 'The unique campaign key',
			},

			// List Campaigns Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Place ID',
						name: 'place_id',
						type: 'string',
						default: '',
						description: 'Filter by place ID',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Active', value: 'active' },
							{ name: 'Paused', value: 'paused' },
							{ name: 'Finished', value: 'finished' },
						],
						default: 'active',
						description: 'Filter by status',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// Campaign Report Fields
			{
				displayName: 'Campaign Report Key',
				name: 'campaignReportKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['getReport'],
					},
				},
				default: '',
				description: 'The unique campaign report key',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['campaign'],
						operation: ['getReport'],
					},
				},
				options: [
					{
						displayName: 'Field Mask',
						name: 'fieldmask',
						type: 'string',
						default: '',
						description: 'Comma-separated list of fields to return',
					},
				],
			},

			// ===== LOCATION FIELDS =====

			// Search Location Fields
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['search'],
					},
				},
				options: [
					{ name: 'Google', value: 'google' },
					{ name: 'Apple Maps', value: 'apple' },
				],
				default: 'google',
				description: 'The platform to search on',
			},
			{
				displayName: 'Business Name',
				name: 'name',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['search'],
					},
				},
				default: '',
				description: 'The Business Location Name you want to search for.',
			},
			{
				displayName: 'Proximity',
				name: 'proximity',
				type: 'string',
				required: false,
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['search'],
					},
				},
				default: '',
				description: 'To narrow your results, you can enter a city, state, country, etc.',
			},

			// Save Location Fields
			{
				displayName: 'Platform',
				name: 'platform',
				type: 'options',
				required: true,
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['save'],
					},
				},
				options: [
					{ name: 'Google', value: 'google' },
					{ name: 'Apple Maps', value: 'apple' },
				],
				default: 'google',
				description: 'The platform',
			},
			{
				displayName: 'Place ID',
				name: 'placeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['save'],
					},
				},
				default: '',
				description: 'The platform-specific place ID',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['save'],
					},
				},
				options: [
					{
						displayName: 'Store Code',
						name: 'store_code',
						type: 'string',
						default: '',
						description: 'Optional store code or identifier',
					},
				],
			},

			// List Locations Fields
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['location'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'options',
						options: [
							{ name: 'Google', value: 'google' },
							{ name: 'Apple', value: 'apple' },
						],
						default: '',
						description: 'Filter by platform',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// ===== REPORT FIELDS =====

			// Report Key for all report operations
			{
				displayName: 'Report Key',
				name: 'reportKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['report'],
						operation: ['getCompetitor', 'getTrend', 'getKeyword', 'getLocation', 'getReviews'],
					},
				},
				default: '',
				description: 'The unique report key',
			},

			// Additional fields for List of Competitor Reports
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['report'],
						operation: ['listCompetitor'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Place ID',
						name: 'place_id',
						type: 'string',
						default: '',
						description: 'Filter by place ID. Supports multiple Platform Place IDs, seperated by commas.',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter by keyword',
					},
					{
						displayName: 'Grid Size',
						name: 'grid_size',
						type: 'options',
						options: [
							{ name: '3x3', value: 3 },
							{ name: '5x5', value: 5 },
							{ name: '7x7', value: 7 },
							{ name: '9x9', value: 9 },
							{ name: '11x11', value: 11 },
							{ name: '13x13', value: 13 },
							{ name: '15x15', value: 15 },
							{ name: '17x17', value: 17 },
							{ name: '19x19', value: 19 },
							{ name: '21x21', value: 21 },
						],
						default: 3,
						description: 'Filter by grid size',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'string',
						default: '',
						description: 'Expects either one or multiple values of aimode, apple, chatgpt, gaio, gemini, google, grok; seperated by commas.',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// Additional fields for List of Trend Report
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['report'],
						operation: ['listTrend'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Place ID',
						name: 'place_id',
						type: 'string',
						default: '',
						description: 'Filter by place ID. Supports multiple Platform Place IDs, seperated by commas.',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter by keyword',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'string',
						default: '',
						description: 'Expects either one or multiple values of aimode, apple, chatgpt, gaio, gemini, google, grok; seperated by commas.',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// Additional fields for List of Keyword Report
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['report'],
						operation: ['listKeyword'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter by keyword',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'string',
						default: '',
						description: 'Expects either one or multiple values of aimode, apple, chatgpt, gaio, gemini, google, grok; seperated by commas.',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// Additional fields for List of Location Report
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['report'],
						operation: ['listLocation'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Place ID',
						name: 'place_id',
						type: 'string',
						default: '',
						description: 'Filter by place ID. Supports multiple Platform Place IDs, seperated by commas.',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter by keyword',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// ===== REVIEWS ANALYSIS FIELDS =====

			{
				displayName: 'Report Key',
				name: 'reportKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['reviewsAnalysis'],
						operation: ['getReviews'],
					},
				},
				default: '',
				description: 'The unique report key',
			},			
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['report'],
						operation: ['listLocation'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Reviews Key',
						name: 'reviewsKey',
						type: 'string',
						default: '',
						description: 'This parameter is used to target specific reports generated by a Reviews Analysis record',
					},
					{
						displayName: 'Frequency',
						name: 'frequency',
						type: 'options',
						options: [
							{ name: 'One-Time', value: 'one-time' },
							{ name: 'Daily', value: 'daily' },
							{ name: 'Weekly', value: 'weekly' },
							{ name: 'Bi-Weekly', value: 'biweekly' },
							{ name: 'Monthly', value: 'monthly' },
						],
						default: 'weekly',
						description: 'Filter by frequency',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// ===== SCHEDULED SCAN FIELDS =====

			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['scheduledScan'],
						operation: ['list'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Place ID',
						name: 'place_id',
						type: 'string',
						default: '',
						description: 'Filter by place ID',
					},
					{
						displayName: 'Keyword',
						name: 'keyword',
						type: 'string',
						default: '',
						description: 'Filter by keyword',
					},
					{
						displayName: 'Grid Size',
						name: 'grid_size',
						type: 'options',
						options: [
							{ name: '3x3', value: 3 },
							{ name: '5x5', value: 5 },
							{ name: '7x7', value: 7 },
							{ name: '9x9', value: 9 },
							{ name: '11x11', value: 11 },
							{ name: '13x13', value: 13 },
							{ name: '15x15', value: 15 },
							{ name: '17x17', value: 17 },
							{ name: '19x19', value: 19 },
							{ name: '21x21', value: 21 },
						],
						default: 3,
						description: 'Filter by grid size',
					},
					{
						displayName: 'Frequency',
						name: 'frequency',
						type: 'options',
						options: [
							{ name: 'One-Time', value: 'one-time' },
							{ name: 'Daily', value: 'daily' },
							{ name: 'Weekly', value: 'weekly' },
							{ name: 'Bi-Weekly', value: 'biweekly' },
							{ name: 'Monthly', value: 'monthly' },
						],
						default: 'weekly',
						description: 'Filter by frequency',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Scheduled', value: 'scheduled' },
							{ name: 'Paused', value: 'paused' },
						],
						default: 'scheduled',
						description: 'Filter by status',
					},
					{
						displayName: 'Platform',
						name: 'platform',
						type: 'string',
						default: '',
						description: 'Filter by platform (comma-separated)',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},

			// ===== FALCON GUARD FIELDS =====

			{
				displayName: 'Place ID',
				name: 'placeId',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['falconGuard'],
						operation: ['addLocation'],
					},
				},
				default: '',
				description: 'The Google place ID for the location',
			},
			{
				displayName: 'Falcon Guard Key',
				name: 'reportKey',
				type: 'string',
				required: true,
				displayOptions: {
					show: {
						resource: ['falconGuard'],
						operation: ['getGuardReport','pause', 'resume', 'delete'],
					},
				},
				default: '',
				description: 'Supports multiple Falcon Guard keys, separated by a comma.',
			},
			{
				displayName: 'Additional Fields',
				name: 'additionalFields',
				type: 'collection',
				placeholder: 'Add Field',
				default: {},
				displayOptions: {
					show: {
						resource: ['falconGuard'],
						operation: ['listLocations'],
					},
				},
				options: [
					{
						displayName: 'Limit',
						name: 'limit',
						type: 'number',
						default: 10,
						description: 'Number of results (1-100)',
					},
					{
						displayName: 'Start Date',
						name: 'start_date',
						type: 'string',
						default: '',
						description: 'Start date (MM/DD/YYYY)',
					},
					{
						displayName: 'End Date',
						name: 'end_date',
						type: 'string',
						default: '',
						description: 'End date (MM/DD/YYYY)',
					},
					{
						displayName: 'Status',
						name: 'status',
						type: 'options',
						options: [
							{ name: 'Protected', value: 'protected' },
							{ name: 'Paused', value: 'paused' },
						],
						default: 'protected',
						description: 'Filter results based on location\'s protection status.',
					},
					{
						displayName: 'Next Token',
						name: 'next_token',
						type: 'string',
						default: '',
						description: 'Pagination token',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];
		const credentials = await this.getCredentials('localFalconApi');

		const apiKey = credentials.apiKey as string;

		for (let i = 0; i < items.length; i++) {
			try {
				const resource = this.getNodeParameter('resource', i) as string;
				const operation = this.getNodeParameter('operation', i) as string;

				let endpoint = '';
				const body: IDataObject = {
					api_key: apiKey,
				};

				// Handle different resources and operations
				if (resource === 'scan') {
					if (operation === 'run') {
						endpoint = 'https://api.localfalcon.com/v2/scans/';
						body.platform = this.getNodeParameter('platform', i);
						body.place_id = this.getNodeParameter('placeId', i);
						body.keyword = this.getNodeParameter('keyword', i);
						body.lat = this.getNodeParameter('lat', i);
						body.lng = this.getNodeParameter('lng', i);
						body.grid_size = this.getNodeParameter('gridSize', i);
						body.radius = this.getNodeParameter('radius', i);
						body.measurement = this.getNodeParameter('measurement', i);

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);

					} else if (operation === 'getReport') {
						endpoint = 'https://api.localfalcon.com/v1/reports/';
						body.report_key = this.getNodeParameter('reportKey', i);

					} else if (operation === 'listReports') {
						endpoint = 'https://api.localfalcon.com/v1/reports/';

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
					}
				} else if (resource === 'campaign') {
					if (operation === 'create') {
						endpoint = 'https://api.localfalcon.com/v2/campaigns/create/';
						body.campaign_name = this.getNodeParameter('campaignName', i);
						body.platform = this.getNodeParameter('platform', i);
						body.place_id = this.getNodeParameter('placeId', i);
						body.keyword = this.getNodeParameter('keyword', i);
						body.lat = this.getNodeParameter('lat', i);
						body.lng = this.getNodeParameter('lng', i);
						body.grid_size = this.getNodeParameter('gridSize', i);
						body.radius = this.getNodeParameter('radius', i);
						body.measurement = this.getNodeParameter('measurement', i);
						body.frequency = this.getNodeParameter('frequency', i);
						body.start_date = this.getNodeParameter('startDate', i);

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);

					} else if (operation === 'run') {
						endpoint = 'https://api.localfalcon.com/v2/campaigns/run/';
						body.campaign_key = this.getNodeParameter('campaignKey', i);

					} else if (operation === 'pause') {
						endpoint = 'https://api.localfalcon.com/v2/campaigns/pause/';
						body.campaign_key = this.getNodeParameter('campaignKey', i);

					} else if (operation === 'resume') {
						endpoint = 'https://api.localfalcon.com/v2/campaigns/resume/';
						body.campaign_key = this.getNodeParameter('campaignKey', i);

					} else if (operation === 'reactivate') {
						endpoint = 'https://api.localfalcon.com/v2/campaigns/reactivate/';
						body.campaign_key = this.getNodeParameter('campaignKey', i);

					} else if (operation === 'list') {
						endpoint = 'https://api.localfalcon.com/v1/campaigns/';

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);

					} else if (operation === 'getReport') {
						endpoint = 'https://api.localfalcon.com/v1/campaigns/';
						body.report_key = this.getNodeParameter('campaignReportKey', i);

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
					}
				} else if (resource === 'location') {
					if (operation === 'search') {
						endpoint = 'https://api.localfalcon.com/v2/locations/search/';
						body.platform = this.getNodeParameter('platform', i);
						body.name = this.getNodeParameter('name', i);
						body.proximity = this.getNodeParameter('proximity', i);

					} else if (operation === 'save') {
						endpoint = 'https://api.localfalcon.com/v2/locations/save/';
						body.platform = this.getNodeParameter('platform', i);
						body.place_id = this.getNodeParameter('placeId', i);

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);

					} else if (operation === 'list') {
						endpoint = 'https://api.localfalcon.com/v1/locations/';

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
					}
				} else if (resource === 'report') {
										

					if (operation === 'getCompetitor' || operation == 'listCompetitor' ) {
						endpoint = 'https://api.localfalcon.com/v1/competitor-reports/';

						if( operation == 'getCompetitor' ){
							var reportKey = this.getNodeParameter('reportKey', i);
							body.report_key = reportKey;
						} else{
							var additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
							Object.assign(body, additionalFields);
						}

					} else if (operation === 'getTrend' || operation == 'listTrend') {
						endpoint = 'https://api.localfalcon.com/v1/trend-reports/';

						if( operation == 'getTrend' ){
							var reportKey = this.getNodeParameter('reportKey', i);
							body.report_key = reportKey;
						} else{
							var additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
							Object.assign(body, additionalFields);
						}

					} else if (operation === 'getKeyword' || operation == 'listKeyword') {
						endpoint = 'https://api.localfalcon.com/v1/keyword-reports/';

						if( operation == 'getKeyword' ){
							var reportKey = this.getNodeParameter('reportKey', i);
							body.report_key = reportKey;
						} else{
							var additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
							Object.assign(body, additionalFields);
						}
						
					} else if (operation === 'getLocation' || operation == 'listLocation') {
						endpoint = 'https://api.localfalcon.com/v1/location-reports/';

						if( operation == 'getLocation' ){
							var reportKey = this.getNodeParameter('reportKey', i);
							body.report_key = reportKey;
						} else{
							var additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
							Object.assign(body, additionalFields);
						}
					}
				} else if (resource === 'scheduledScan') {
					if (operation === 'list') {
						endpoint = 'https://api.localfalcon.com/v1/autoscans/';

						const additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
					}
				} else if (resource === 'falconGuard') {

					if (operation === 'addLocation') {
						body.place_id = this.getNodeParameter('placeId', i);
						endpoint = 'https://api.localfalcon.com/v2/guard/add/';

					} else if (operation === 'pause') {
						body.report_key = this.getNodeParameter('reportKey', i);
						endpoint = 'https://api.localfalcon.com/v2/guard/pause/';

					} else if (operation === 'resume') {
						body.report_key = this.getNodeParameter('reportKey', i);
						endpoint = 'https://api.localfalcon.com/v2/guard/resume/';

					} else if (operation === 'delete') {
						body.report_key = this.getNodeParameter('reportKey', i);
						endpoint = 'https://api.localfalcon.com/v2/guard/delete/';
					} else if ( operation === 'listLocations' ){
						var additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
						endpoint = 'https://api.localfalcon.com/v1/guard/';	
					} else if ( operation == 'getGuardReport' ){
						body.place_id = this.getNodeParameter('reportKey', i);
						endpoint = 'https://api.localfalcon.com/v1/guard/';
					}
				} else if( resource === 'reviewsAnalysis'){
					endpoint = 'https://api.localfalcon.com/v1/reviews/';

					if( operation == 'getReviews' ){
						var reportKey = this.getNodeParameter('reportKey', i);
						body.report_key = reportKey;
					} else{
						var additionalFields = this.getNodeParameter('additionalFields', i, {}) as IDataObject;
						Object.assign(body, additionalFields);
					}
				} else if (resource === 'account') {
					if (operation === 'getInfo') {
						endpoint = 'https://api.localfalcon.com/v2/account/';
					}
				}

				// Convert body to FormData
				const formData = new URLSearchParams();
				for (const key in body) {
					if (body[key] !== undefined && body[key] !== null && body[key] !== '') {
						formData.append(key, String(body[key]));
					}
				}

				// Make the API request
				const response = await this.helpers.httpRequest({
					method: 'POST',
					url: endpoint,
					body: formData.toString(),
					headers: {
						'Content-Type': 'application/x-www-form-urlencoded',
					},
				});

				returnData.push({
					json: response as IDataObject,
					pairedItem: { item: i },
				});

			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({
						json: {
							error: 'error',
						},
						pairedItem: { item: i },
					});
					continue;
				}
				throw error;
			}
		}

		return [returnData];
	}
}

# n8n-nodes-localfalcon

This is an n8n community node that lets you use [Local Falcon](https://www.localfalcon.com) in your n8n workflows.

Local Falcon is a local SEO rank tracking platform that helps businesses monitor their visibility in Google Maps, Apple Maps, and other local search platforms.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

### Manual Installation

1. Install the package in your n8n installation:
```bash
npm install @local-falcon/n8n-nodes-localfalcon
```

2. Restart your n8n instance

3. The Local Falcon node will now be available in the nodes panel

## Operations

This node supports the following resources and operations:

### Scan
- **List Reports**: List all scan reports with filtering
- **Get Report**: Retrieve scan report by key
- **Run**: Execute a new scan


### Campaign
- **List**: List all campaigns
- **Get Report**: Get campaign report
- **Create**: Create a new automated campaign
- **Run**: Manually run a campaign
- **Pause**: Pause a campaign
- **Resume**: Resume a paused campaign
- **Reactivate**: Reactivate a finished campaign

### Location
- **List**: List all saved locations
- **Search**: Search for business locations
- **Save**: Save a location to your account

### Report
- **List Competitor Reports**: Get the list of competitor reports
- **Get Competitor**: Get competitor report
- **List Trend Reports**: Get the list of trend reports
- **Get Trend**: Get trend analysis
- **List Keyword Reports**: Get the list of keyword reports
- **Get Keyword**: Get keyword analysis
- **List Location Reports**: Get the list of location reports
- **Get Location**: Get location analysis

### Scheduled Scan
- **List**: List all scheduled scans

### Falcon Guard
- **List Locations**: List all Falcon Guard protected locations
- **Get Falcon Guard Report**: Get specific Falcon Guard Report
- **Add Location**: Add location to monitoring
- **Pause**: Pause monitoring
- **Resume**: Resume monitoring
- **Delete**: Remove from monitoring

### Reviews Analysis
- **List Reviews Analysis**: Get the list of Reviews Analysis reports
- **Get Reviews Report**: Get reviews analysis report

### Account
- **Get Info**: Get account information

### Google Business Profile

These resources read and write the live Google Business Profile behind a connected location, not Local Falcon report data. Every operation needs the Google Place ID of a location that is connected to a Google account in Local Falcon. Use **Location → List** with the **GBP Linked** filter enabled to find eligible locations.

#### Google Business Profile
- **Get Details**: Get the live profile as Google provides it
- **Get Google Updated Version**: Get Google's version of the profile and the fields that differ from yours
- **Get Verification Status**: Verification standing, including whether Google will accept writes
- **Get Performance Metrics**: Daily performance metrics for a date range
- **Get Attributes** / **List Available Attributes** / **Set Attributes**: Read, discover and set profile attributes
- **Search Categories** / **Search Chains**: Look up Google categories and chains
- **Update Details**: Update profile fields such as title, phone, website or description
- **Update Hours**: Update regular or special hours
- **Update Open Status**: Mark the profile open, temporarily closed or permanently closed

#### Google Business Profile Post
- **List** / **Get** / **Create** / **Update** / **Delete** posts

#### Google Business Profile Media
- **List** / **Get** / **Add** / **Update Category** / **Delete** owner media
- **List Customer Media**: Photos customers have added (read only)

#### Google Business Profile Review
- **List** / **Get** live reviews, with filters for rating and unanswered reviews
- **Reply**: Publish a reply to a review (replaces any existing reply)
- **Delete Reply**: Remove a reply from public view

#### Google Business Profile Link
- **List** / **Get** / **Add** / **Update** / **Delete** action links (booking, ordering and similar buttons)
- **List Action Types**: The link types the location is allowed to use

#### Google Business Profile Service
- **List** / **Add** / **Remove** / **Replace** services

#### Confirmation for irreversible operations

Delete Post, Delete Media, Delete Link, Delete Reply, Set Attributes, Replace Services, and Update Open Status when the status is Closed Permanently cannot be undone. Each of these shows a warning in the node and a confirmation toggle that is off by default. While the toggle is off the node fails with an error before sending any request (with "Continue On Fail" enabled the item carries the error and still sends nothing). When it is on, the node sends the confirmation token the Local Falcon API requires for that operation. The toggle cannot be set from an expression or by an AI agent, so a person has to enable it on each node.

Array and object parameters are sent to the API as indexed form fields. Structured fields are provided where the shape is documented (services, regular hours, call to action, post media); open-ended shapes (profile updates, post event and offer details, special hours, attributes) are entered as JSON. List operations accept a limit of 1 to 100 (reviews: 1 to 50).

## Credentials

This node supports two authentication methods:

### OAuth2 (Recommended)

OAuth2 is the default and recommended authentication method. It uses Local Falcon's OAuth 2.0 authorization code flow with pre-configured application credentials — no manual setup required.

1. Add the Local Falcon node to your workflow
2. Select **OAuth2** as the authentication method (selected by default)
3. Click **Create New Credential** under "Local Falcon OAuth2 API"
4. Click **Sign in with Local Falcon** to authorize via the OAuth consent screen
5. Once authorized, the credential is ready to use

### API Key

You can also authenticate using a Local Falcon API key.

1. Generate your API key from the [Local Falcon API Credentials page](https://www.localfalcon.com/api/credentials/)
2. Add the Local Falcon node to your workflow
3. Select **API Key** as the authentication method
4. Enter your API key in the credential configuration

## Compatibility

Tested with n8n version 1.0.0 and above.

## Usage

### Basic Scan Example

1. Add the Local Falcon node to your workflow
2. Choose your authentication method (OAuth2 or API Key)
3. Select "Scan" as the resource
4. Select "Run" as the operation
5. Configure the scan parameters:
   - Platform (Google, Apple Maps, etc.)
   - Place ID
   - Keyword
   - Latitude/Longitude
   - Grid size (3x3 to 21x21)
   - Radius and measurement unit

### Campaign Example

1. Add the Local Falcon node
2. Select "Campaign" as the resource
3. Select "Create" as the operation
4. Configure campaign settings including frequency (daily, weekly, monthly)

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [Local Falcon API Documentation](https://www.localfalcon.com/api/)
* [Local Falcon Website](https://www.localfalcon.com)

## Supported Platforms

- Google Maps
- Apple Maps
- ChatGPT
- Gemini / Gemini Advanced
- Google AI Overview (GIAO)
- Grok
- AI Mode

## Features

- Grid-based rank tracking (3x3 to 21x21 grids)
- Configurable radius (0.1 to 100 miles/km)
- Automated campaigns with multiple frequencies
- Field masking for optimized API responses
- Pagination support
- AI-powered analysis integration
- Comprehensive reporting (competitors, trends, keywords, locations, reviews)

## License

[MIT](LICENSE.md)

## Version History

### 1.2.0
- Added Google Business Profile management (six resources covering all 33 `/v2/gbp/*` endpoints)
- Irreversible operations require a confirmation toggle and fail before any request while it is off
- Added the GBP Linked filter to Location → List

### 1.1.0
- Added OAuth2 authentication support (authorization code flow)
- OAuth2 is now the default authentication method
- API Key authentication remains supported as an alternative
- Pre-configured OAuth application credentials for seamless setup

### 1.0.0
- Initial release
- Support for all major Local Falcon API endpoints
- Full CRUD operations for scans, campaigns, locations
- Comprehensive reporting capabilities
- Falcon Guard integration

## Support

For issues or questions:
- [GitHub Issues](https://github.com/local-falcon/n8n-nodes-localfalcon/issues)
- [n8n Community Forum](https://community.n8n.io)
- [Local Falcon Support](https://www.localfalcon.com/support/)

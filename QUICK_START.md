# Quick Start Guide - Local Falcon n8n Node

## Prerequisites

- Node.js 18+ installed
- n8n installed (locally or via npm)
- Local Falcon API key

## Step 1: Build the Node

```bash
cd D:\PYM\Repositories\Containers\n8n-nodes-localfalcon
npm install
npm run build
```

## Step 2: Link to n8n (Development)

### Windows:
```bash
npm link
cd %USERPROFILE%\.n8n\
npm link n8n-nodes-localfalcon
```

### Linux/Mac:
```bash
npm link
cd ~/.n8n/
npm link n8n-nodes-localfalcon
```

## Step 3: Restart n8n

```bash
n8n restart
```

Or if running manually:
```bash
npx n8n
```

## Step 4: Test the Node

1. Open n8n (usually at http://localhost:5678)
2. Create a new workflow
3. Search for "Local Falcon" in the nodes panel
4. Add the node to your canvas

## Step 5: Configure Credentials

1. Click on the Local Falcon node
2. Click "Credential to connect with"
3. Click "Create New Credential"
4. Select "Local Falcon API"
5. Enter your API key from https://www.localfalcon.com/api/credentials/
6. Click "Save"

## Step 6: Run Your First Scan

### Simple Test Configuration:

1. **Resource**: Scan
2. **Operation**: Run
3. **Platform**: Google
4. **Place ID**: Use the "Search Location" operation first to find your business
5. **Keyword**: Enter a relevant search term (e.g., "pizza near me")
6. **Latitude**: Your business latitude
7. **Longitude**: Your business longitude
8. **Grid Size**: 3 (for quick testing)
9. **Radius**: 0.5
10. **Measurement**: mi

Click **Execute Node** and view the results!

## Common Commands

### Development
```bash
npm run dev          # Watch mode for development
npm run build        # Build for production
npm run lint         # Check code quality
npm run lintfix      # Auto-fix linting issues
npm run format       # Format code with Prettier
```

### Debugging

If the node doesn't appear:
```bash
# Check if linked correctly
npm list -g --depth=0

# Rebuild
npm run build

# Restart n8n with logs
N8N_LOG_LEVEL=debug npx n8n
```

## Testing Workflow Template

```
1. Manual Trigger
   ↓
2. Local Falcon - Search Location
   - Resource: Location
   - Operation: Search
   - Query: "Your Business Name"
   ↓
3. Set Node (Extract place_id from search results)
   ↓
4. Local Falcon - Run Scan
   - Use place_id from previous step
   ↓
5. Local Falcon - Get Competitor Report
   - Use report_key from scan results
   ↓
6. Output (View results)
```

## Troubleshooting

### Node doesn't appear
- Check if build completed: `ls dist/nodes/LocalFalcon/`
- Verify symlink: `npm list -g --depth=0 | grep localfalcon`
- Restart n8n completely

### Build errors
```bash
rm -rf node_modules dist
npm install
npm run build
```

### Credential test fails
- Verify API key is correct
- Check internet connection
- Ensure no IP whitelist restrictions

## Next Steps

1. Read [USAGE_GUIDE.md](USAGE_GUIDE.md) for detailed examples
2. Check [README.md](README.md) for full documentation
3. Review [CONVERSION_SUMMARY.md](CONVERSION_SUMMARY.md) for technical details

## Getting Help

- **n8n Forum**: https://community.n8n.io
- **Local Falcon Support**: https://www.localfalcon.com/support/
- **GitHub Issues**: Report bugs and request features

## Publishing to npm (Optional)

When ready to publish:

1. Update package.json with your details
2. Create an npm account: https://www.npmjs.com/signup
3. Login: `npm login`
4. Publish: `npm publish`

After publishing, users can install via:
```bash
npm install n8n-nodes-localfalcon
```

Or through n8n UI:
- Settings > Community Nodes > Install > "n8n-nodes-localfalcon"

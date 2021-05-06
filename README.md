# Data Deduplication

[![CircleCI](https://circleci.com/gh/pepfar-datim/datim-dedupe.svg?style=shield&circle-token=52b3d21a2b722b25649f779288ea62060685d16d)](https://app.circleci.com/pipelines/github/pepfar-datim/datim-dedupe)

## Development
```
git clone <this repo> 
npm i
npm start
```

The web-server hosting DHIS2 instance has to have the following settings in `nginx.conf`:

```
location / {
    proxy_cookie_path / "/; secure; HttpOnly; SameSite=None";
}
```

## Configuration
```
src/config/*.json
```

## Testing
```
npm test             # Jest-based tests (unit/integration)
npm run test:cy     # Cypress-based tests (e2e)
```

## Deployment
- Manually via *App Management* module of DHIS2
- Via *appRepars* script from DATIM *Global* repo

## Technology Stack
- REACT
- create-react-app
- TypeScript
- Cypress
- Jest
- MaterialUI
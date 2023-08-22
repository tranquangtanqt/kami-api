# kami-api

## Clone source and install dependencies

- Clone the reposotory: `git clone https://github.com/tranquangtanqt/kami-api.git`
- Switch to repo folder: `cd kami-api`
- Install dependencies: `yarn` or `yarn install` or `npm install`

## Create a `.env` file

- Windows: `copy dev.env .env`
- Linux: `cp dev.env .env`

## Database

- Implements [Type-ORM](https://typeorm.io/) with a PostgresSQL database
- Set PostgresSQL database settings in `.env` copy

```
DB_HOST_POSTGRESQL=localhost
DB_PORT_POSTGRESQL=5432
DB_USERNAME_POSTGRESQL=postgres
DB_NAME_POSTGRESQL=sell-source
DB_PASSWORD_POSTGRESQL=654321
DB_LOGGING=DISABLED
```

- Start local mysql server and create new database
- Migrate database: `npm run migration:run`

## Running the app

- Yarn: `yarn start:dev`
- npm: `npm run start:dev`
- Open [http://localhost:3300/api](http://localhost:3300/api) to view it in the browser.

## Other

````bash
----------
# Migrate
---------
$ npm run migration:run
$ npm run migration:generate --name=create-users-table
$ npm run migration:create
$ npm run migration:revert

## CLI

```bash
# create module
$ nest g resource module/name_module --no-spec
````

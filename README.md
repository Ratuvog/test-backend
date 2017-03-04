#Backend

Frontend [here](https://github.com/Ratuvog/test-client)

## Stack
- Node@6
- koa@2
- json-schema
- Sequelize

## How to run
- `git clone https://github.com/Ratuvog/test-backend`
- `cd test-backend`
- `npm install`
- Replace development config of `database`, `host`, `username`, `password` in config/config.json
- `npm run migrate && npm run seed`
- `npm start`
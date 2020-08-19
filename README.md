### Development
1. Sequelize is setup following this tutorial https://dev.to/nedsoft/getting-started-with-sequelize-and-postgres-emp
1. If sequelize is not installed, globally, can use `npx sequelize-cli <command>`


### Database sequlize thingy
1. fresh migrate

```bash
npx sequelize-cli db:migrate:undo:all
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### to run the app
`npx nodemon`
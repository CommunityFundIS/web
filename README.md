# Community Fund

-![](https://codeship.com/projects/a4ad0b40-eac5-0134-c6ec-52c39acfad49/status?branch=master)

This project is based off [kriasoft/react-starter-kit](https://github.com/kriasoft/react-starter-kit)

To run the project:

1. [Install yarn](https://yarnpkg.com/lang/en/docs/install/) and [docker](https://store.docker.com/editions/community/docker-ce-desktop-mac?tab=description)
2. Run Install

        yarn install
3. Create a .env file

        export DB_HOST="localhost"
        export DB_PORT=5432
        export DB_NAME="communityfund"
        export DB_USER="communityfund_user"
        export DB_PASSWORD="communityfund_password"
        export JWT_SECRET="super_secret"
3. Run start

        yarn start:all

This will start the following:

+ The CommunityFund website - http://localhost:3001
+ [Browsersync](https://browsersync.io/) - http://localhost:3002. This is an awesome debugging tool.
+ GraphQL interface - http://localhost:3001/graphql
+ A postgres database running within a docker container

When running locally the database is run within a docker container. You can kill the local database (and flush all of the data) by running the following command:

      yarn db:stop

Commands:

+     yarn start - Start the node server.
+     yarn start: all - Start the local db, seed the db and start the node server.
+     yarn db:start - Start the local db.
+     yarn db:stop - Stop the local db.
+     yarn db:seed - Seed the local db.
+     yarn db:flush - Flush the local db.
+     yarn lint:js - Lint all the JS files
+     yarn lint:css - Lint all the CSS files

const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const initialiseData = require("./initial-data");
const User = require("./schemas/User.ts");
require("dotenv").config();

const PROJECT_NAME = "rattle-backend";
const adapterConfig = { mongoUri: process.env.DATABASE_URL };

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
});

keystone.createList("User", User);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    protectIdentities: process.env.NODE_ENV === "production",
    listKey: "User",
    identityField: "email",
    secretField: "password",
    initFirstItem: {
      fields: ["name", "email", "password"],
      // Todo: Add in initial roles
    },
  },
});

module.exports = {
  keystone,
  apps: [
    new GraphQLApp(),
    new AdminUIApp({
      name: PROJECT_NAME,
      enableDefaultRoute: true,
      authStrategy,
      // withAuth,
    }),
  ],
};

// const { config, createSchema } = require("@keystonejs/keystone/schema");

// const databaseUrl = process.env.DATABASE_URL;

// const sessionConfig = {
//   maxAge: 60 * 60 * 24 * 365,
//   secret: process.env.COOKIE_SECRET,
// };

// const { withAuth } = createAuth({
//   listKey: "User",
//   identityField: "email",
//   secretField: "password",
//   initFirstItem: {
//     fields: ["name", "email", "password"],
//     // Todo: Add in initial roles
//   },
// }

// exports.config = {
//   server: {
//     // cors: {
//     //   origin: [process.env.],
//     //    credentials: true,
//     // }
//   },
//   db: {
//     adapter: "mongoose",
//     url: databaseUrl,
//     // Todo: add data seeding here
//   },
//   lists: createSchema({
//     // Schema items go in here
//   }),
//   // This grants access to admin dashboard
//   ui: {
//     // Todo: change this for user roles
//     // isAccessAllowed: true,
//     isAccessAllowed: () => true,
//   },
//   // Todo: add session values here
// };

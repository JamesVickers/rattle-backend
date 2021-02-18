const { Keystone } = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const initialiseData = require("./initial-data");
const UserSchema = require("./schemas/User.ts");
const PostSchema = require("./schemas/Post.ts");
require("dotenv").config();

const PROJECT_NAME = "rattle-backend";
const adapterConfig = { mongoUri: process.env.DATABASE_URL };

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
});

keystone.createList("User", UserSchema);
keystone.createList("Post", PostSchema);

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    protectIdentities: process.env.NODE_ENV === "production",
    listKey: "User",
    identityField: "email",
    secretField: "password",
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
      // Add roles in here later is required in app
      // Only admin users granted access to the Keystone dashboard here at the moment
      isAccessAllowed: ({ authentication: { item: user } }) => {
        // console.log(user);
        return !!user && !!user.isAdmin;
      },
    }),
  ],
};

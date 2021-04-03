const {
  Keystone,
  // , config, createSchema
} = require("@keystonejs/keystone");
const { PasswordAuthStrategy } = require("@keystonejs/auth-password");
const { GraphQLApp } = require("@keystonejs/app-graphql");
const { AdminUIApp } = require("@keystonejs/app-admin-ui");
const { MongooseAdapter: Adapter } = require("@keystonejs/adapter-mongoose");
const initialiseData = require("./initial-data");
// const { extendGraphQlSchema } = require("./mutations/index.ts");
const UserSchema = require("./schemas/User.ts");
const UserImageSchema = require("./schemas/UserImage.ts");
const UserRoleSchema = require("./schemas/UserRole.ts");
const PostSchema = require("./schemas/Post.ts");
require("dotenv").config();

const PROJECT_NAME = "rattle-backend";
const adapterConfig = { mongoUri: process.env.DATABASE_URL };

// const sessionConfig = {
//   // how long should a user stay logged in
//   maxAge: 60 * 60 * 24 * 365,
//   secret: process.env.COOKIE_SECRET,
// };

const isAdmin = ({ authentication: { item: user } }) => {
  // console.log(user);
  return !!user && !!user.isAdmin;
};

const isLoggedIn = ({ authentication: { item: user } }) => {
  // console.log(user);
  return !!user;
};

const keystone = new Keystone({
  adapter: new Adapter(adapterConfig),
  onConnect: process.env.CREATE_TABLES !== "true" && initialiseData,
  // appVersion: {
  //   version: "1.0.0",
  //   addVersionToHttpHeaders: true,
  //   access: true,
  // },
  // cookie: {
  //   secure: process.env.NODE_ENV === "production", // Default to true in production
  //   maxAge: 1000 * 60 * 60 * 24 * 30, // 30 days
  //   sameSite: false,
  // },
  // cookieSecret: process.env.COOKIE_SECRET,
  // defaultAccess: {
  //   list: true,
  //   field: true,
  //   custom: true,
  // },
});

keystone.createList("User", {
  fields: UserSchema.fields,
  // access level for field type in Keystone backend, not front end access.
  access: {
    // set read access to isLoggedIn so a logged in user can query other users for search purposes in front end app
    read: isLoggedIn,
    // set create access to true so a new user can create an account from front end app
    create: true,
    update: isAdmin,
    delete: isAdmin,
  },
});
keystone.createList("UserImage", UserImageSchema);
keystone.createList("UserRole", UserRoleSchema);
keystone.createList("Post", {
  fields: PostSchema.fields,
  access: {
    read: true,
    create: true,
    update: true,
    delete: true,
    // create: isLoggedIn,
    // update: isLoggedIn,
    // delete: isLoggedIn,
  },
});

const authStrategy = keystone.createAuthStrategy({
  type: PasswordAuthStrategy,
  list: "User",
  config: {
    // protectIdentities: process.env.NODE_ENV === "production",
    // listKey: "User",
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
      isAccessAllowed: isAdmin,
    }),
    // extendGraphQlSchema,
  ],
};

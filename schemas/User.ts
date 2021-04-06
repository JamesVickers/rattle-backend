const {
  Text,
  Checkbox,
  Password,
  Relationship,
} = require("@keystonejs/fields");

// // Access control functions
// const userIsAdmin = ({ authentication: { item: user } }) =>
//   Boolean(user && user.isAdmin);
// const userOwnsItem = ({ authentication: { item: user } }) => {
//   if (!user) {
//     return false;
//   }
//   // Instead of a boolean, you can return a GraphQL query:
//   // https://www.keystonejs.com/api/access-control#graphqlwhere
//   return { id: user.id };
// };

// const userIsAdminOrOwner = (auth) => {
//   const isAdmin = access.userIsAdmin(auth);
//   const isOwner = access.userOwnsItem(auth);
//   return isAdmin ? isAdmin : isOwner;
// };

// const access = { userIsAdmin, userOwnsItem, userIsAdminOrOwner };

const userFields = {
  fields: {
    firstName: {
      type: Text,
      isRequired: true,
    },
    lastName: {
      type: Text,
      isRequired: true,
    },
    email: {
      type: Text,
      isUnique: true,
      isRequired: true,
    },
    password: {
      type: Password,
      isRequired: true,
    },
    profileImage: {
      type: Relationship,
      ref: "UserImage",
      // displayMode: "Cards",
      // cardFields: ["image", "altText"],
      // inlineCreate: { fields: ["image", "altText"] },
      // inlineEdit: { fields: ["image", "altText"] },
    },
    isAdmin: {
      type: Checkbox,
      default: false,
      // Field-level access controls
      // Here, we set more restrictive field access so a non-admin cannot make themselves admin.
      // access: {
      //   update: access.userIsAdmin,
      // },
    },
    role: {
      type: Relationship,
      ref: "UserRole.assignedTo",
      // TODO: add access control
    },
  },
};

module.exports = userFields;

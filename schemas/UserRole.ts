const { Text, Select, Relationship } = require("@keystonejs/fields");

const userRoleFields = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    assignedTo: {
      type: Relationship,
      // add this ref to User
      ref: "User.role",
      many: true,
      isRequired: true,
      //   itemView: {
      //     fieldMode: "read",
      //   }
    },
  },
};

module.exports = userRoleFields;

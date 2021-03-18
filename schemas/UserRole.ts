const { Text, Relationship, Checkbox } = require("@keystonejs/fields");
// const { permissionSchema } = require("./fields.ts");

const userRoleFields = {
  fields: {
    name: {
      type: Text,
      isRequired: true,
    },
    // ...permissionSchema,
    canManagePosts: {
      type: Checkbox,
      default: false,
      label: "User can Update and delete any post",
    },
    canSeeOtherUsers: {
      type: Checkbox,
      default: false,
      label: "User can query other users",
    },
    canManageUsers: {
      type: Checkbox,
      default: false,
      label: "User can Edit other users",
    },
    canManageRoles: {
      type: Checkbox,
      default: false,
      label: "User can CRUD roles",
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

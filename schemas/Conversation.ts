const { Text, Select, Relationship } = require("@keystonejs/fields");

const conversationFields = {
  fields: {
    title: {
      type: Text,
      isRequired: false,
    },
    member: {
      type: Relationship,
      ref: "User",
      many: false,
      isRequired: true,
    },
    // title?: string;
    // lastMessageText: string;
    // lastMessageId?: Id;
    // conversation_members?: ConversationMemberPick[];
    // allMembers?: ConversationMemberPick[];
  },
};

module.exports = conversationFields;

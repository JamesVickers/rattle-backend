// const { graphQLSchemaExtension } = require("@keystonejs/keystone/schema");

// // make a fake tagged graphql template literal to get syntax highlighting
// // String.raw takes in a tagged template litral e.g. backticks `` and returns the text thats inside of them
// const graphql = String.raw;

// const extendGraphQlSchema = graphQLSchemaExtension({
//   // typeDefs is method name, args and what it returns
//   typeDefs: graphql`
//     type Mutation {
//       addToConversation(postId: ID): ConversationItem
//     }
//   `,
//   // resolvers is links to Nodejs functions that will run when typeDefs are requested via the graphQL api
//   resolvers: {
//     Mutation: {
//       addToConversation() {
//         // custom code here
//         console.log("Add to conversation");
//       },
//     },
//   },
// });

// type IncrementPageViewsOutput {
//   # The new page views after the mutation.
//   currentViews: Int!

//   # The time and date when the page was viewed.
//   timestamp: String!
// }

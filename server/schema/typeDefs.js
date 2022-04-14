// IMPORT THE GQL TAGGED TEMPLATE FUNCTION
const { gql } = require('apollo-server-express');

// CREATE OUR TYPE-DEFS
const typeDefs = gql`

    type Query {
        me: User
    }
    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        saveBook(bookData: BookInput!): User
        removeBook(bookId: ID!): User
    }
`;

// EXPORT THE TYPE-DEFS
module.exports = typeDefs;
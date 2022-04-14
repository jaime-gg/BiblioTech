// IMPORT THE GQL TAGGED TEMPLATE FUNCTION
const { gql } = require('apollo-server-express');

// CREATE OUR TYPE-DEFS
const typeDefs = gql`
    type Auth {
        token: ID!
        user: User
    }
    type User {
        _id: ID!
        username: String!
        email: String
        bookCount: Int
        savedBooks: [Book]
    }
    type Book {
        bookId: ID!
        authors: [String]
        description: String
        image: String
        link: String
        title: String!
    }
    input BookInput {
        authors: [String]
        description: String!
        bookId: String!
        image: String
        link: String
        title: String!
    }

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
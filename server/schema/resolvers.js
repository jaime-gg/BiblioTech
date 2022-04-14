const { User, Thought } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

// BASED ON USER-CONTROLLER WE NEED
//  // QUERY: 
//      // PROFILE | VIEW SINGLE USER 
//  // MUTATIONS
//      // CREATE USER
//      // LOGIN
//      // SAVE BOOK
//      // REMOVE BOOK

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                // RETURN NON-SENSITIVE USER DATA 
                const userData = await User.findOne({ _id: context.user._id }).select('-__v -password');
                return userData;
            }
            // IF USER IS NOT LOGGED IN 
            throw new AuthenticationError('Not logged in');
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);
            // LOGIN NEW USER WITH NEW TOKEN
            return { token, user };
        },

        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            // IF THE EMAIL IS NOT RECOGNIZED THROW ERROR
            if (!user) {
                throw new AuthenticationError('Incorrect credentials');
            }
            // PASSWORD CHECKER
            const correctPw = await user.isCorrectPassword(password);
            // IF PASSWORD IS INCORRECT THROW ERROR
            if (!correctPw) {
                throw new AuthenticationError('Incorrect credentials');
            }
            const token = signToken(user);
            return { token, user };
        },

        // USE 'CONTEXT' TO PULL USER DATA
        saveBook: async (parent, { bookData }, context) => {
            if (context.user) {
                // IF LOGGED IN PUSH TO SAVED BOOKS
                const updatedUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedBooks: bookData } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },

        removeBook: async (parent, { bookId }, context) => {
            if (context.user) {
                // IF LOGGED IN PULL/DELETE FROM SAVED BOOKS
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedBooks: { bookId } } },
                    { new: true }
                );
                return updatedUser;
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    }
}; 

module.exports = resolvers;
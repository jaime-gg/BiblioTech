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

    },

};

module.exports = resolvers;
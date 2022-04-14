import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
    mutation login($email: String!, $password: String!) {

    }
`;

export const ADD_USER = gql`
    mutation addUser($username: String!, $email: String!, $password: String!) {

    }
`;

export const SAVE_BOOK = gql`
    mutation saveBook($bookData: BookInput!) {

    }
`;

export const REMOVE_BOOK = gql`
    mutation removeBook($bookId: ID!) {

    }
`;
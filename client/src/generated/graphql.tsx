import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  isUsernameFree: Scalars['Boolean'];
  isEmailFree: Scalars['Boolean'];
};


export type QueryIsUsernameFreeArgs = {
  username: Scalars['String'];
};


export type QueryIsEmailFreeArgs = {
  email: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  login: LoginResponse;
  register: RegisterResponse;
  sendEmailConfirmation: Scalars['Boolean'];
  verifyEmail: ResponseForLogin;
  sendResetPassword: Scalars['Boolean'];
  resetPassword: ResponseForLogin;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationSendEmailConfirmationArgs = {
  email: Scalars['String'];
};


export type MutationVerifyEmailArgs = {
  token: Scalars['String'];
};


export type MutationSendResetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  input: ResetPasswordInput;
};

export type LoginInput = {
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type ResetPasswordInput = {
  token: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  user: User;
  accessToken: Scalars['String'];
};

export type RegisterResponse = {
  __typename?: 'RegisterResponse';
  user: UserWithId;
};

export type ResponseForLogin = {
  __typename?: 'ResponseForLogin';
  user: User;
  accessToken: Scalars['String'];
};

export type UserWithId = {
  __typename?: 'UserWithId';
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
};

export type IsUsernameFreeQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type IsUsernameFreeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isUsernameFree'>
);

export type IsEmailFreeQueryVariables = Exact<{
  email: Scalars['String'];
}>;


export type IsEmailFreeQuery = (
  { __typename?: 'Query' }
  & Pick<Query, 'isEmailFree'>
);

export type LoginMutationVariables = Exact<{
  usernameOrEmail: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'LoginResponse' }
    & Pick<LoginResponse, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);

export type RegisterMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'RegisterResponse' }
    & { user: (
      { __typename?: 'UserWithId' }
      & Pick<UserWithId, 'id'>
    ) }
  ) }
);

export type SendEmailConfirmationMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendEmailConfirmationMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendEmailConfirmation'>
);

export type VerifyEmailMutationVariables = Exact<{
  token: Scalars['String'];
}>;


export type VerifyEmailMutation = (
  { __typename?: 'Mutation' }
  & { verifyEmail: (
    { __typename?: 'ResponseForLogin' }
    & Pick<ResponseForLogin, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);

export type SendResetPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type SendResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'sendResetPassword'>
);

export type ResetPasswordMutationVariables = Exact<{
  token: Scalars['String'];
  password: Scalars['String'];
}>;


export type ResetPasswordMutation = (
  { __typename?: 'Mutation' }
  & { resetPassword: (
    { __typename?: 'ResponseForLogin' }
    & Pick<ResponseForLogin, 'accessToken'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'firstName' | 'lastName' | 'email'>
    ) }
  ) }
);


export const IsUsernameFreeDocument = gql`
    query IsUsernameFree($username: String!) {
  isUsernameFree(username: $username)
}
    `;

/**
 * __useIsUsernameFreeQuery__
 *
 * To run a query within a React component, call `useIsUsernameFreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsUsernameFreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsUsernameFreeQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useIsUsernameFreeQuery(baseOptions: Apollo.QueryHookOptions<IsUsernameFreeQuery, IsUsernameFreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsUsernameFreeQuery, IsUsernameFreeQueryVariables>(IsUsernameFreeDocument, options);
      }
export function useIsUsernameFreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsUsernameFreeQuery, IsUsernameFreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsUsernameFreeQuery, IsUsernameFreeQueryVariables>(IsUsernameFreeDocument, options);
        }
export type IsUsernameFreeQueryHookResult = ReturnType<typeof useIsUsernameFreeQuery>;
export type IsUsernameFreeLazyQueryHookResult = ReturnType<typeof useIsUsernameFreeLazyQuery>;
export type IsUsernameFreeQueryResult = Apollo.QueryResult<IsUsernameFreeQuery, IsUsernameFreeQueryVariables>;
export const IsEmailFreeDocument = gql`
    query IsEmailFree($email: String!) {
  isEmailFree(email: $email)
}
    `;

/**
 * __useIsEmailFreeQuery__
 *
 * To run a query within a React component, call `useIsEmailFreeQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsEmailFreeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsEmailFreeQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useIsEmailFreeQuery(baseOptions: Apollo.QueryHookOptions<IsEmailFreeQuery, IsEmailFreeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<IsEmailFreeQuery, IsEmailFreeQueryVariables>(IsEmailFreeDocument, options);
      }
export function useIsEmailFreeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<IsEmailFreeQuery, IsEmailFreeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<IsEmailFreeQuery, IsEmailFreeQueryVariables>(IsEmailFreeDocument, options);
        }
export type IsEmailFreeQueryHookResult = ReturnType<typeof useIsEmailFreeQuery>;
export type IsEmailFreeLazyQueryHookResult = ReturnType<typeof useIsEmailFreeLazyQuery>;
export type IsEmailFreeQueryResult = Apollo.QueryResult<IsEmailFreeQuery, IsEmailFreeQueryVariables>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
  login(input: {usernameOrEmail: $usernameOrEmail, password: $password}) {
    user {
      id
      username
      firstName
      lastName
      email
    }
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      usernameOrEmail: // value for 'usernameOrEmail'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $email: String!, $password: String!, $firstName: String!, $lastName: String!) {
  register(
    input: {username: $username, email: $email, password: $password, firstName: $firstName, lastName: $lastName}
  ) {
    user {
      id
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, options);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const SendEmailConfirmationDocument = gql`
    mutation SendEmailConfirmation($email: String!) {
  sendEmailConfirmation(email: $email)
}
    `;
export type SendEmailConfirmationMutationFn = Apollo.MutationFunction<SendEmailConfirmationMutation, SendEmailConfirmationMutationVariables>;

/**
 * __useSendEmailConfirmationMutation__
 *
 * To run a mutation, you first call `useSendEmailConfirmationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendEmailConfirmationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendEmailConfirmationMutation, { data, loading, error }] = useSendEmailConfirmationMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendEmailConfirmationMutation(baseOptions?: Apollo.MutationHookOptions<SendEmailConfirmationMutation, SendEmailConfirmationMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendEmailConfirmationMutation, SendEmailConfirmationMutationVariables>(SendEmailConfirmationDocument, options);
      }
export type SendEmailConfirmationMutationHookResult = ReturnType<typeof useSendEmailConfirmationMutation>;
export type SendEmailConfirmationMutationResult = Apollo.MutationResult<SendEmailConfirmationMutation>;
export type SendEmailConfirmationMutationOptions = Apollo.BaseMutationOptions<SendEmailConfirmationMutation, SendEmailConfirmationMutationVariables>;
export const VerifyEmailDocument = gql`
    mutation VerifyEmail($token: String!) {
  verifyEmail(token: $token) {
    user {
      id
      username
      firstName
      lastName
      email
    }
    accessToken
  }
}
    `;
export type VerifyEmailMutationFn = Apollo.MutationFunction<VerifyEmailMutation, VerifyEmailMutationVariables>;

/**
 * __useVerifyEmailMutation__
 *
 * To run a mutation, you first call `useVerifyEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useVerifyEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [verifyEmailMutation, { data, loading, error }] = useVerifyEmailMutation({
 *   variables: {
 *      token: // value for 'token'
 *   },
 * });
 */
export function useVerifyEmailMutation(baseOptions?: Apollo.MutationHookOptions<VerifyEmailMutation, VerifyEmailMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<VerifyEmailMutation, VerifyEmailMutationVariables>(VerifyEmailDocument, options);
      }
export type VerifyEmailMutationHookResult = ReturnType<typeof useVerifyEmailMutation>;
export type VerifyEmailMutationResult = Apollo.MutationResult<VerifyEmailMutation>;
export type VerifyEmailMutationOptions = Apollo.BaseMutationOptions<VerifyEmailMutation, VerifyEmailMutationVariables>;
export const SendResetPasswordDocument = gql`
    mutation SendResetPassword($email: String!) {
  sendResetPassword(email: $email)
}
    `;
export type SendResetPasswordMutationFn = Apollo.MutationFunction<SendResetPasswordMutation, SendResetPasswordMutationVariables>;

/**
 * __useSendResetPasswordMutation__
 *
 * To run a mutation, you first call `useSendResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSendResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [sendResetPasswordMutation, { data, loading, error }] = useSendResetPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useSendResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SendResetPasswordMutation, SendResetPasswordMutationVariables>(SendResetPasswordDocument, options);
      }
export type SendResetPasswordMutationHookResult = ReturnType<typeof useSendResetPasswordMutation>;
export type SendResetPasswordMutationResult = Apollo.MutationResult<SendResetPasswordMutation>;
export type SendResetPasswordMutationOptions = Apollo.BaseMutationOptions<SendResetPasswordMutation, SendResetPasswordMutationVariables>;
export const ResetPasswordDocument = gql`
    mutation ResetPassword($token: String!, $password: String!) {
  resetPassword(input: {token: $token, password: $password}) {
    user {
      id
      username
      firstName
      lastName
      email
    }
    accessToken
  }
}
    `;
export type ResetPasswordMutationFn = Apollo.MutationFunction<ResetPasswordMutation, ResetPasswordMutationVariables>;

/**
 * __useResetPasswordMutation__
 *
 * To run a mutation, you first call `useResetPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useResetPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [resetPasswordMutation, { data, loading, error }] = useResetPasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useResetPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ResetPasswordMutation, ResetPasswordMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ResetPasswordMutation, ResetPasswordMutationVariables>(ResetPasswordDocument, options);
      }
export type ResetPasswordMutationHookResult = ReturnType<typeof useResetPasswordMutation>;
export type ResetPasswordMutationResult = Apollo.MutationResult<ResetPasswordMutation>;
export type ResetPasswordMutationOptions = Apollo.BaseMutationOptions<ResetPasswordMutation, ResetPasswordMutationVariables>;
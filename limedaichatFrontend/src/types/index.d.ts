import { authenticationApi } from "@/state/api/authenticationApi";
// Types will be defined here

//type for authApi related stuff

// for create api

/**
 * Type for authentication apu Declaration using createApi from redux toolkit query react
 * @author Sriram Sundar
 *
 * @export
 * @interface AuthenticationApi
 * @typedef {AuthenticationApi}
 */
export interface AuthenticationApi {
  /**
   * Post request for sign up endpoint from the LiMedAi Server
   * https://bump.sh/sriramprojects/doc/limedai/operation/operation-post-api-authentication-signup
   * @author Sriram Sundar
   *
   * @type {{
   *     mutation: {
   *       request: SignUpPayload;
   *       response: AuthResponse;
   *     };
   *   }}
   */
  postSignUp: {
    mutation: {
      request: SignUpPayload;
      response: AuthResponse;
    };
  };
  /**
   * Post request for sign in endpoint from the LiMedAi Server
   * https://bump.sh/sriramprojects/doc/limedai/operation/operation-post-api-authentication-signin
   * @author Sriram Sundar
   *
   * @type {{
   *     mutation: {
   *       request: SignInPayload;
   *       response: AuthResponse;
   *     };
   *   }}
   */
  postSignIn: {
    mutation: {
      request: SignInPayload;
      response: AuthResponse;
    };
  };
}

// payloads for AuthApi
/**
 * Payload structure for sign up endpoint from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @interface SignUpPayload
 * @typedef {SignUpPayload}
 */
declare interface SignUpPayload {
  /**
   * Email address to sign up to the platform
   * @author Sriram Sundar
   *
   * @type {string}
   */
  email: string;
  /**
   * password to sign up to the platform
   * @author Sriram Sundar
   *
   * @type {string}
   */
  password: string;
}

/**
 * Payload structure for sign in endpoint from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @interface SignInPayload
 * @typedef {SignInPayload}
 */
declare interface SignInPayload {
  /**
   * email address to log in with
   * @author Sriram Sundar
   *
   * @type {string}
   */
  email: string;
  /**
   * password for the corresponding email address
   * @author Sriram Sundar
   *
   * @type {string}
   */
  password: string;
}

// responses for AuthApi

/**
 * Auth response structure for sign up and sign in endpoints from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @interface AuthResponse
 * @typedef {AuthResponse}
 */
declare interface AuthResponse {
  /**
   * User object with id and email
   * @author Sriram Sundar
   *
   * @type {{
   *   user: {
   *     id: string;
   *     email: string;
   *   }
   * }}
   */
  data: {
    user: {
      id: string;
      email: string;
    };
  };
}

// types for state management
/**
 * User Information global state
 * @author Sriram Sundar
 *
 * @interface UserInformation
 * @typedef {UserInformation}
 */
declare interface UserInformation {
  /**
   * id of the user
   * @author Sriram Sundar
   *
   * @type {string}
   */
  id: string;
  /**
   * email of the user
   * @author Sriram Sundar
   *
   * @type {string}
   */
  email: string;
}

/**
 * Auth State which manages user state
 * @author Sriram Sundar
 *
 * @interface AuthState
 * @typedef {AuthState}
 */
declare interface AuthState {
  /**
   * possible states of user information
   * @author Sriram Sundar
   *
   * @type {(UserInformation | undefined)}
   */
  userInfo: UserInformation | undefined;
}

/**
 * Root state of the store
 * @author Sriram Sundar
 *
 * @interface RootState
 * @typedef {RootState}
 */
declare interface RootState {
  /**
   * auth state in the store from auth slice
   * @author Sriram Sundar
   *
   * @type {AuthState}
   */
  auth: AuthState;
  /**
   * authentication api reducer path in store
   * @author Sriram Sundar
   *
   * @type {ReturnType<typeof authenticationApi.reducer>}
   */
  [authenticationApi.reducerPath]: ReturnType<typeof authenticationApi.reducer>;
}

import { authenticationApi } from "@/state/api/authenticationApi";
import { store } from "@/state/store";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ReactNode } from "react";
import { textbooksApi } from "@/state/api/textbookApi";
// Types will be defined here

//api error Types
/**
 * Error response structure for the api endpoints from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @interface ErrorResponse
 * @typedef {ErrorResponse}
 */
declare interface ErrorResponse {
  /**
   * Error message from the server as per react redux toolkit query
   * @author Sriram Sundar
   *
   * @type {(FetchBaseQueryError | SerializedError)}
   */
  error: FetchBaseQueryError | SerializedError;
}

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
   *   user: UserInformation;
   * }}
   */
  data: {
    user: UserInformation;
  };
}

/**
 * response structure for updating the user profile information from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @interface avatarUpdateResponse
 * @typedef {avatarUpdateResponse}
 */
declare interface avatarUpdate {
  /**
   * url of the uploaded avatar image from the server
   * @author Sriram Sundar
   *
   * @type {{
   *     avatar: string;
   *   }}
   */
  data: {
    avatar: string;
  };
}

/**
 * response structure for updating the user profile information from the LiMedAi Server
 * taking error response into account as well

 * @author Sriram Sundar
 *
 * @typedef {avatarUpdateResponse}
 */
declare type avatarUpdateResponse = avatarUpdate | ErrorResponse;

/**
 * sucess response from the signout endpoint
 * @author Sriram Sundar
 *
 * @interface signOut
 * @typedef {signOut}
 */
declare interface signOut {
  /**
   * message sayong signed out sucessfully in chinese
   * @author Sriram Sundar
   *
   * @type {{
   *     message: string;
   *   }}
   */
  data: {
    message: string;
  };
}

/**
 * response structure for signut endpoint with sucess or error
 * @author Sriram Sundar
 *
 * @typedef {signOutResponse}
 */
declare type signOutResponse = signOut | ErrorResponse;

/**
 * Represents structure of the textbook as per the mongoose model
 * (excluding the stuff that is filtered out when sending the
 * response to the frotend)
 * @author Sriram Sundar
 *
 * @interface Textbook
 * @typedef {Textbook}
 */
declare interface Textbook {
  /**
   * title of the book
   * @author Sriram Sundar
   *
   * @type {string}
   */
  title: string;
  /**
   * author of the book
   * @author Sriram Sundar
   *
   * @type {string}
   */
  author: string;
  /**
   * description of the book
   * @author Sriram Sundar
   *
   * @type {string}
   */
  description: string;
}
/**
 * sucessful esponse structure for search textbooks endpoint
 * @author Sriram Sundar
 *
 * @interface searchTextbook
 * @typedef {searchTextbook}
 */
declare interface searchTextbook {
  /**
   * response structure for search textbooks endpoint
   * @author Sriram Sundar
   *
   * @type {{
   *     textbooks: string;
   *   }}
   */
  data: {
    textbooks: Textbook[];
  };
}

/**
 * response structure for search textbook endpoint taking error responses into account
 * @author Sriram Sundar
 *
 * @typedef {searchTextbookResponse}
 */
declare type searchTextbookResponse = searchTextbook | ErrorResponse;
/**
 * sucess resoibse for deleting avatar
 * @author Sriram Sundar
 *
 * @interface avatarDelete
 * @typedef {avatarDelete}
 */
declare interface avatarDelete {
  /**
   * body of the response from the server for delete avatar endpoint
   * @author Sriram Sundar
   *
   * @type {{
   *     message: string;
   *     deleted: boolean;
   *   }}
   */
  data: {
    message: string;
    deleted: boolean;
  };
}

/**
 * response structure for deleting the user avatar image from the LiMedAi Server
 * taking error response into account as well
 * @author Sriram Sundar
 *
 * @typedef {avatarDeleteResponse}
 */
declare type avatarDeleteResponse = avatarDelete | ErrorResponse;
/**
 * AuthApiResponse type for the response from the auth api endpoints from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @typedef {AuthApiResponse}
 */
declare type AuthApiResponse = AuthResponse | ErrorResponse;

/**
 * fetchUserInfoResponse type for the response from the fetch user info endpoint from the LiMedAi Server
 * @author Sriram Sundar
 *
 * @interface fetchUserInfoResponse
 * @typedef {fetchUserInfoResponse}
 */
declare interface fetchUserInfoResponse {
  /**
   * wether the request was successful or not
   * @author Sriram Sundar
   *
   * @type {boolean}
   */
  isSuccess: boolean;
  /**
   * user information object from the server
   * @author Sriram Sundar
   *
   * @type {{
   *     user: UserInformation;
   *   }}
   */
  data: {
    user: UserInformation;
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
  /**
   * profile picture of the user
   * @type {string}
   */
  avatar?: string;

  /**
   * has the user configured their profile
   * @type {boolean}
   */
  configuredProfile?: boolean;

  /**
   * first name of the user
   * @type {string}
   */
  firstName?: string;

  /**
   * last name of the user
   * @type {string}
   */
  lastName?: string;

  /**
   * theme preference of the user
   * @type {number}
   */
  theme?: number;
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
   * Auth state in the store from auth slice
   * @author Sriram Sundar
   *
   * @type {AuthState}
   */
  auth: AuthState;

  /**
   * Authentication API reducer path in store
   * @author Sriram Sundar
   *
   * @type {ReturnType<typeof authenticationApi.reducer>}
   */
  [authenticationApi.reducerPath]: ReturnType<typeof authenticationApi.reducer>;

  /**
   * Chat state in the store from chat slice
   * @author Sriram Sundar
   *
   * @type {ChatState}
   */
  chat: ChatState;

  /**
   * textbooksApi reducer path in store
   * @author Sriram Sundar
   *
   * @type {ReturnType<typeof chatApi.reducer>}
   */
  [textbooksApi.reducerPath]?: ReturnType<typeof textbooksApi.reducer>;
}

/**
 * AppDispatch type for the store dispatch function
 * @author Sriram Sundar
 *
 * @export
 * @typedef {AppDispatch}
 */
export type AppDispatch = typeof store.dispatch;

/**
 * RouterProps for AuthRoute nd Private route functions
 * @author Sriram Sundar
 *
 * @export
 * @interface RouterProps
 * @typedef {RouterProps}
 */
export interface RouterProps {
  /**
   * children passed in to be rendered if conditions are met
   * @author Sriram Sundar
   *
   * @type {ReactNode}
   */
  children: ReactNode;
}

/**
 * props for the resuable title component
 * @author Sriram Sundar
 *
 * @export
 * @interface TitleProps
 * @typedef {TitleProps}
 */
export interface TitleProps {
  /**
   * text to be displayed on the title
   * @author Sriram Sundar
   *
   * @type {string}
   */
  text: string;
}

/**
 * types of chats
 * @author Sriram Sundar
 *
 * @export
 * @enum {number}
 */
export enum ChatType {
  TEXTBOOK = "textbook",
  ANNOUNCEMENTS = "announcements",
}

/**
 * Chat data Structure
 * @author Sriram Sundar
 *
 * @export
 * @interface ChatData
 * @typedef {ChatData}
 */
export type ChatData = Textbook;

/**
 * chat message structure (update as needed just a prediction for
 * what it might look like)
 * @author Sriram Sundar
 *
 * @export
 * @interface ChatMessage
 * @typedef {ChatMessage}
 */
export interface ChatMessage {
  /**
   * id of message
   * @author Sriram Sundar
   *
   * @type {string}
   */
  id: string;
  /**
   * sender id
   * @author Sriram Sundar
   *
   * @type {string}
   */
  senderId: string;
  /**
   * content of the message
   * @author Sriram Sundar
   *
   * @type {string}
   */
  content: string;
  /**
   * timestamp of the message
   * @author Sriram Sundar
   *
   * @type {Date}
   */
  timestamp: Date;
  /**
   * wether the message has been read or not
   * @author Sriram Sundar
   *
   * @type {boolean}
   */
  read: boolean;
}

/**
 * state of the chat
 * @author Sriram Sundar
 *
 * @interface ChatState
 * @typedef {ChatState}
 */
interface ChatState {
  /**
   * possible states of chat type
   * @author Sriram Sundar
   *
   * @type {(ChatType | undefined)}
   */
  selectedChatType: ChatType | undefined;
  /**
   * possible states of chat data
   * @author Sriram Sundar
   *
   * @type {(ChatData | undefined)}
   */
  selectedChatData: ChatData | undefined;
  /**
   * possible states of chat messages
   * @author Sriram Sundar
   *
   * @type {ChatMessage[]}
   */
  selectedChatMessages: ChatMessage[];
  /**
   * loading state
   * @author Sriram Sundar
   *
   * @type {boolean}
   */
  isLoading: boolean;
  /**
   * possible states of error
   * @author Sriram Sundar
   *
   * @type {(string | null)}
   */
  error: string | null;
}
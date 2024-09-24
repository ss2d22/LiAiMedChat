import { authenticationApi } from "@/state/api/authenticationApi";
import { store } from "@/state/store";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { createContext, ReactNode } from "react";
import { textbooksApi } from "@/state/api/textbookApi";
import { Socket } from "socket.io-client";
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

  /**
   * id of the textbook
   * @author Sriram Sundar
   *
   * @type {string}
   */
  _id: string;
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

declare interface fetchMessages {
  data: {
    /**
     * messages from the server
     * @type {ChatMessage[]}
     */
    messages: ChatMessage[];
  };
}

/**
 * Description placeholder
 * @author Sriram Sundar
 *
 * @typedef {fetchMessagesResponse}
 */
declare type fetchMessagesResponse = fetchMessages | ErrorResponse;
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
 * Types of chats
 * @author Sriram Sundar
 *
 * @export
 * @enum {string}
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
export type ChatData = Textbook | UserInformation;

/**
 * Structure of a chat message
 * @author Sriram Sundar
 *
 * @export
 * @interface ChatMessage
 */
export interface ChatMessage {
  /**
   * Unique identifier for the message
   * @type {string}
   */
  id: string;

  /**
   * Sender of the message (can be a user, textbook, or null for system messages)
   * @type {UserInformation | Textbook | null}
   */
  sender: UserInformation | Textbook | null;

  /**
   * Receiver of the message (can be a user or textbook)
   * @type {UserInformation | Textbook}
   */
  receiver: UserInformation | Textbook;

  /**
   * Model type of the receiver
   * @type {"用户" | "Textbook"}
   */
  receiverModel: "用户" | "Textbook";

  /**
   * Indicates if the message is from an AI
   * @type {boolean}
   */
  isAI: boolean;

  /**
   * Type of the message
   * @type {"text" | "file"}
   */
  messageType: "text" | "file";

  /**
   * File path if the message is a file
   * @type {string | undefined}
   */
  file?: string;

  /**
   * Content of the message if it's a text message
   * @type {string | undefined}
   */
  content?: string;

  /**
   * Timestamp of when the message was sent
   * @type {Date}
   */
  timestamp: Date;

  /**
   * Indicates if the message has been read
   * @type {boolean}
   */
  read: boolean;
}

/**
 * State of the chat in the Redux store
 * @author Sriram Sundar
 *
 * @export
 * @interface ChatState
 */
export interface ChatState {
  /**
   * Currently selected chat type
   * @type {ChatType | undefined}
   */
  selectedChatType: ChatType | undefined;

  /**
   * Data of the currently selected chat
   * @type {ChatData | undefined}
   */
  selectedChatData: ChatData | undefined;

  /**
   * Messages in the currently selected chat
   * @type {ChatMessage[]}
   */
  selectedChatMessages: ChatMessage[];

  /**
   * List of textbooks available for chat
   * @type {Textbook[]}
   */
  textbooks: Textbook[];

  /**
   * Indicates if a file is currently being uploaded
   * @type {boolean}
   */
  isUploading: boolean;

  /**
   * Progress of the current file upload
   * @type {number}
   */
  fileUploadProgress: number;

  /**
   * Indicates if a file is currently being downloaded
   * @type {boolean}
   */
  isDownloading: boolean;

  /**
   * Progress of the current file download
   * @type {number}
   */
  downloadProgress: number;

  /**
   * Indicates if the chat is in a loading state
   * @type {boolean}
   */
  isLoading: boolean;

  /**
   * Any error message related to chat operations
   * @type {string | null}
   */
  error: string | null;
}

/**
 * SocketProviderProps for the socket provider component
 * @author Sriram Sundar
 *
 * @interface SocketProviderProps
 * @typedef {SocketProviderProps}
 */
interface SocketProviderProps {
  /**
   * children passed in to be rendered if conditions are met
   * @author Sriram Sundar
   *
   * @type {ReactNode}
   */
  children: ReactNode;
}

/**
 * SocketContextType for the socket context component
 * @author Sriram Sundar
 *
 * @interface SocketContextType
 * @typedef {SocketContextType}
 */
interface SocketContextType {
  /**
   * Socket instance for the application
   * @author Sriram Sundar
   *
   * @type {(Socket | null)}
   */
  socket: Socket | null;
  /**
   * Indicates if the socket is connected to the server
   * @author Sriram Sundar
   *
   * @type {boolean}
   */
  isConnected: boolean;
}

export interface TextbookListProps {
  textbooks: Textbook[];
}
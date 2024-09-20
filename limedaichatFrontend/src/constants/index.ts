//base url for the backend
/**
 * base url for the backend
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const BACKEND_URL: string = import.meta.env
  .VITE_BACKEND_BASE_URL as string;

//Authentication Routes
/**
 * base routh for authentication related endpoints
 * @author Sriram Sundar
 *
 * @type {"/api/authentication"}
 */
export const AUTHENTICATION_BASE_ROUTES = "/api/authentication";
/**
 * url for the signup endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const SIGNUP_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signup`;
/**
 * url for the signin endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const SIGNIN_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signin`;
/**
 * url for the fetuserinfo endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const FETCH_USER_INFO_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/fetchuserinfo`;

/**
 * url for the signout endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const SIGN_OUT_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signout`;

//Profile Routes
/**
 * base route for profile related endpoints
 * @author Sriram Sundar
 *
 * @type {"/api/profile"}
 */
export const PROFILE_BASE_ROUTES = "/api/profile";

/**
 * url for the update profile endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const UPDATE_PROFILE_ROUTE = `${PROFILE_BASE_ROUTES}/updateprofile`;

/**
 * url for the update avatar endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const UPDATE_AVATAR_ROUTE = `${PROFILE_BASE_ROUTES}/updateavatar`;

/**
 * url for the delete avatar endpoint
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const DELETE_AVATAR_ROUTE = `${PROFILE_BASE_ROUTES}/deleteavatar`;

//Chat Routes

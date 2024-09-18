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
 * endpoint for the signup route
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const SIGNUP_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signup`;
/**
 * endpoint for the signin route
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const SIGNIN_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signin`;
/**
 * endpoint for the fetuserinfo route
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const FETCH_USER_INFO_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/fetchuserinfo`;

//Profile Routes
/**
 * base route for profile related endpoints
 * @author Sriram Sundar
 *
 * @type {"/api/profile"}
 */
export const PROFILE_BASE_ROUTES = "/api/profile";

/**
 * endpoint for the update profile route
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const UPDATE_PROFILE_ROUTE = `${PROFILE_BASE_ROUTES}/updateprofile`;

/**
 * endpoint for the update avatar route
 * @author Sriram Sundar
 *
 * @type {string}
 */
export const UPDATE_AVATAR_ROUTE = `${PROFILE_BASE_ROUTES}/updateavatar`;

//Chat Routes

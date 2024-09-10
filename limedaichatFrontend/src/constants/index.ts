//base url for the backend
export const BACKEND_URL = import.meta.env.VITE_BACKEND_BASE_URL as string;

//Authentication Routes
export const AUTHENTICATION_BASE_ROUTES = "/api/authentication";
export const SIGNUP_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signup`;
export const SIGNIN_ROUTE = `${AUTHENTICATION_BASE_ROUTES}/signin`;

//Chat Routes

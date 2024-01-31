/**
 * These routes do not require authentication
 * @type {string[]}
 */

export const publicRoutes = [
    "/",
];

/**
 * An Array of routes that are used for authetication
 * These routes will redirect logged in users to /settings
 * @type {string[]}
 */
export const authRoutes = [ 
    "/login",
    "/register"
];

/**
 * The prefix for API authentication routes
 * ROutes that start with this prefix are user for API authentication purposes
 * @type {string}
 */
export const apiAuthPrefix = "/api/auth";

/**
 * The default redirect path after logging in
 * @type {string}
 */
export const DEFAULT_LOGIN_REDIRECT = "/settings";
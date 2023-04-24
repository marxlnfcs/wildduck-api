export interface IWildduckApiDeleteUserOptions {
    /** Delete user entry from registry but keep all user data until provided date. User account is fully recoverable up to that date. */
    deleteAfter: Date;
    /** Session identifier for the logs */
    sess: string;
    /** IP address for the logs */
    ip: string;
}

export interface IWildduckApiRecoverInfoOptions {
    /** Session identifier for the logs */
    sess: string;
    /** IP address for the logs */
    ip: string;
}

export interface IWildduckApiGetUsersOptions {
    /** Partial match of username or default email address */
    query: string;
    /** Partial match of a forward email address or URL */
    forward: string;
    /** Comma separated list of tags. The User must have at least one to be set */
    tags: string;
    /** Comma separated list of tags. The User must have all listed tags to be set */
    requiredTags: string;
    /** If true, then includes metaData in the response */
    metaData: boolean;
    /** If true, then includes internalData in the response. Not shown for user-role tokens. */
    internalData: boolean;
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}
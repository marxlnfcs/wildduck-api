export interface IWildduckApiResolveAddressOptions {
    /** If true then resolves also wildcard addresses */
    allowWildcard: boolean;
}

export interface IWildduckApiGetAddressesOptions {
    /** Partial match of an address */
    query: string;
    /** Partial match of a forward email address or URL */
    forward: string;
    /** Comma separated list of tags. The Address must have at least one to be set */
    tags: string;
    /** Comma separated list of tags. The Address must have all listed tags to be set */
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

export interface IWildduckApiGetUserAddressesOptions {
    /** If true, then includes metaData in the response */
    metaData: boolean;
    /** If true, then includes internalData in the response. Not shown for user-role tokens. */
    internalData: boolean;
}

export interface IWildduckApiGetUserAddressesregisterOptions {
    /**
     * Prefix of an address or name
     * @example john
     */
    query: string;
    /**
     * How many records to return
     * @example=25
     */
    limit: number;
}
export interface IWildduckApiGetTLSCertsOptions {
    /** Partial match of a server name */
    query: string;
    /** Match query value against SAN as well (include wildcard names) */
    altNames: boolean;
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}
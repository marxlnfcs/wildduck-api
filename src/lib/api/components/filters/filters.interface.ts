export interface IWildduckApiGetAllFiltersOptions {
    /** Partial match of a forward email address or URL */
    query: string;
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: number;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: number;
}
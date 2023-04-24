export interface IWildduckApiGetArchivedMessagesOptions {
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Ordering of the records by insert date */
    order: 'asc'|'desc';
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}
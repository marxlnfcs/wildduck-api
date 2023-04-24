export interface IWildduckApiGetMessageOptions {
    /** If true then marks message as seen */
    markAsSeen: boolean;
}

export interface IWildduckApiDeleteMessagesInMailboxOptions {
    /**
     * Schedule deletion task
     * @default false
     */
    async: boolean;
}

export interface IWildduckApiGetMessagesOptions {
    /** If true, then returns only unseen messages */
    unseen: boolean;
    /** If true, then includes metaData in the response */
    metaData: boolean;
    /** If true, then includes threadMessageCount in the response. Counters come with some overhead */
    threadCounters: boolean;
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Ordering of the records by insert date */
    order: 'asc'|'desc';
    /* Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /* Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}

export interface IWildduckApiSearchMessagesOptions {
    /** ID of the Mailbox */
    mailbox: string;
    /** Thread ID */
    thread: string;
    /** Search string, uses MongoDB fulltext index. Covers data from message body and also common headers like from, to, subject etc. */
    query: string;
    /** Datestring for the earliest message storing time */
    datestart: Date;
    /** Datestring for the latest message storing time */
    dateend: Date;
    /** Partial match for the From: header line */
    from: string;
    /** Partial match for the To: and Cc: header lines */
    to: string;
    /** Partial match for the Subject: header line */
    subject: string;
    /** If true, then matches only messages with attachments */
    attachments: boolean;
    /** If true, then matches only messages with \Flagged flags */
    flagged: boolean;
    /** If true, then matches only messages without \Seen flags */
    unseen: boolean;
    /** If true, then matches messages not in Junk or Trash */
    searchable: boolean;
    /** Search string, uses MongoDB fulltext index. Covers data from mesage body and also common headers like from, to, subject etc. */
    'or.query': string;
    /** Partial match for the From: header line */
    'or.from': string;
    /** Partial match for the To: and Cc: header lines */
    'or.to': string;
    /** Partial match for the Subject: header line */
    'or.subject': string;
    /** Minimal message size in bytes */
    minSize: number;
    /** Maximal message size in bytes */
    maxSize: number;
    /** If true, then includes threadMessageCount in the response. Counters come with some overhead */
    threadCounters: boolean;
    /** How many records to return */
    limit: number;
    /** Ordering of the records by insert date. If no order is supplied, results are sorted by heir mongoDB ObjectId. */
    order: 'asc'|'desc';
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}
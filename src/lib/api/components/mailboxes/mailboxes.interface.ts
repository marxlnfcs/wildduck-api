export interface IWildduckApiGetMailboxesOptions {
    /** Should the response include only folders with specialUse flag set. */
    specialUse: boolean;
    /** Hidden folders are not included in the listing by default. */
    showHidden: boolean;
    /** Should the response include counters (total + unseen). Counters come with some overhead. */
    counters: boolean;
    /** Should the response include mailbox size in bytes. Size numbers come with a lot of overhead as an aggregated query is ran. */
    sizes: boolean;
}
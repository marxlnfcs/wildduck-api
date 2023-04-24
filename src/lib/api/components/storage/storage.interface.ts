export interface IWildduckApiGetFilesOptions {
    /** Partial match of a filename */
    query: string;
    /** How many records to return */
    limit: number;
    /** Current page number. Informational only, page numbers start from 1 */
    page: number;
    /** Cursor value for next page, retrieved from nextCursor response value */
    next: string;
    /** Cursor value for previous page, retrieved from previousCursor response value */
    previous: string;
}

export interface IWildduckApiUploadFileRequest {
    /** Name of the file */
    filename?: string;
    /** MIME type of the file. Is detected from the file name by default */
    contentType?: string;
    /** Encoding of the file content. Useful if you want to upload the file in base64 encoded format. Valid options "base64", "hex", "utf8" */
    encoding?: 'base64'|'hex'|'utf8';
    /** Format: binary */
    content: string;
}
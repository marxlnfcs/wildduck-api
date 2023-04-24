import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {IWildduckApiGetFilesResponse, IWildduckApiSuccessResponse} from "../../client-schema";
import {IWildduckApiGetFilesOptions, IWildduckApiUploadFileRequest} from "./storage.interface";
import * as FormData from 'form-data';

/**
 * Storage
 * @description Storage allows easier attachment handling when composing Draft messages. Instead of uploading the attachment with every draft update, you store the attachment to the Storage and then link stored file for the Draft.
 * @see https://docs.wildduck.email/api/#tag/Storage
 */
export class WildduckStorageService extends WildduckClientComponent {

    /**
     * Delete a File
     * @see https://docs.wildduck.email/api/#operation/deleteFile

     * @param user - ID of the user
     * @param file - ID of the file
     */
    deleteFile(user: string, file: string): Promise<IWildduckApiSuccessResponse> {
        return new Promise<IWildduckApiSuccessResponse>(async (resolve, reject) => {
            this.http.delete('/users/{user}/storage/{file}', { params: { user, file } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Download File
     * @see https://docs.wildduck.email/api/#operation/getFile

     * @param user - ID of the user
     * @param file - ID of the file
     */
    downloadFile(user: string, file: string): Promise<Buffer> {
        return new Promise<Buffer>(async (resolve, reject) => {
            this.http.download('/users/{user}/storage/{file}', { params: { user, file } })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * List stored files
     * @see https://docs.wildduck.email/api/#operation/getFiles

     * @param user - ID of the user
     * @param options
     */
    getFiles(user: string, options?: Partial<IWildduckApiGetFilesOptions>): Promise<IWildduckApiGetFilesResponse> {
        return new Promise<IWildduckApiGetFilesResponse>(async (resolve, reject) => {
            this.http.get('/users/{user}/storage', { params: { user }, query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Upload file
     * @description This method allows to upload an attachment to be linked from a draft
     * @see https://docs.wildduck.email/api/#operation/uploadFile

     * @param user - ID of the user
     * @param dto
     */
    uploadFile(user: string, dto: IWildduckApiUploadFileRequest): Promise<IWildduckApiGetFilesResponse> {
        return new Promise<IWildduckApiGetFilesResponse>(async (resolve, reject) => {
            // create form data
            const data = new FormData();
            // add data to form
            for(const [key, value] of Object.entries(dto)){
                data.append(key, value);
            }
            // execute request
            this.http.post('/users/{user}/storage', { params: { user }, body: data })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}
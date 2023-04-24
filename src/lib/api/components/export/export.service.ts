import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {IWildduckApiCreateExportOptions, IWildduckApiCreateImportResponse} from "./export.interface";

/**
 * Export
 * @see https://docs.wildduck.email/api/#tag/Export
 */
export class WildduckExportService extends WildduckClientComponent {

    /**
     * Export data
     * @description Export data for matching users. Export dump does not include emails, only account structure (user data, password hashes, mailboxes, filters, etc.). A special "export"-role access token is required for exporting and importing.
     * @see https://docs.wildduck.email/api/#operation/createExport
     *
     */
    exportData(options?: Partial<IWildduckApiCreateExportOptions>): Promise<Buffer> {
        return new Promise<Buffer>(async (resolve, reject) => {
            this.http.download('/data/export', { method: 'POST', query: options })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

    /**
     * Import user data
     * @description Import data from an export dump. If a database entry already exists, it is not modified. A special "export"-role access token is required for exporting and importing.
     * @see https://docs.wildduck.email/api/#operation/createImport
     *
     */
    importData(data: Buffer): Promise<IWildduckApiCreateImportResponse> {
        return new Promise<IWildduckApiCreateImportResponse>(async (resolve, reject) => {
            this.http.upload('/data/import', { method: 'POST', body: data })
                .then(r => resolve(r.data))
                .catch(e => reject(createHttpException(e)))
        });
    }

}
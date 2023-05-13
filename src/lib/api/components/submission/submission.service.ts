import {WildduckClientComponent} from "../../client-component";
import {createHttpException} from "../../../internals/create-http-client";
import {IWildduckApiSubmitMessageRequest, IWildduckApiSubmitMessageResponse} from "../../client-schema";
import {AxiosError} from "axios";

/**
 * Submission
 * @see https://docs.wildduck.email/api/#tag/Submission
 */
export class WildduckSubmissionService extends WildduckClientComponent {

    /**
     * Submit a Message for Delivery
     * @description Use this method to send emails from a user account
     * @see https://docs.wildduck.email/api/#operation/submitMessage

     * @param user - ID of the user
     * @param dto
     */
    submitMessage(user: string, dto: IWildduckApiSubmitMessageRequest): Promise<IWildduckApiSubmitMessageResponse> {
        return new Promise<IWildduckApiSubmitMessageResponse>(async (resolve, reject) => {
            this.http.post('/users/{user}/submit', { params: { user }, body: dto })
              .then(r => {
                  this.events.emitFromResponse(this.submitMessage, r);
                  resolve(r.data);
              })
              .catch((e: AxiosError) => {
                  this.events.emitFromError(this.submitMessage, e);
                  reject(createHttpException(e));
              })
        });
    }

}
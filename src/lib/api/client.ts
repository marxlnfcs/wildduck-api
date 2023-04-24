import {createHttpClient} from "../internals/create-http-client";
import {IWildduckClientOptions} from "../interfaces/client-options.interface";
import {WildduckAddressesService} from "./components/addresses/addresses.service";
import {WildduckApplicationPasswordsService} from "./components/application-passwords/application-passwords.service";
import {WildduckAuthenticationService} from "./components/authentication/authentication.service";
import {WildduckArchiveService} from "./components/archive/archive.service";
import {WildduckAutoRepliesService} from "./components/auto-replies/auto-replies.service";
import {WildduckCertsService} from "./components/certs/certs.service";
import {WildduckDKIMService} from "./components/dkim/dkim.service";
import {WildduckDomainAccessService} from "./components/domain-access/domain-access.service";
import {WildduckDomainAliasesService} from "./components/domain-aliases/domain-aliases.service";
import {WildduckFiltersService} from "./components/filters/filters.service";
import {WildduckMailboxesService} from "./components/mailboxes/mailboxes.service";
import {WildduckMessagesService} from "./components/messages/messages.service";
import {WildduckSettingsService} from "./components/settings/settings.service";
import {WildduckStorageService} from "./components/storage/storage.service";
import {WildduckSubmissionService} from "./components/submission/submission.service";
import {WildduckTwoFactorAuthService} from "./components/two-factor-auth/two-factor-auth.service";
import {WildduckUsersService} from "./components/users/users.service";
import {WildduckWebhooksService} from "./components/webhooks/webhooks.service";
import {WildduckExportService} from "./components/export/export.service";
import {WildduckAuditService} from "./components/audit/audit.service";
import {createSSEClient} from "../internals/create-sse-client";

export class WildduckClient {
    private http = createHttpClient(this.options)
    private sse = createSSEClient(this.options);

    constructor(
        private options: IWildduckClientOptions
    ){}

    readonly addresses: WildduckAddressesService = new WildduckAddressesService(this.http, this.sse);
    readonly applicationPasswords: WildduckApplicationPasswordsService = new WildduckApplicationPasswordsService(this.http, this.sse);
    readonly archive: WildduckArchiveService = new WildduckArchiveService(this.http, this.sse);
    readonly audit: WildduckAuditService = new WildduckAuditService(this.http, this.sse);
    readonly authentication: WildduckAuthenticationService = new WildduckAuthenticationService(this.http, this.sse);
    readonly autoReplies: WildduckAutoRepliesService = new WildduckAutoRepliesService(this.http, this.sse);
    readonly certs: WildduckCertsService = new WildduckCertsService(this.http, this.sse);
    readonly dkim: WildduckDKIMService = new WildduckDKIMService(this.http, this.sse);
    readonly domainAccess: WildduckDomainAccessService = new WildduckDomainAccessService(this.http, this.sse);
    readonly domainAliases: WildduckDomainAliasesService = new WildduckDomainAliasesService(this.http, this.sse);
    readonly filters: WildduckFiltersService = new WildduckFiltersService(this.http, this.sse);
    readonly mailboxes: WildduckMailboxesService = new WildduckMailboxesService(this.http, this.sse);
    readonly messages: WildduckMessagesService = new WildduckMessagesService(this.http, this.sse);
    readonly settings: WildduckSettingsService = new WildduckSettingsService(this.http, this.sse);
    readonly storage: WildduckStorageService = new WildduckStorageService(this.http, this.sse);
    readonly submission: WildduckSubmissionService = new WildduckSubmissionService(this.http, this.sse);
    readonly twoFactorAuth: WildduckTwoFactorAuthService = new WildduckTwoFactorAuthService(this.http, this.sse);
    readonly users: WildduckUsersService = new WildduckUsersService(this.http, this.sse);
    readonly webhooks: WildduckWebhooksService = new WildduckWebhooksService(this.http, this.sse);
    readonly exports: WildduckExportService = new WildduckExportService(this.http, this.sse);
}
import * as md5 from 'md5';

/** @internal */
export function joinUrls(baseUrl: string, ...urls: Array<URL|string>): string {
    return [
        baseUrl.endsWith('/')
            ? baseUrl.substring(0, baseUrl.length - 1)
            : baseUrl,
        ...(urls.filter(url => !!url).map(url => url.toString().split('/').filter(p => !!p).join('/')))
    ].join('/');
}

/** @internal */
export function joinUrlPaths(...urls: Array<URL|string>): string {
    return urls.join('/');
}

/** @internal */
export function isUrl(url?: string|null): boolean {
    try{
        return url ? Boolean(new URL(url)) : false;
    }catch{
        return false;
    }
}

/** @internal */
export function createChecksum(text: string): string {
    return md5(text);
}
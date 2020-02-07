export class CookieStore {
  lastReadRawCookieCollection: string;

  lastReadCookieCollection: any;

  public getCookie(key: string): string {
    const cookieCollection = this.getCookieCollection();

    return cookieCollection[key];
  }

  public getCookieCollection(): any {
    const currentRawCookie = document.cookie;

    if (currentRawCookie === this.lastReadRawCookieCollection) {
      return this.lastReadCookieCollection;
    }

    this.lastReadRawCookieCollection = currentRawCookie;
    this.lastReadCookieCollection = {};

    if (this.lastReadRawCookieCollection.indexOf('; ') !== -1) {
      const cookies = this.lastReadRawCookieCollection.split('; ');

      for (const cookie of cookies) {
        const indexOfEqualSign = cookie.indexOf('=');

        if (indexOfEqualSign > 0) {
          const cookieName = CookieStore.tryDecodeUriComponent(cookie.substring(0, indexOfEqualSign));

          this.lastReadCookieCollection[cookieName] = CookieStore.tryDecodeUriComponent(cookie.substring(indexOfEqualSign + 1));
        }
      }
    }

    return this.lastReadCookieCollection;
  }

  private static tryDecodeUriComponent(uriComponent: string): string {
    try {
      return decodeURIComponent(uriComponent);
    } catch (e) {
      return uriComponent;
    }
  }
}

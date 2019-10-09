// @flow
/**
 * Utility class to handle fetch requests.
*/
export default class FetchUtils {
  /**
   * Make a fetch call.
   * This method ensures that all requests behave the same including handling
   * SAML errors when a user's session times out.
   */
  static fetch(
    uri: string,
    payload: any | null,
    callback: (response: any | null, error: string | null) => void,
    method: string, errorMessage: string) {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const body = payload ? JSON.stringify(payload) : undefined;
    const params = {
      method,
      headers,
      body,
      credentials: 'include',
      mode: 'cors',
    };
    const fetchRequest = new Request(uri, params);

    fetch(fetchRequest).then(
      (response: Response) => {
        if (response.ok) {
          const contentType = response.headers.get('content-type');
          if (!contentType || contentType.indexOf('text/html') === -1) {
            response.json().then((jsonResponse: any) => {
              callback(jsonResponse, null);
            }).catch((error: any) => {
              // Catch errors from converting the response's JSON
              callback(null, FetchUtils.getErrorMessage(error, errorMessage));
            });
          } else {
            response.text().then((text: string) => {
              if (text.indexOf('SAML') !== -1) {
                // If the response content-type is HTML and it mentions SAML, it's 99.9% likely
                // that it's a redirect to a login page. If so, then we then reload the whole
                // page to let the user log in again.
                window.location.reload();
              } else if (text && text.includes('j_security_check')) {
                window.location.reload();
              } else {
                // We've received some other sort of error, so let's just log it and stop.
                const msg = `REST call to ${uri} failed to return JSON.`;
                console.error(msg);
                callback(null, msg);
              }
            }).catch((error: any) => {
              const msg = `Results of REST call to ${uri} couldn't be parsed.`;
              console.error(msg, error);
              callback(null, msg);
            });
          }
        } else {
          // The request came back other than a 200-type response code
          // There should be JSON describing it...
          response.json().then((searchException: any) => {
            const exceptionMessage = searchException.message ? searchException.message : '';
            const exceptionCode = searchException.errorCode ? ` (${(searchException.errorCode: string)})` : '';
            const finalExceptionMessage = `${errorMessage} ${exceptionMessage}${exceptionCode}`;
            callback(null, finalExceptionMessage);
          }).catch((badJsonError: any) => {
            callback(null, FetchUtils.getErrorMessage(badJsonError, errorMessage));
          });
        }
      },
    ).catch((error: any) => {
      // Catch exceptions from the main "then" function
      callback(null, FetchUtils.getErrorMessage(error, errorMessage));
    });
  }

  /**
   * Get the error message out of the error object.
   *
   * @param error the error received
   * @return      a string representing the error object
   */
  static getErrorMessage(error: any, errorMessage: string): string {
    let message;
    if (error && error.message) {
      message = error.message;
    } else {
      message = errorMessage;
    }
    return message;
  }
}

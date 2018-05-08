// @flow
/**
 * Utility class to handle fetch requests.
*/
export default class FetchUtils {
  /**
   * Make a fetch call.
   * It ensures that all requests behave the same including handling SAML errors when a user's session times out.
   */
  static fetch(uri: string, payload: any, callback: (response: any | null, error: string | null) => void, errorMesssage: string) {
    const headers = new Headers({
      Accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const body = JSON.stringify(payload);
    const params = {
      method: 'POST',
      headers,
      body,
      credentials: 'include',
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
              callback(null, FetchUtils.getErrorMessage(error, errorMesssage));
            });
          } else {
            // If the response content-type is HTML then reload the page because user's session likely timedout.
            // SAML tries to redirect but we can't deal with that in Ajax.
            window.location.reload();
          }
        } else {
          // The request came back other than a 200-type response code
          // There should be JSON describing it...
          response.json().then((searchException: any) => {
            const exceptionMessasge = searchException.message ? searchException.message : '';
            const exceptionCode = searchException.errorCode ? ` (${(searchException.errorCode: string)})` : '';
            const finalExceptionMessage = `${errorMesssage} ${exceptionMessasge}${exceptionCode}`;
            callback(null, finalExceptionMessage);
          }).catch((badJsonError: any) => {
            callback(null, FetchUtils.getErrorMessage(badJsonError, errorMesssage));
          });
        }
      },
      (error: any) => {
        // Catch network-type errors from the main fetch() call
        callback(null, FetchUtils.getErrorMessage(error, errorMesssage));
      },
    ).catch((error: any) => {
      // Catch exceptions from the main "then" function
      callback(null, FetchUtils.getErrorMessage(error, errorMesssage));
    });
  }

  /**
   * Get the error message out of the error object.
   *
   * @param error the error recieved
   * @return      a string represening the error object
   */
  static getErrorMessage(error: any, errorMesssage: string): string {
    let message;
    if (error && error.message) {
      message = error.message;
    } else {
      message = errorMesssage;
    }
    return message;
  }
}

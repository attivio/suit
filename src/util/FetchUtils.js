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

    const body = payload ? JSON.stringify(payload) : null;
    const params = {
      method,
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
              callback(null, FetchUtils.getErrorMessage(error, errorMessage));
            });
          } else {
            // If the response content-type is HTML then reload the page because user's session likely timed out.
            // SAML tries to redirect but we can't deal with that in Ajax.
            window.location.reload();
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
      () => {
        // Catch network-type errors from the main fetch() call and reload the page.
        window.location.reload();
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

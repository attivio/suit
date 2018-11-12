// flow

import FetchUtils from '../util/FetchUtils';
import AuthUtils from '../util/AuthUtils';

/**
 * Contains hooks for the security-related endpoints exposed in Attivio's APIs.
 */
export default class SecurityApi {

  /**
   * Get a comprehensive list of the roles that the currently logged-in user has.
   */
  static getCurrentUserRoles(): Promise<Array<string>> {
    return new Promise((resolve, reject) => {
      const config = AuthUtils.getConfig();
      const uri = `${config.ALL.baseUri}/rest/principalRoles/getCurrentUserRoles`;
      const headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
      const params = {
        method: 'GET',
        headers,
        credentials: 'include',
      };
      const fetchRequest = new Request(uri, params);

      fetch(fetchRequest).then((response: Response) => {
        if (response.ok) {
          response.json().then((roles: Array<String>) => {
            resolve(roles);
          }).catch((error: any) => {
            // Catch errors from converting the response's JSON
            reject(`Error retrieving the current user's roles: ${FetchUtils.getErrorMessage(error)}`);
          });
        } else {
          // The request came back other than a 200-type response code
          // There should be JSON describing it...
          response.json().then((e: any) => {
            const exceptionMessasge = e.message ? e.message : '';
            const exceptionCode = e.errorCode ? ` (${(e.errorCode: string)}) ` : '';
            const finalExceptionMessage = `An exception occurred.${exceptionMessasge} ${exceptionCode}`;
            reject(`Error retrieving the current user's roles: ${finalExceptionMessage}`);
          }).catch((badJsonError: any) => {
            reject(`Error retrieving the current user's roles: ${badJsonError}`);
          });
        }
      }).catch((error) => {
        // Catch exceptions from the main "then" function
        reject(`Error retrieving the current user's roles: ${FetchUtils.getErrorMessage(error)}`);
      });
    });
  }

  /**
   * Get a flag denoting whether or not the currently logged-in user has the specified role.
   * @param role the role to look for
   */
  static currentUserHasRole(role: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const config = AuthUtils.getConfig();
      const uri = `${config.ALL.baseUri}/rest/principalRoles/currentUserHasRole?role=${role}`;
      const headers = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
      });
      const params = {
        method: 'GET',
        headers,
        credentials: 'include',
      };
      const fetchRequest = new Request(uri, params);

      fetch(fetchRequest).then((response: Response) => {
        if (response.ok) {
          response.json().then((hasRole: boolean) => {
            resolve(hasRole);
          }).catch((error: any) => {
            // Catch errors from converting the response's JSON
            reject(`Error checking the current user's role: ${FetchUtils.getErrorMessage(error)}`);
          });
        } else {
          // The request came back other than a 200-type response code
          // There should be JSON describing it...
          response.json().then((e: any) => {
            const exceptionMessasge = e.message ? e.message : '';
            const exceptionCode = e.errorCode ? ` (${(e.errorCode: string)}) ` : '';
            const finalExceptionMessage = `An exception occurred.${exceptionMessasge} ${exceptionCode}`;
            reject(`Error checking the current user's role: ${finalExceptionMessage}`);
          }).catch((badJsonError: any) => {
            reject(`Error checking the current user's role: ${badJsonError}`);
          });
        }
      }).catch((error) => {
        // Catch exceptions from the main "then" function
        reject(`Error checking the current user's role: ${FetchUtils.getErrorMessage(error)}`);
      });
    });
  }
}

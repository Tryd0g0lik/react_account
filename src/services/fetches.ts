// import getCookie from './cookies';
// import { getCookie } from '../services/coockieSessionId';
import { getCookie } from '@Services/coockieSessionId';
// import { FetchParams, FetchMethod } from "../interfaces";
import { FetchParams, FetchMethod } from "@Interfaces";
// import { ResultType } from '@Interfaces';

let env_ = process.env.REACT_APP_POSTGRES_HOST;
const HOST = (env_ === undefined) ? 'localhost' : env_.slice(0);
env_ = process.env.REACT_APP_SERVER_PORT;
const PORT = (env_ === undefined) ? '7070' : env_.slice(0);
env_ = process.env.REACT_APP_PROTOCOL_OF_URL;
const PROTOCOL = (env_ === undefined) ? 'http' : env_.slice(0);
env_ = process.env.REACT_APP_SET_TTIMOUT;
env_ = undefined;

const params: FetchParams = {
  method: FetchMethod.POST,
  mode: 'cors' as const,
};



/**
 *
 * @param body_ Here is data for db + \
 * sessionId ` {
    sessionId: cookieId
  };`.
 * @param pathnameStr '/it/is/api/path/'
 * @returns JSON of boolesn
 */
export async function add(body_: string,
  pathnameStr = '/api/v1/registration/'
): Promise<object | boolean | string> {
  params['headers'] = {
    'X-CSRFToken': getCookie('csrftoken') as string,
    'Content-Type': 'application/json'
  };
  params['body'] = body_;
  const paramsCopy = {};
  Object.assign(paramsCopy, params);
  const urlStr = PORT.length > 1 ? `${PROTOCOL}://${HOST}:${PORT}` : `${PROTOCOL}://${HOST}`;

  const url = urlStr + pathnameStr;
  const answer = await fetch(url, paramsCopy);
  if (answer.ok) {
    const dataJson = answer.json();
    return dataJson as Promise<object>;
  }
  return false;
}

export async function put(body_: string,
  pathnameStr = '/api/v1/clients/add/'
): Promise<object | boolean | string> {
  const paramsCopy = {} as typeof params;
  Object.assign(paramsCopy, params);
  paramsCopy['method'] = FetchMethod.PUT;

  paramsCopy['headers'] = {
    'X-CSRFToken': getCookie('sessionId'),
    'Content-Type': 'application/json'
  };
  paramsCopy['body'] = body_;


  const urlStr = `${PROTOCOL}://${HOST}:${PORT}`;
  const url = urlStr + pathnameStr;

  const answer = await fetch(url, paramsCopy);

  if (answer.ok) {
    const dataJson = answer.json();
    return dataJson as Promise<object>;
  }
  return false;
}

export async function remove(pathnameStr = `/api/v1/clients/add`
): Promise<object | boolean | string> {
  const paramsCopy = {} as typeof params;
  paramsCopy['method'] = FetchMethod.DELETE;
  paramsCopy['mode'] = params.mode;
  paramsCopy['headers'] = {
    'X-CSRFToken': getCookie('sessionId'),
    'Content-Type': 'application/json'
  };


  const urlStr = `${PROTOCOL}://${HOST}:${PORT}`;
  const url = urlStr + pathnameStr;

  const answer = await fetch(url, paramsCopy);

  if (answer.ok) {
    const dataJson = answer.json();
    return dataJson as Promise<object>;
  }
  return false;
}

export async function get(body_: string,
  pathnameStr = '/api/v1/clients/add/'
): Promise<object | boolean | string> {

  const urlStr = `${PROTOCOL}://${HOST}:${PORT}`;
  const url = urlStr + pathnameStr;
  const answer = await fetch(url, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' }
  });
  if (answer.ok) {
    const dataJson = answer.json();
    return dataJson as Promise<object>;
  }
  return false;
}

/**
 * This is a request to the server ba in path `/api/v1/clients/${sessionId}`
 * @returns responce from server
 */
export async function doGetRequest() {
  const sessionId = await getCookie('sessionId');
  if (sessionId === undefined) {
    return false;
  }

  /* ---- Here is data received from the db ---- */
  // const result = await get(JSON.stringify({}), `/api/v1/clients/${sessionId}`) as ResultType;
  // return result;
}

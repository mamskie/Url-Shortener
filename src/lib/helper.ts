import { URL_WITHOUT_PROTOCOL } from './env';

/**
 * Returns true if the url is not from the same domain.
 */
export function checkIfUrlIsValid(url: string): boolean {
  return !url.includes(URL_WITHOUT_PROTOCOL);
}

/**
 * Returns the bearer token from the request headers.
 */
export function getBearerToken(headers: Headers): string | null {
  const authorization = headers.get('authorization');

  if (!authorization) return null;

  const [authType, bearerToken] = authorization.split(' ');

  if (authType.toLowerCase() !== 'bearer' || !bearerToken) return null;

  return bearerToken;
}

/**
 * Returns the origin from the request headers.
 */
export function getOrigin(headers: Headers): string | null {
  const origin = headers.get('origin');

  if (origin) return origin;

  const referer = headers.get('referer');

  if (!referer) return null;

  return new URL(referer).origin;
}

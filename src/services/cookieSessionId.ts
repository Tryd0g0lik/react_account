import { v4 as uuidv4 } from 'uuid';
import { CookieKeys, CookieOptions } from '../interfaces';
const env = process.env.REACT_APP_POSTGRES_HOST;
const REACT_APP_POSTGRES_HOST = (env) ? env : "localhost";
/**
 *
 * @param sessionId that is install the key 'sessionId'
 */
export function setSessionIdInCookie(cookieKeys: CookieKeys): void {
  if (!(typeof cookieKeys).includes('object')) {
    return;
  }
  const keysArr = Object.keys(cookieKeys);
  for (let i = 0; i < keysArr.length; i++) {
    const cookieName: keyof CookieKeys = keysArr[i];
    const cookieValue: string = cookieKeys[cookieName];
    const maxAge = 60 * 60 * 24; // Время жизни cookie в секундах (например, 1 день)

    const strict = 'Strict';
    const now = new Date();
    const options = {
      expires: String(maxAge - now.getTime()),
      path: '/',
      domain: REACT_APP_POSTGRES_HOST,
      secure: false,
      sameSite: 'Strict' as typeof strict
    };
    setCookie(cookieName, cookieValue, options);
  }


}


/**
 *
 * @param cookieName entrypoint received the a key-name from cookie and check his.
 * @returns trye/false;
 */
export function checkCookieExists(cookieName: string): boolean {
  // Получаем все cookies в виде строки
  const cookies = document.cookie;

  // Создаем регулярное выражение для поиска конкретного ключа
  const regex = new RegExp('(^|; )' + encodeURIComponent(cookieName) + '=([^;]*)');

  // Проверяем, есть ли совпадение
  return regex.test(cookies);
}



// Пример использования
// setSessionIdInCookie('abc123');
// Генерируем уникальный идентификатор
export function createSessionId(): string {
  return uuidv4();
}

/**
 * Если видим ключа 'sessionId' - cookie ,
 * Смотрим класс 'active'.
 * Если нету, добавляем.
 *
 * Если не видим ключа 'sessionId' - cookie ,
   Смотрим класс 'active' и удаляем его.
 * @returns
 */
export async function checkerCookieKey(cookieName: string): Promise<boolean> {
  // ????????????????active??????????????????????????????????????????
  const trueFalse = await checkCookieExists(cookieName);
  const root = document.getElementById('root');
  if (root === null) {
    return false;
  }

  if (trueFalse) {
    // если видим ключ 'sessionId' - cookie ,
    // смотрим класс 'active'.
    // Если нету, добавляем.
    if (!(root.className).includes('active')) {
      if ((root.className).length === 0) {
        root.className = 'active';
      }
      root.className = `${root.className} active`;

    }
  } else {
    // если не видим ключа  ,
    // смотрим класс 'active' и удаляем его.
    if ((root.className).includes('active')) {
      root.className = root.className.replace('active', '');

    }
  }
  return true;
}

/**
 * cookie Installing
 */
function setCookie(name: string, value: string, options: CookieOptions = {}): void {

  options = {
    path: '/',
    ...options
  };

  if (options.expires instanceof Date) {
    options.expires = options.expires.toUTCString();
  }


  // Calculate max age in seconds
  const maxAgeInSeconds = options.expires ? Math.floor((new Date(options.expires).getTime() - Date.now()) / 1000) : undefined;

  // Store max age in local storage
  if (maxAgeInSeconds) {
    localStorage.setItem(`${name}_maxAge`, String(maxAgeInSeconds));
  }

  // Encode name and value of cookie
  let updatedCookie = encodeURIComponent(name) + "=" + encodeURIComponent(value);

  for (const optionKey in options) {
    updatedCookie += "; " + optionKey;
    const optionValue = options[optionKey as keyof CookieOptions];
    if (optionValue !== true) {
      updatedCookie += optionValue as string;
    }
  }
  //  "sessionId=f835abe5-2cd4-4dd4-b797-b3da92ffd005; path=/; expires=1723938402215; domain=localhost; secure=false; sameSite=Strict"

  document.cookie = updatedCookie;
}

/**
 * Checking how much time is left for a specific cookie
 * @param cookieName : string/ This is a cookie-name.
 * @returns
 */
export function getRemainingTime(cookieName: string): number | null {
  const maxAgeStr = localStorage.getItem(`${cookieName}_maxAge`);

  if (maxAgeStr) {
    const maxAge = parseInt(maxAgeStr, 10);

    // Return remaining time or null if expired
    return maxAge > 0 ? maxAge : null;
  }

  return null; // Cookie does not exist or no max age stored
}

/**
 * Searcher for cookie's key
 * @param name
 * @returns
 */
export function getCookie(name: string) {
  // eslint-disable-next-line
  let matches = document.cookie.match(new RegExp("(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(cookieName: string): void {
  document.cookie = `${cookieName}=; Max-Age=0; path=/;`;
}

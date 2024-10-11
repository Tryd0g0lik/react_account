/**
 * Here is a form of authorization
 */
import React from 'react';
import { add } from '@Services/fetches';

async function handlerFormLoginIn(event: React.KeyboardEvent): Promise<void> {
  if (((event.type)
    && (
      !(event.type).toLowerCase().includes('keydown') ||
      (event.type).toLowerCase().includes('click')
    ))
    && (
      (event.type) && ((event).type).toLowerCase().includes('keydown') &&
      (((event.target as HTMLElement).getAttribute('name') === null) ||
        (((event.target as HTMLElement).getAttribute('name') !== null) &&
          (
            !((event.target as HTMLElement).getAttribute('name') as string).includes('password') ||
            !((event.target as HTMLElement).getAttribute('name') as string).includes('username')
          )))
    )) {
    return;
  }
  event.preventDefault();
  const divHTML = (event.currentTarget as HTMLDivElement);
  const htmlInputLogin = (divHTML.querySelector('form input[type="text"]') as HTMLInputElement);
  const htmlInputPassword = (divHTML.querySelector('form input[type="password"]') as HTMLInputElement);
  const inputLoginStr = htmlInputLogin.value !== undefined ? htmlInputLogin.value : '';
  const inputPasswordStr = htmlInputPassword.value !== undefined ? htmlInputPassword.value : '';
  if ((inputPasswordStr.length < 5) || (inputLoginStr.length < 5)) {
    return;
  }
  const bodyStr = JSON.stringify({
    "username": inputLoginStr,
    "password": inputPasswordStr,
  });

  const responce = await add(bodyStr)

  console.log(`Responce: ${JSON.stringify(responce as typeof JSON)}`);


}

export function GoLoginInFC(): React.JSX.Element {
  return (
    <div onKeyDown={handlerFormLoginIn} className='regist'>
      <form>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input type="text" className="grow" name="username" placeholder="Username" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70">
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd" />
          </svg>
          <input type="password" className="grow" name="password" placeholder="Your password" />
        </label>
      </form>
    </div>);
}

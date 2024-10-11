/**
 * Here is a form of authorization
 */
import React from 'react';
import { add, get } from '@Services/fetches';
// import { ObjectFlags } from 'typescript';
import { Press, ResponceOuthorisation } from '@Interfaces';
import { checkCookieExists, setSessionIdInCookie } from '@Services/coockieSessionId';


async function handlerFormLoginIn(event: React.KeyboardEvent): Promise<void> {
  if ((event.key) && !(((event.key).toLowerCase()).includes('enter'))) {
    return;
  }
  event.preventDefault();
  let divHTML = (event.currentTarget as HTMLDivElement);
  const htmlInputLogin = (divHTML.querySelector('form input[type="text"]') as HTMLInputElement);
  const htmlInputPassword = (divHTML.querySelector('form input[type="password"]') as HTMLInputElement);
  const inputLoginStr = htmlInputLogin.value !== undefined ? htmlInputLogin.value : '';
  const inputPasswordStr = htmlInputPassword.value !== undefined ? htmlInputPassword.value : '';
  if ((inputPasswordStr.length < 3) || (inputLoginStr.length < 5)) {
    return;
  }

  /* SEND TO SERVER */
  const bodyStr = JSON.stringify({
    "username": inputLoginStr,
    "password": inputPasswordStr,
  });

  let responce = await add(bodyStr);
  if ((typeof responce).includes('boolean')) {
    return;
  }

  const objArr = Object.keys(responce);
  if (objArr.length < 2) {
    throw new Error("[Error => handlerFormLoginIn]: The keys 'access', 'refresh' not was received");
  }
  const access = (responce as ResponceOuthorisation)['access'];
  const refresh = (responce as ResponceOuthorisation)['refresh'];
  /* COOKIE SAVE */
  console.log(`Responce: ${JSON.stringify(responce as typeof JSON)}`);
  const cookieKeys = {
    "access": access,
    "refresh": refresh
  };

  /* COOKIE CHACKE */
  setSessionIdInCookie(cookieKeys);
  const cookieBoolean = checkCookieExists('refresh');
  if (!cookieBoolean) {
    throw new Error('[Error => handlerFormLoginIn]: What is wrong. Does bot work! ');
  }

  /* CHANGE THE DOM */
  const rootHtml = document.getElementById('root');
  if (rootHtml === null) {
    throw new Error('[Error => handlerFormLoginIn]: "root" not found!');
  }
  divHTML = document.createElement('div');
  divHTML.className = 'press';
  const buttonHtml = document.createElement('button');
  buttonHtml.className = 'press-button';
  buttonHtml.innerText = 'Добавить';
  divHTML.innerHTML += buttonHtml.outerHTML;
  rootHtml.insertAdjacentHTML('beforeend', divHTML.outerHTML);

  /* GETING PRESS */
  responce = await get();
  if ((typeof responce).includes('boolean')) {
    return;
  }

  for (let i = 0; i < (responce as Array<object>).length; i++) {
    // objArr = Object.keys((responce as Array<object>)[i]);
    // if (objArr.length < 2) {
    //   throw new Error("[Error => handlerFormLoginIn]: The keys 'access', 'refresh' not was received");
    // }
    const oneObject = (responce as Array<object>)[i] as Press;
    divHTML.className = 'press-entry';
    const divPreviewHTML = divHTML.cloneNode() as HTMLDivElement;
    divPreviewHTML.style.display = 'none';
    if ((oneObject).image !== null) {

      divPreviewHTML.className = "press-preview";
      divPreviewHTML.style.backgroundImage = `url(${(oneObject).image as string})`;
      divPreviewHTML.style.display = "inline-block";
      divPreviewHTML.style.width = String(150) + 'px';
      divPreviewHTML.style.minHeight = String(170) + 'px';
      divPreviewHTML.style.minHeight = String(170) + 'px';
      divPreviewHTML.style.overflow = 'hidden';
    }
    buttonHtml.innerText = "Читать далее";
    divHTML.innerHTML = `<div>
      <div class='press-h'>${(oneObject.title as string).trim()}</div>
      <div class="press-content">
        <a href="/${(oneObject.slug as string).trim()}/">

          ${divPreviewHTML.outerHTML}
          <div>
            ${oneObject.content as string}
          </div>
          <div class="press-more">
            ${buttonHtml.outerHTML}
          </div>
        </a>
      </div>
    </div>`;

    /* get div.className 'press' */
    const pressHtml = document.querySelector('.press');
    if (pressHtml === null) {
      throw new Error("[Error => handlerFormLoginIn]: What is wrong. Does bot work!");
    }
    pressHtml.insertAdjacentHTML('beforeend', divHTML.outerHTML);
  }

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

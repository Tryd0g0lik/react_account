/* Here is a handler for fuction the  'GoLoginInFC' */
import { ResponceOuthorisation } from "@Interfaces";
import { GetTotalContent } from "@Services/content";
import { setSessionIdInCookie } from "@Services/cookieSessionId";
import { add } from "@Services/fetches";

/**
 * Handler for form a  'Login in'
 * @param event KeyboardEvent
 * @returns Promise<void>
 */
export async function handlerFormLoginIn(event: React.KeyboardEvent): Promise<void> {
  if ((event.key) && !(((event.key).toLowerCase()).includes('enter'))) {
    return;
  }
  event.preventDefault();
  const divHTML = (event.currentTarget as HTMLDivElement);
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

  const responce = await add(bodyStr);
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
  setSessionIdInCookie(cookieKeys);


  /* CHANGE THE DOM  and CONTENT's PUBLISH */
  const rootHtml = document.getElementById('root');
  if (rootHtml === null) {
    throw new Error('[Error => handlerFormLoginIn]: "root" not found!');
  }

  void GetTotalContent(rootHtml);


}

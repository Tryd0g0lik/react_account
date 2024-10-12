/* This a handler for the component 'GetFormRegistrationsFC' */
import { checkCookieExists } from "@Services/cookieSessionId";
import { add } from "@Services/fetches";
let env_ = process.env.REACT_APP_POSTGRES_HOST;
const HOST = (env_ === undefined) ? 'localhost' : env_.slice(0);
env_ = process.env.REACT_APP_SERVER_PORT;
const PORT = (env_ === undefined) ? '7070' : env_.slice(0);
env_ = process.env.REACT_APP_PROTOCOL_OF_URL;
const PROTOCOL = (env_ === undefined) ? 'http' : env_.slice(0);
env_ = process.env.REACT_APP_SET_TTIMOUT;
env_ = undefined;

export async function handlerFormRegistrations(event: React.KeyboardEvent): Promise<void> {
  if ((event.key) && !(((event.key).toLowerCase()).includes('enter'))) {
    return;
  }
  event.preventDefault();
  const cookieGetTrueFalse = await checkCookieExists('access');
  if (cookieGetTrueFalse) {
    console.warn('Регистрация прервана! Вы уже авторизованы.');
    return;
  }
  const regex = /^[A-Za-z0-9-_]+$/;
  const regexName = /^[A-Za-zА-Яа-я0-9]+$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const divHTML = await (((event.target as HTMLElement).parentElement as HTMLLabelElement).parentElement) as HTMLFormElement;
  const htmlInputEmail = (divHTML.querySelector('form input[name="email"]') as HTMLInputElement);
  const htmlInputFirstName = (divHTML.querySelector('form input[name="first_name"]') as HTMLInputElement);
  const htmlInputLastName = (divHTML.querySelector('form input[name="last_name"]') as HTMLInputElement);
  const htmlInputUserName = (divHTML.querySelector('form input[name="username"]') as HTMLInputElement);
  const htmlInputPassword = (divHTML.querySelector('form input[name="password"]') as HTMLInputElement);
  const htmlInputPassword2 = (divHTML.querySelector('form input[name="password2"]') as HTMLInputElement);

  /* CHECKER for a value */
  if (htmlInputEmail === null || htmlInputEmail.value.length < 3 || !emailRegex.test(htmlInputEmail.value) ||
    htmlInputFirstName === null || htmlInputFirstName.value.length < 3 || !regexName.test(htmlInputFirstName.value) ||
    htmlInputLastName === null || htmlInputLastName.value.length < 3 || !regexName.test(htmlInputLastName.value) ||
    htmlInputUserName === null || htmlInputUserName.value.length < 3 || !regexName.test(htmlInputUserName.value) ||
    htmlInputPassword === null || htmlInputPassword.value.length < 3 || !regex.test(htmlInputPassword.value) ||
    htmlInputPassword2 === null || htmlInputPassword2.value.length < 3 ||
    htmlInputPassword.value !== htmlInputPassword2.value
  ) {
    console.error("[ERROR => handlerFormRegistrations]: Something wrong. Not working");
    return;
  }
  const body_ = JSON.stringify({
    "email": htmlInputEmail.value,
    "first_name": htmlInputFirstName.value,
    "last_name": htmlInputLastName.value,
    "username": htmlInputUserName.value,
    "password": htmlInputPassword.value
  });

  const responce = await add(body_, '/api/v1/registration/');
  if (!responce) {
    console.error("[ERROR => handlerFormRegistrations]: Samething what wrong.The registration did not go well!");
    return;
  }
  console.warn("[WARN => handlerFormRegistrations]: User's registration did go very well!");
  location.href = `http://localhost:8080/`;
}


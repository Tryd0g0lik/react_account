import { checkCookieExists } from "@Services/cookieSessionId";
import { add } from "@Services/fetches";

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

  const divHTML = await (event.currentTarget as HTMLDivElement);
  const htmlInputEmail = (divHTML.querySelector('form input[name="email"]') as HTMLInputElement);
  const htmlInputFirstName = (divHTML.querySelector('form input[name="first_name"]') as HTMLInputElement);
  const htmlInputLastName = (divHTML.querySelector('form input[name="last_name"]') as HTMLInputElement);
  const htmlInputUserName = (divHTML.querySelector('form input[name="username"]') as HTMLInputElement);
  const htmlInputPassword = (divHTML.querySelector('form input[name="password"]') as HTMLInputElement);
  const htmlInputPassword2 = (divHTML.querySelector('form input[name="password2"]') as HTMLInputElement);

  /* CHECKER for a value */
  if (htmlInputEmail === null || htmlInputEmail.value.length < 3 ||
    htmlInputFirstName === null || htmlInputFirstName.value.length < 3 ||
    htmlInputLastName === null || htmlInputLastName.value.length < 3 ||
    htmlInputUserName === null || htmlInputUserName.value.length < 3 ||
    htmlInputPassword === null || htmlInputPassword.value.length < 3 ||
    htmlInputPassword2 === null || htmlInputPassword2.value.length < 3 ||
    htmlInputPassword.value !== htmlInputPassword2.value
  ) {
    throw new Error("[ERROR => handlerFormRegistrations]: Something wrong. Not working");
  }
  const body_ = JSON.stringify({
    "email": htmlInputEmail.value,
    "first_name": htmlInputFirstName.value,
    "last_name": htmlInputLastName.value,
    "username": htmlInputUserName.value,
    "password": htmlInputPassword.value
  });

  const responce = await add(body_, 'https://darkdes-django-t3b02.tw1.ru/api/v1/registration/');
  if (!responce) {
    throw new Error("[ERROR => handlerFormRegistrations]: Samething what wrong.The registration did not go well!");
  }
}


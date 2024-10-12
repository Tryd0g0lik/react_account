/**
 * Заготовка для работы с компонентом "ChangePasswordFC"
 * Проблема. См. П. "Change Password - Изменение пароля" в фале "README.md"
 * Точнее - Как провести аутентификацию, чтоб убедится - "запрос 
на изменение пароля отправляется владельцем пароля"?
 * @param event
 * @returns
 */
export async function handlerFormChangePassword(event: React.KeyboardEvent): Promise<void> {
  if ((event.key) && !(((event.key).toLowerCase()).includes('enter'))) {
    return;
  }
  event.preventDefault();
  const divHTML = await (event.currentTarget as HTMLDivElement);
  const htmlInputPassword = (divHTML.querySelector('form input[name="password"]') as HTMLInputElement);
  const htmlInputPassword2 = (divHTML.querySelector('form input[name="password2"]') as HTMLInputElement);
  const htmlInputPassword3 = (divHTML.querySelector('form input[name="password3"]') as HTMLInputElement);
  const passwordStr = ((htmlInputPassword) !== null) ? (htmlInputPassword).value : '';
  const passwordStr2 = ((htmlInputPassword2) !== null) ? (htmlInputPassword2).value : '';
  const passwordStr3 = ((htmlInputPassword3) !== null) ? (htmlInputPassword3).value : '';

  if ((passwordStr.length < 3) ||
    (passwordStr2.length < 3) || (passwordStr3.length < 3)) {
    return;
  }

}


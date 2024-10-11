## Обзор
Верхнее меню содержит 3 ссылки: \
- `Login in` - Авторизация;
- `Sign up` - Регистрации;
- `Change Password` - Изменить пароль.
Формы без валидации.

### Login in
Эта форма имеет два ввода. Это для входа и пароля. \
Имея коректный даннные получаем `refresh` – токен обновления \
токена доступа  и `access` – токен доступа. \
`refresh` и `access` заносим в cookie. и добавляем class `active`. \
```html
<div id="root" class="active"></div>
```




## ENV
Файл `.env.example` переименуйте в `.env` и внесите свои данные.

## Команды
```text
// Установка зависимостей
`npm run install` или `npm run install package.json`

// Установить зависимовти backend (логика сервера)
`npm --workspace=backend run i package.json`

// Подключаем wf `tailwindcss`
`npm run cssstyle`

// Запустить проверки стиля для написанного кода
`npm run lint`

// Развернуть файлы (frontend) в режиме сборки
`npm run build:front`

// Развернуть файлы (backend)
`npm run build:back`

// Для работы с проектом запустить сервер (frontend)
`npm run server:front`

// Для работы с проектом запустить сервер (backend)
`npm run server:back`

// Запуск husk который в автоматическом режиме будет реагировать на
// команды коммита (`git commit`) и запускать `lint`
`npm run prepare`

// Для установки дополнительных зависимостей, общих для frontend и  backend
`npm -W i ....`

// Для установки дополнительных зависимостей на backend
`npm  --workspace=backend i ....`

// Для установки дополнительных зависимостей на frontend
`npm  --workspace=frontend i ....`
```

import { get } from '@Services/fetches';
import { Press } from '@Interfaces';
import { checkCookieExists } from '@Services/cookieSessionId';
const env_ = process.env.REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL;
const REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL = (env_ === undefined) ? 100 : Number(env_);
export async function GetTotalContent(rootHtml: HTMLElement): Promise<void> {
  /* COOKIE CHACKE */

  const cookieBoolean = checkCookieExists('refresh');
  if (!cookieBoolean) {
    throw new Error('[Error => handlerFormLoginIn]: Cookie was not finded!');
  }
  /* GETING CONTENT */
  const responce = await get();
  if ((typeof responce).includes('boolean')) {
    return;
  }
  const divHTML = document.createElement('div');
  divHTML.className = 'press';

  const buttonHtml = document.createElement('button');
  buttonHtml.className = 'press-button';
  buttonHtml.innerText = 'Добавить';
  divHTML.innerHTML = buttonHtml.outerHTML;
  rootHtml.insertAdjacentHTML('beforeend', divHTML.outerHTML);

  for (let i = 0; i < (responce as Array<object>).length; i++) {
    const oneObject = (responce as Array<object>)[i] as Press;

    divHTML.className = 'press-entry';
    // index
    divHTML.setAttribute('name-index', String(oneObject.id));
    const divPreviewHTML = divHTML.cloneNode() as HTMLDivElement;
    divPreviewHTML.style.display = 'none';
    if ((oneObject).image !== null) {
      divPreviewHTML.className = "press-preview";
      // Image
      divPreviewHTML.style.backgroundImage = `url(${(oneObject).image as string})`;
      divPreviewHTML.style.display = "inline-block";
      divPreviewHTML.style.width = String(150) + 'px';
      divPreviewHTML.style.minHeight = String(170) + 'px';
      divPreviewHTML.style.minHeight = String(170) + 'px';
      divPreviewHTML.style.overflow = 'hidden';
    }
    buttonHtml.innerText = "Читать далее";
    buttonHtml.setAttribute('name-index', String(oneObject.id));
    // title, slug, content
    divHTML.innerHTML = `<div>
      <div class='press-h'>${(oneObject.title as string).trim()}</div>
      <div class="press-content" name-index="${String(oneObject.id)}">
        <a href="/press/${String(oneObject.id)}/${(oneObject.slug as string).trim()}/">

          ${divPreviewHTML.outerHTML}
          <div>
            ${(oneObject.content as string).slice(0, 150)}...
          </div>
        </a>
        <div class="press-more">
          ${buttonHtml.outerHTML}
        </div>

      </div>
    </div>`;

    /* get div.className 'press' */
    const pressHtml = document.querySelector('.press');
    if (pressHtml === null) {
      throw new Error("[Error => handlerFormLoginIn]: What is wrong. Does bot work!");
    }
    pressHtml.insertAdjacentHTML('beforeend', divHTML.outerHTML);
  }
  /* get div.className 'press' */
  const pressHtmlTotal = document.querySelector('.press');
  if (pressHtmlTotal === null) {
    throw new Error("[Error => handlerFormLoginIn]: What is wrong. Does bot work!");
  }
  /* ADD a total the event listener  */
  (pressHtmlTotal as HTMLDivElement).removeEventListener('click', handlerButtonPressMore);
  (pressHtmlTotal as HTMLDivElement).addEventListener('click', handlerButtonPressMore);
}

/**
 * This function is an handler for the event to press by button 'Читать ещё'
 * @param event MouseEvent the click.
 * @returns  Promise<void>
 */
async function handlerButtonPressMore(event: MouseEvent): Promise<void> {
  /* GET BUTTOM 'Читать ещё' */
  const target = event.target as HTMLElement;
  if ((target.tagName.toLowerCase()).includes('a')) {
    // event.preventDefault();

    const pathnameOfHref: string = (target as HTMLAnchorElement).pathname;
    // document.location.replace()
    return;
  }
  if (!(target.tagName.toLowerCase()).includes('button')) {
    return;
  }
  event.preventDefault();
  const getAttributeIndex = target.getAttribute('name-index');
  if (getAttributeIndex === null) {
    return;
  }

  /* COOKIE CHACKE */
  const cookieBoolean = checkCookieExists('refresh');
  if (!cookieBoolean) {
    throw new Error('[Error => handlerFormLoginIn]: Cookie was not finded! ');
  }

  /* GETING CONTENT */
  const pathnameStr = `/api/v1/articles/${getAttributeIndex}/`;
  const responce = await get(pathnameStr);
  if ((typeof responce).includes('boolean')) {
    return;
  }


  /* GET OLD COMTENT of single position */
  const singleContentHtml = document.querySelector(`.press-content[name-index="${getAttributeIndex}"] > a div:last-of-type`);
  if (singleContentHtml === null) {
    throw new Error("[Error => handlerButtonPressMore]: What is wrong. Does bot work!");
  }


  /* ADD CONTENT after the push by button 'Читать ещё' */
  const oldContentLength = ((singleContentHtml as HTMLDivElement).outerText).length - 3;
  const keysList: [] | string[] = Object.keys(responce);
  if (keysList.length < 5) {
    return;
  }
  const oneContentLengthFull = ((responce as Press).content as string).length;
  if (oldContentLength + REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL === oneContentLengthFull) {
    (singleContentHtml as HTMLDivElement).innerText =
      ((responce as Press).content as string).slice(0, oldContentLength + REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL);

  }
  else {
    (singleContentHtml as HTMLDivElement).innerText =
      ((responce as Press).content as string).slice(0, oldContentLength + REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL) + '...';
  }

}

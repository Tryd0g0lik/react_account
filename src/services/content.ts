import { get } from '@Services/fetches';
import { Article } from '@Interfaces';
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
  divHTML.className = 'article';

  const buttonHtml = document.createElement('button');
  buttonHtml.className = 'article-button';
  buttonHtml.innerText = 'Добавить';
  divHTML.innerHTML = buttonHtml.outerHTML;
  rootHtml.insertAdjacentHTML('beforeend', divHTML.outerHTML);

  for (let i = 0; i < (responce as Array<object>).length; i++) {
    const oneObject = (responce as Array<object>)[i] as Article;

    divHTML.className = 'article-entry';
    // index
    divHTML.setAttribute('data-index', String(oneObject.id));
    const divPreviewHTML = divHTML.cloneNode() as HTMLDivElement;
    divPreviewHTML.style.display = 'none';
    if ((oneObject).image !== null) {
      divPreviewHTML.className = "article-preview";
      // Image
      divPreviewHTML.style.backgroundImage = `url(${(oneObject).image as string})`;
      divPreviewHTML.style.display = "inline-block";
      divPreviewHTML.style.width = String(150) + 'px';
      divPreviewHTML.style.minHeight = String(170) + 'px';
      divPreviewHTML.style.minHeight = String(170) + 'px';
      divPreviewHTML.style.overflow = 'hidden';
    }
    buttonHtml.innerText = "Читать далее";
    buttonHtml.setAttribute('data-index', String(oneObject.id));
    // title, slug, content
    divHTML.innerHTML = `<div>
      <div class='article-h'>${(oneObject.title as string).trim()}</div>
      <div class="article-content" data-index="${String(oneObject.id)}">
        <a href="/article/${String(oneObject.id)}/${(oneObject.slug as string).trim()}/">

          ${divPreviewHTML.outerHTML}
          <div>
            ${(oneObject.content as string).slice(0, 150)}...
          </div>
        </a>
        <div class="article-more">
          ${buttonHtml.outerHTML}
        </div>

      </div>
    </div>`;

    /* get div.className 'article' */
    const articleHtml = document.querySelector('.article');
    if (articleHtml === null) {
      throw new Error("[Error => handlerFormLoginIn]: What is wrong. Does bot work!");
    }
    articleHtml.insertAdjacentHTML('beforeend', divHTML.outerHTML);
  }
  /* get div.className 'article' */
  const articleHtmlTotal = document.querySelector('.article');
  if (articleHtmlTotal === null) {
    throw new Error("[Error => handlerFormLoginIn]: What is wrong. Does bot work!");
  }
  /* ADD a total the event listener  */
  (articleHtmlTotal as HTMLDivElement).removeEventListener('click', handlerButtonArticleMore);
  (articleHtmlTotal as HTMLDivElement).addEventListener('click', handlerButtonArticleMore);
}

/**
 * This function is an handler for the event to article by button 'Читать ещё'
 * @param event MouseEvent the click.
 * @returns  Promise<void>
 */
async function handlerButtonArticleMore(event: MouseEvent): Promise<void> {
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
  const getAttributeIndex = target.getAttribute('data-index');
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
  const singleContentHtml = document.querySelector(`.article-content[data-index="${getAttributeIndex}"] > a div:last-of-type`);
  if (singleContentHtml === null) {
    throw new Error("[Error => handlerButtonArticleMore]: What is wrong. Does bot work!");
  }


  /* ADD CONTENT after the push by button 'Читать ещё' */
  const oldContentLength = ((singleContentHtml as HTMLDivElement).outerText).length - 3;
  const keysList: [] | string[] = Object.keys(responce);
  if (keysList.length < 5) {
    return;
  }
  const oneContentLengthFull = ((responce as Article).content as string).length;
  if (oldContentLength + REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL === oneContentLengthFull) {
    (singleContentHtml as HTMLDivElement).innerText =
      ((responce as Article).content as string).slice(0, oldContentLength + REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL);

  }
  else {
    (singleContentHtml as HTMLDivElement).innerText =
      ((responce as Article).content as string).slice(0, oldContentLength + REACT_APP_CONTENT_READ_MORE_INTG_OF_ADD_SIMBOL) + '...';
  }

}

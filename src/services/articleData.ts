import { Article } from '@Interfaces';
import { get } from '@Services/fetches';

export async function fetchArticleData(index: string): Promise<Article> {

  const pathnameStr = `/api/v1/articles/${index}`;
  const oneArticleOrBool = await get(pathnameStr);
  if ((typeof oneArticleOrBool).includes('boolean')) {
    // throw new Error('[Error => handlerFormLoginIn]: Cookie was not finded! ');
    return {};
  }
  return oneArticleOrBool as object;
}

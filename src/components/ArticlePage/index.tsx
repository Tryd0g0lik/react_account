import { GetTopMenu } from '@Components/Header';
import { Article } from '@Interfaces';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

export function ArticlePageFC(): React.JSX.Element {
  const data: Article = useLoaderData() as Article;

  const image = (data.image === undefined || data.image === null) ? '' : String(data.image);

  return (<>
    <GetTopMenu />
    {data ? (
      <div className='article'>
        <div className='article-h'>
          <h1>{data.title}</h1>
        </div>
        <div>
          <div className="article-content">
            <div className="article-preview">
              <img src={image} />
            </div>
            <div>
              {data.content}
            </div>
            {/* ${divPreviewHTML.outerHTML} */}

            <div data-author={data.author?.id as number} className="article-autor">
              <div>Автор: {data.author?.username}</div>
              <div>Email: {data.author?.email}</div>
            </div>
          </div>
        </div>
      </div >
    ) : (
      <p>No article found.</p>
    )
    }
  </>);
}

import { GetTopMenu } from '@Components/Header';
import { Press } from '@Interfaces';
import React from 'react';
import { useLoaderData } from 'react-router-dom';

export function PressPageFC(): React.JSX.Element {
  const data: Press = useLoaderData() as Press;

  const image = (data.image === undefined || data.image === null) ? '' : String(data.image);

  return (<>
    <GetTopMenu />
    {data ? (
      <div className='press'>
        <div className='press-h'>
          <h1>{data.title}</h1>
        </div>
        <div>
          <div className="press-content">
            <div className="press-preview">
              <img src={image} />
            </div>
            <div>
              {data.content}
            </div>
            {/* ${divPreviewHTML.outerHTML} */}

            <div data-author={data.author?.id as number} className="press-autor">
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

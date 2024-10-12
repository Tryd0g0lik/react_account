/**
 * Here is a path's router.
 */
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetFormRegistrationsFC } from './Forms/Registrations.tsx';
import { fetchArticleData } from '@Services/articleData.ts';
import { ArticlePageFC } from './ArticlePage/index.tsx';
import { FormsFC } from './Forms/index.tsx';


const router_ = createBrowserRouter([
  {
    path: '/',
    element: <FormsFC />
  },
  {
    path: '/article/:index/:slug', // Dynamic route for articles
    element: <ArticlePageFC />,
    // Regular exarticleion to match specific patterns
    loader: async ({ params }) => {
      const { index, slug } = await params;
      // Ensure both index and slug are present
      if (!index || !slug) {
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw new Response('Not Found', { status: 404 });
      }

      const regex = /article\/[0-9]+\/[a-zA-Z0-9-]+\/$/; // Example regex for matching slugs
      if (!regex.test(`article/${index}/${slug}/`)) {
        const responce = new Response('Not Found', { status: 404 });
        // eslint-disable-next-line @typescript-eslint/only-throw-error
        throw responce;
      }
      // Fetch article data based on slug if needed
      const resp = await fetchArticleData(index);
      return resp as object;
    },
  },
]);

const pagesProvider = (
  <RouterProvider router={router_} />
);

type PP = typeof pagesProvider;
export function PagesRouter(): PP {
  return pagesProvider;
}

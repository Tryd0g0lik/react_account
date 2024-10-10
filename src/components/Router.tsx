import * as React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { GetFormRegistrationsFC } from './forms/Registrations.tsx';


const router_ = createBrowserRouter([
  {
    path: '/',
    element: <GetFormRegistrationsFC />
  }
]);

const pagesProvider = (
  <RouterProvider router={router_} />
);

type PP = typeof pagesProvider;
export function PagesRouter(): PP {
  return pagesProvider;
}

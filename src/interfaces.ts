export enum Pages {
  Home = '/',
  Index = '/index',
  Regisration = '/registration',
  InLogin = '/inlogin',
  Profile = '/profile',
  Profile2 = '/profile/:profileIndex',
  ProfilePassworChanges = '/profile/password_change',
  Delete = '/profile/profile_dalete',
  Ads = '/profile/ads'
}

export enum FetchMethod {
  POST = 'POST',
  GET = 'GET',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE'
}

export interface FetchParams {
  method: FetchMethod
  body?: string
  headers?: {
    'X-CSRFToken'?: string
    'Content-Type': 'application/json'
  }
  mode?: 'no-cors' | 'cors'
}


export interface Article {
  "id"?: number
  "author"?: {
    "id"?: number
    "username"?: string
    "email"?: string
  },
  "title"?: string
  "slug"?: string
  "content"?: string
  "created"?: string
  "updated"?: string
  "image"?: string
  "email"?: string
  "first_name"?: string
  "last_name"?: string
  "username"?: string
  "password"?: string
}

export interface CookieKeys {
  access: string
  refresh: string
  [key: string]: string;
}

export interface CookieOptions {
  expires?: Date | string
  path?: string
  domain?: string
  secure?: boolean
  sameSite?: 'Strict' | 'Lax' | 'None';
}
export interface Res {
  massege: string
  sessionId?: string;
}

export interface ResponceOuthorisation {
  access: string
  refresh: string
}

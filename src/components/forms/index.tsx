/* This is a code for the main page. This page has a three forms*/
import React, { useEffect, useState } from 'react';
import { ChangePasswordFC } from './ChangePassword.tsx';
import { GoLoginInFC } from './GoLoginIn.tsx';
import { GetFormRegistrationsFC } from './Registrations.tsx';
import { GetTopMenu } from '@Components/Header/index.tsx';
import { GetTotalContent } from '@Services/content.ts';

function handlerLinkOfTopMenu(state: React.Dispatch<React.SetStateAction<string>>) {

  return (event: React.MouseEvent): void => {

    let resultEvent = '';
    if ((event.type) && (
      !((event.type).toLowerCase()).includes('click') ||
      !((event.target as HTMLElement).tagName.toLowerCase()).includes('a')
    )) {
      return;
    }
    event.preventDefault();

    const target = (event.target) as HTMLAnchorElement;
    if ((target.outerText).includes('Login in')) {
      resultEvent += 'loginIn';
    } else if ((target.outerText).includes('Sign up')) {
      resultEvent += 'registration';
    } else if ((target.outerText).includes('Change Password')) {
      resultEvent += 'changePass';
    } else {
      return;
    }

    state(resultEvent);
    return;
  };
}


/**
 *
 * This is a code for the main page. On this page here is
 *  a three forms. Default form  - 'Login in' and plus
 *  'Sign up' , 'Change Password'.
 * @returns
 */
export function FormsFC(): React.JSX.Element {
  const [formname, setFormname] = useState('loginIn');
  const [loading, setLoading] = useState(false);

  useEffect(() => {


    console.log('Loading content...', loading);

    return () => {
      void uploadContent();
    };

  }, []);
  /**
  *  change the dom and get content
  * @returns Promise<void>
  */
  async function uploadContent(): Promise<void> {

    const rootHtml = document.getElementById('root');
    if (rootHtml === null) {
      throw new Error('[Error => handlerFormLoginIn]: "root" not found!');
    }
    if (!loading) {
      await GetTotalContent(rootHtml);
    }
    setLoading(true);
  }
  /* ---- endUploadContent ----*/
  const form = (formname).includes('loginIn') ? <GoLoginInFC /> : (
    (formname).includes('changePass') ? <ChangePasswordFC /> : (
      (formname).includes('registration') ? <GetFormRegistrationsFC /> : null
    )
  );
  return (<>
    <div onClick={handlerLinkOfTopMenu(setFormname)}>
      <GetTopMenu />
      {form}
    </div>
  </>);
}

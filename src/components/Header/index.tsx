import React from 'react';

export function GetTopMenu(): React.JSX.Element {
  return (<header>
    <nav>
      <div className='topmenu'><a href='/loginIn'>Login in</a></div>
      <div className='topmenu'><a href='/signUp'>Sign up</a></div>
      <div className='topmenu'><a href='/signUp'>Change Password</a></div>
    </nav>
  </header>);
}

import React from 'react';
/**
 * This is a form of comments to publish.
 * @returns
 */
export function GetFormOfComments(): React.JSX.Element {
  return (<div className='comments'>
    <form>
      <label className="input input-bordered flex items-center gap-2">
        <input type="text" className="grow" name="username" placeholder="Username" />
      </label>
      <label className="input input-bordered flex items-center gap-2">

        <input type="text" className="grow" placeholder="Email" />
      </label>
      <textarea
        placeholder="Bio"
        className="textarea textarea-bordered textarea-lg w-full max-w-xs"></textarea>
      <div className='button comment-biutton '>
        <button className="btn">Normal</button>
      </div>
    </form>
    {/* <div className="chat chat-start">
      <div className="chat-bubble">
        It is over Anakin,
        <br />
        I have the high ground.
      </div>
    </div>

    <div className="chat chat-end">
      <div className="chat-bubble">You underestimate my power!</div>
    </div> */}
  </div>);
}

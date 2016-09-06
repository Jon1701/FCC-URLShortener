import React from 'react';

// Component definition.
export default class Description extends React.Component {

  // Component constructor.
  constructor() {
    super();
  }; // End component constructor.

  // Component render.
  render() {
    return (
      <div id="description">

        <h1 className="title text-center">URL Shortener Service</h1>

        <p className="description">
          Quis voluptate qui qui aliquip Lorem sint reprehenderit id pariatur cillum anim incididunt dolore quis reprehenderit.

          Nostrud irure minim labore esse qui incididunt nulla laborum labore reprehenderit enim consectetur aliqua proident eu irure.
        </p>
      </div>
    );
  }; // End component render.

}; // End component definition.

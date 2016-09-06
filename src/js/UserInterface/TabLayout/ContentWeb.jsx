// React dependencies.
import React from 'react';
import classNames from 'classnames';

// Other components.
import Results from './Results.jsx';

// Component definition.
export default class ContentWeb extends React.Component {

  // Component constructor.
  constructor() {
    super();
  }; // End component constructor.

  // Component render.
  render() {

    // Classes used in rendering this component.
    var myClasses = classNames({
      'hidden': this.props.contentId != this.props.activeTab
    });

    return (
      <div className={myClasses} id="content-web">

        <div className="container-inputbox">
          <input type="text" placeholder="Enter your link"/>
        </div>

        <div className="container-buttons">
          <div className="container-submit">
            <button type="submit" value="submit">Shorten</button>
          </div>
          <div className="container-reset">
            <button type="reset" value="reset">Clear</button>
          </div>
        </div>

        <Results/>

      </div>
    );
  }; // End component render.

}; // End component definition.

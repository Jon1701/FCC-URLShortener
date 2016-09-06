// React dependencies.
import React from 'react';

import classNames from 'classnames';

// Component definition.
export default class ContentAPI extends React.Component {

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
      <div className={myClasses}>
        Content API
      </div>
    );
  }; // End component render.

}; // End component definition.

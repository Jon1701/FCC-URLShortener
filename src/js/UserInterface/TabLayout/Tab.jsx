// React dependencies.
import React from 'react';

import classNames from 'classnames';

// Component definition.
export default class Tab extends React.Component {

  // Component constructor.
  constructor() {
    super();
  }; // End component constructor.

  // FUnction to set the active tab using callback from parent.
  changeActiveTab() {
    this.props.setActiveTab(this.props.tabId);
  };

  // Component render.
  render() {

    // Classes used for this component.
    var myClasses = classNames({
      'tab': true,
      'tab-active': this.props.activeTab == this.props.tabId
    });

    return (
      <div className={myClasses} onClick={this.changeActiveTab.bind(this)}>
        {this.props.label}
      </div>
    );
  }; // End component render.

}; // End component definition.

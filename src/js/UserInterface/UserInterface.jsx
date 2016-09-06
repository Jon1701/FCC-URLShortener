// React dependencies.
import React from 'react';

import Description from './Description.jsx';
import TabLayout from './TabLayout/TabLayout.jsx';

// Component definition.
export default class UserInterface extends React.Component {

  // Component constructor.
  constructor() {
    super();

    // Initial state.
    this.state = {
      activeTab: 0 // Currently active tab.
    }
  }; // End component constructor.

  // Callback to handle active tab change.
  updateActiveTab(tabId) {
    this.setState({
      activeTab: tabId
    });
  }

  // Component render.
  render() {
    return (
      <div>
        <Description/>
        
        <TabLayout activeTab={this.state.activeTab} setActiveTab={this.updateActiveTab.bind(this)}/>
      </div>
    );
  }; // End component render.

}; // End component definition.

// React dependencies.
import React from 'react';

import Tab from './Tab.jsx'
import ContentWeb from './ContentWeb.jsx';
import ContentAPI from './ContentAPI.jsx';


// Component definition.
export default class TabLayout extends React.Component {

  // Component constructor.
  constructor() {
    super();
  }; // End component constructor.

  // Component render.
  render() {
    return (
      <div>

        <div className="container-tabs">
          <Tab label={'Web Usage'} tabId={0} activeTab={this.props.activeTab} setActiveTab={this.props.setActiveTab}/>
          <Tab label={'API Usage'} tabId={1} activeTab={this.props.activeTab} setActiveTab={this.props.setActiveTab}/>
        </div>

        <div className="clearfix"/>

        <div className="container-content">

          <ContentWeb contentId={0} activeTab={this.props.activeTab} />
          <ContentAPI contentId={1} activeTab={this.props.activeTab} />

        </div>

      </div>
    );
  }; // End component render.

}; // End component definition.

// React dependencies.
import React from 'react';

import Tab from './Tab.jsx'

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
          Sunt deserunt ullamco voluptate aliquip occaecat consequat pariatur quis nostrud reprehenderit incididunt sunt nisi nostrud excepteur ipsum nulla. Nisi culpa qui nostrud voluptate aliqua sint dolor incididunt sunt consectetur cupidatat tempor est cupidatat laborum. Exercitation eiusmod aliqua do commodo anim nulla fugiat aliquip Lorem occaecat fugiat Lorem pariatur. Nisi quis sint voluptate amet consectetur duis anim sunt est pariatur. Excepteur voluptate sit laborum laboris incididunt ea nisi nulla elit nulla tempor anim. Ullamco incididunt exercitation irure qui commodo aute est occaecat est. Non ea consectetur adipisicing aute non Lorem nulla veniam aliquip deserunt tempor proident. Enim culpa proident cupidatat elit aliqua aute minim deserunt duis irure non dolore nostrud amet proident voluptate adipisicing.

          Deserunt ipsum tempor Lorem ex quis tempor laborum magna mollit laborum aliquip occaecat deserunt. Dolore reprehenderit et ex et Lorem sit eu aliquip cillum non. Aute proident cillum est ad est cupidatat amet pariatur sint adipisicing pariatur culpa sint in magna duis. Est aliquip eiusmod sit non ut culpa in dolore consequat eiusmod dolor labore tempor.

          Ipsum commodo ex ex laborum eu irure quis quis ut ex laboris id aliqua cupidatat. Dolor mollit cupidatat esse proident ea minim minim ad nulla sint non cupidatat excepteur. Mollit irure pariatur in adipisicing excepteur deserunt quis veniam exercitation. In Lorem id quis exercitation quis aute velit enim in magna excepteur irure amet duis ipsum qui. Duis elit ea sint duis proident voluptate duis proident ipsum eiusmod elit consequat elit est cillum duis id. Ad est excepteur sunt ullamco do veniam est ut. Non minim reprehenderit pariatur culpa consequat enim esse esse officia veniam tempor. Sint ea eu labore fugiat tempor dolor eu ex.

          Non mollit aliquip proident do do laboris nostrud commodo duis. Deserunt excepteur deserunt occaecat ex laborum sit qui officia consectetur tempor labore. In sit officia sit commodo ullamco in voluptate velit magna eu pariatur cupidatat occaecat esse occaecat et aliqua. Esse non esse cupidatat ullamco non aliqua nisi aliquip proident qui esse. Proident labore et cupidatat anim sunt dolore esse cupidatat dolore reprehenderit Lorem consequat pariatur.

        </div>

      </div>
    );
  }; // End component render.

}; // End component definition.

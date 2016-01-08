import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Avatar from 'react-md/Avatar';
// import { Avatar } from 'react-md';

import FontIcon from 'react-md/FontIcon';

export default class AvatarsExamples extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div>
        <div className="middle-align">
          <Avatar src="http://lorempixel.com/120/120/people" alt="some image" />
          <span>Avatar with an image.</span>
        </div>
        <div className="middle-align">
          <Avatar icon={<FontIcon iconClassName="fa fa-hand-spock-o" />} />
          <span>Avatar with a Font Awesome icon.</span>
        </div>
        <div className="middle-align">
          <Avatar icon={<FontIcon iconClassName="fa fa-rocket" />} random />
          <span>Avatar with a Font Awesome icon and a random color.</span>
        </div>
        <div className="middle-align">
          <Avatar>M</Avatar>
          <span>Avatar with a Letter and default color.</span>
        </div>
        <div className="middle-align">
          <Avatar random>O</Avatar>
          <span>Avatar with a Letter and a random color.</span>
        </div>
        <div className="middle-align">
          <Avatar color={2}>X</Avatar>
          <span>Avatar with a letter and avatar color 2.</span>
        </div>
      </div>
    );
  }
}

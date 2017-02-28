import React from 'react';
import List from 'react-md/lib/Lists/List';
import ListItem from 'react-md/lib/Lists/ListItem';
import ListItemControl from 'react-md/lib/Lists/ListItemControl';
import Checkbox from 'react-md/lib/SelectionControls/Checkbox';
import Switch from 'react-md/lib/SelectionControls/Switch';
import FontIcon from 'react-md/lib/FontIcons';

import randomAvatars from 'utils/RandomUtils/randomAvatars';

const chat = <FontIcon key="chat">chat</FontIcon>;
const avatars = randomAvatars(3);

const className = 'md-cell md-cell--6 md-paper md-paper--1';

const SimpleControlsExamples = () => (
  <div className="md-grid list-group">
    <List className={className}>
      <ListItemControl
        rightIcon={chat}
        primaryAction={
          <Checkbox
            id="lineItem1"
            name="lineItems"
            label="Line Item selected"
            defaultChecked
          />
        }
      />
      <ListItemControl
        rightIcon={chat}
        primaryAction={
          <Checkbox
            id="lineItem2"
            name="lineItems"
            label="Line Item unselected"
          />
        }
      />
      <ListItemControl
        rightIcon={chat}
        primaryAction={
          <Checkbox
            id="lineItem3"
            name="lineItems"
            label="Line Item selected"
            defaultChecked
          />
        }
      />
    </List>
    <List className={className}>
      <ListItemControl
        leftAvatar={avatars[0]}
        secondaryAction={
          <Checkbox
            id="rightLineItem1"
            name="lineItems"
            label="Line Item selected"
            labelBefore
            defaultChecked
          />
        }
      />
      <ListItemControl
        leftAvatar={avatars[1]}
        secondaryAction={
          <Checkbox
            id="rightLineItem2"
            name="lineItems"
            label="Line Item unselected"
            labelBefore
          />
        }
      />
      <ListItemControl
        leftAvatar={avatars[2]}
        secondaryAction={
          <Checkbox
            id="rightLineItem3"
            name="lineItems"
            label="Line Item selected"
            labelBefore
            defaultChecked
          />
        }
      />
    </List>
    <List className={className}>
      <ListItemControl
        leftIcon={<FontIcon key="wifi">wifi</FontIcon>}
        secondaryAction={
          <Switch
            id="wifiToggle"
            name="services"
            label="Wi-Fi"
            labelBefore
            defaultChecked
          />
        }
      />
      <ListItemControl
        leftIcon={<FontIcon key="bluetooth">bluetooth</FontIcon>}
        secondaryAction={
          <Switch
            id="bluetoothToggle"
            name="services"
            label="Bluetooth"
            labelBefore
          />
        }
      />
      <ListItem
        primaryText="Data Usage"
        leftIcon={<FontIcon key="data">data_usage</FontIcon>}
      />
    </List>
  </div>
);

export default SimpleControlsExamples;

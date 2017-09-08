import React, { PureComponent } from 'react';
import Button from 'react-md/lib/Buttons/Button';
import FontIcon from 'react-md/lib/FontIcons';
import SVGIcon from 'react-md/lib/SVGIcons';
import Dialog from 'react-md/lib/Dialogs';
import Slider from 'react-md/lib/Sliders';

import alarm from 'icons/alarm.svg';

export default class WithIcons extends PureComponent {
  state = { visible: false };

  show = () => {
    this.setState({ visible: true });
  };

  hide = () => {
    this.setState({ visible: false });
  };

  render() {
    const { visible } = this.state;

    return (
      <div>
        <Button raised secondary onClick={this.show}>
          Change volume
        </Button>
        <Dialog
          id="volume-changer"
          visible={visible}
          onHide={this.hide}
          title="Volumes"
        >
          <Slider
            id="volume-changer-media"
            label="Media volume"
            leftIcon={<FontIcon>volume_up</FontIcon>}
            defaultValue={5}
            max={12}
          />
          <Slider
            id="volume-changer-alarm"
            label="Alarm volume"
            leftIcon={<SVGIcon use={alarm.url} />}
            defaultValue={8}
            max={12}
          />
          <Slider
            id="volume-changer-ring"
            label="Ring volume"
            leftIcon={<FontIcon>vibration</FontIcon>}
            defaultValue={10}
            max={12}
          />
        </Dialog>
      </div>
    );
  }
}

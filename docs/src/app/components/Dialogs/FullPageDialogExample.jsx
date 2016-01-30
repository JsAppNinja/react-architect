import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { IconButton, RaisedButton, FlatButton } from 'react-md/lib/Buttons';
import { ActionArea } from 'react-md/lib/Toolbars';
import Dialog from 'react-md/lib/Dialogs';
import Divider from 'react-md/lib/Dividers';
import TextField from 'react-md/lib/TextFields';

export default class ModalDialogExample extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { isOpen: false };
  }

  open = ({ pageX, pageY, changedTouches }) => {
    this.setState({
      isOpen: true,
      // Giving pageX and a pageY to the Dialog will open the dialog from that position
      pageX: changedTouches ? changedTouches[0].pageX : pageX,
      pageY: changedTouches ? changedTouches[0].pageY : pageY,
    });
  };

  close = () => this.setState({ isOpen: false });

  render() {
    return (
      <div>
        <RaisedButton label="Open full page dialog" onClick={this.open} />
        <Dialog
          close={this.close}
          isOpen={this.state.isOpen}
          title="New Event"
          actionLeft={<IconButton onClick={this.close}>close</IconButton>}
          actionRight={<ActionArea><FlatButton label="save" onClick={this.close} /></ActionArea>}
          pageX={this.state.pageX}
          pageY={this.state.pageY}
          >
          <TextField
            label="Email"
            defaultValue="heyfromjonathan@gmail.com"
            fullWidth
            floatingLabel={false}
          />
          <Divider />
          <TextField
            label="Event name"
            fullWidth
            floatingLabel={false}
          />
          <Divider />
        </Dialog>
      </div>
    );
  }
}

import React, { PureComponent, PropTypes } from 'react';
import { connect } from 'react-redux';
import Button from 'react-md/lib/Buttons/Button';
import Snackbar from 'react-md/lib/Snackbars';

const MOBILE_MULTILINE = 'This item has the label "travel". You can add a new label.';
const DESKTOP_MULTILINE = `There aren't really any examples of a multiline snackbar on non-mobile devices.
I am not sure if it is really supported since these are supposed to be short messages.`;

@connect(({ ui: { drawer: { mobile, tablet } } }) => ({ mobile, tablet }))
export default class SimpleExamples extends PureComponent {
  static propTypes = {
    mobile: PropTypes.bool.isRequired,
    tablet: PropTypes.bool.isRequired,
  };

  state = { toasts: [], autohide: true };

  componentWillUpdate(nextProps, nextState) {
    const { toasts } = nextState;
    const [toast] = toasts;
    if (this.state.toasts === toasts || !toast) {
      return;
    }

    const autohide = toast.action !== 'Retry';
    this.setState({ autohide });
  }

  _addToast = (text, action) => {
    const toasts = this.state.toasts.slice();
    toasts.push({ text, action });

    this.setState({ toasts });
  };

  _removeToast = () => {
    const [, ...toasts] = this.state.toasts;
    this.setState({ toasts });
  };

  _toastHello = () => {
    this._addToast('Hello, World!');
  };

  _toastRetry = () => {
    this._addToast('Something Happened.', 'Retry');
  };

  _toastMultiple = () => {
    const toasts = this.state.toasts.slice();
    toasts.push({ text: 'Sent', action: 'Undo' });

    toasts.push({
      text: 'Connection timed out. Showing limited messages.',
      action: {
        label: 'Retry',
        onClick: () => {
          alert('You tried again for some reason..'); // eslint-disable-line no-alert
        },
      },
    });

    this.setState({ toasts });
  };

  _toastMultiline = () => {
    this._addToast(this.props.mobile ? MOBILE_MULTILINE : DESKTOP_MULTILINE);
  };

  render() {
    return (
      <div className="btn-group">
        <Button raised onClick={this._toastHello}>
          Toast Hello, World
        </Button>
        <Button raised onClick={this._toastMultiline}>
          Toast Multiple Lines
        </Button>
        <Button raised onClick={this._toastRetry}>
          Require Action to Dismiss
        </Button>
        <Button raised onClick={this._toastMultiple}>
          Chain Toasts
        </Button>
        <Snackbar {...this.state} onDismiss={this._removeToast} />
      </div>
    );
  }
}

import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import code from './code.txt';

import DocPage, { NEWLINE, PRE_START, PRE_END } from '../../DocPage';
import { Snackbar, RaisedButton } from '../../../../src/js';

let ghostbustersTheme;
function resetGhostbusters() {
  ghostbustersTheme.stopVideo();
  ghostbustersTheme.seekTo(0);
}

const connectionToast = {
  text: 'Connection timed out. Showing limited messages.',
  action: {
    label: 'Retry',
    onClick: () => alert('You tried again for some reason..'),
  },
};
const sentToast = {
  text: 'Sent',
  action: 'Undo',
};
const ghostToast = {
  text: 'A voracious green ghost appears that passes through walls and leaves slime behind. What are you going to do?',
  action: {
    label: 'Call Ghostbusters',
    onClick: () => {
      setTimeout(resetGhostbusters, 4000);
    },
  },
  onAppear: () => {
    if(!ghostbustersTheme) {
      ghostbustersTheme = new YT.Player('ghostbusters', { // eslint-disable-line no-undef
        height: '0',
        width: '0',
        videoId: 'm9We2XsVZfc',
        events: {
          'onReady': (e) => { e.target.playVideo(); },
        },
      });
    } else {
      ghostbustersTheme.playVideo();
    }
  },
};

const TOASTS = [connectionToast, sentToast, ghostToast];

export default class Snackbars extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { toasts: [] };
  }

  componentDidMount() {
    let youtubeAPI = document.createElement('script');
    youtubeAPI.src = 'https://www.youtube.com/iframe_api';

    const firstScript = document.getElementsByTagName('script')[0];
    firstScript.parentNode.insertBefore(youtubeAPI, firstScript);
  }

  addToast = (text, action) => {
    this.setState({
      toasts: this.state.toasts.concat([{
        key: new Date().getTime() + '',
        text,
        action,
      }]),
    });
  }

  addToasts = () => {
    this.setState({
      toasts: this.state.toasts.concat(TOASTS.map(({ action, ...props }, i) => {
        if(typeof action !== 'string') {
          const { onClick } = action;
          action.onClick = () => {
            onClick && onClick();
            this.removeToast();
          };
        }

        return {
          key: new Date().getTime() + `-${i}`,
          action,
          ...props,
        };
      })),
    });
  }

  removeToast = () => {
    let toasts = this.state.toasts.slice();
    toasts.shift();
    this.setState({ toasts });
  }

  render() {
    const { toasts } = this.state;
    const [toast] = toasts;
    const isToasting = !!toast;
    return (
      <div>
        <DocPage
          imports={['Snackbar']}
          code={code}
          examples={[
            <RaisedButton
              primary
              onClick={this.addToast.bind(this, 'Hello, World!')}
              label="Toast hello world!"
            />,
            <RaisedButton
              primary
              onClick={this.addToast.bind(this, 'This is some long text to show the multiline feature of a toast. This requires an additional prop.')}
              label="Toast multiple lines"
            />,
            <RaisedButton primary onClick={this.addToasts} label="Chained toasts" />,
          ]}
          components={[{
            component: Snackbar,
            details: [{
              name: 'toasts',
              propType: 'arrayOf({ text, key, action, onAppear })',
              desc: `This is a queue of toasts to display to the user. After hte user interacts
              with the toast or the ${PRE_START}autohideTimeout${PRE_END} time has happened, the
              toast will be dismissed and the next one will be displayed.${NEWLINE}
              The text is required for a toast. The action is either a string or an object with an
              ${PRE_START}onClick${PRE_END} and a ${PRE_START}label${PRE_END}. The action will
              automatically call ${PRE_START}dismiss()${PRE_END}. Finally, there is an optional
              ${PRE_START}onAppear${PRE_END} function that is called when the toast is displayed.`,
            }, {
              name: 'autohide',
              propType: 'ba',
              desc: 'Boolean if the toast should dismiss automatically after a given time.',
            }, {
              name: 'autohideTimeout',
              propType: 'nu',
              desc: 'The time to wait before auto-dismissing the current toast.',
            }, {
              name: 'dismiss',
              propType: 'f',
              desc: 'A function to dimiss the first item from the queue',
            }, {
              name: 'multiline',
              propType: 'ba',
              desc: 'Boolean if the toast is more than one line.',
            }],
          }]}
        />
        <div id="ghostbusters" />
        <Snackbar
          toasts={toasts}
          dismiss={this.removeToast}
          multiline={isToasting && toast.text.length > 60}
          autohide={isToasting && TOASTS.filter(t => toast.text === t.text).length === 0}
        />
      </div>
    );
  }
}

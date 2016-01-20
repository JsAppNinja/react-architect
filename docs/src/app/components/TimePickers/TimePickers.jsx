import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import TimePicker from 'react-md/TimePickers';

import DocPage from 'react-md-documentation';
import TimePickerExamples from './TimePickerExamples';
import TimePickerExamplesRaw from '!!raw!./TimePickerExamples';
//import './_time-picker.scss';

export default class TimePickers extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        components={[{
          component: TimePicker,
          details: [],
        }]}
        examples={[{
          markdown: TimePickerExamplesRaw,
          children: <TimePickerExamples />,
        }]}
        >
        Something
      </DocPage>
    );
  }
}

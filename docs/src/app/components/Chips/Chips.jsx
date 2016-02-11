import React, { Component } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Chip from 'react-md/lib/Chips';

import DocPage from 'react-md-documentation';
import ChipExamples from './ChipExamples';
import ChipExamplesRaw from '!!raw!./ChipExamples';
//import './_chip.scss';

export default class Chips extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <DocPage
        {...this.props}
        components={[{
          component: Chip,
          details: [],
        }]}
        examples={[{
          markdown: ChipExamplesRaw,
          children: <ChipExamples />,
        }]}
        >
        Chips represent complex entities in small blocks, such as a contact.
      </DocPage>
    );
  }
}

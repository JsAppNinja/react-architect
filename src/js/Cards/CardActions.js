import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

import CardExpander from './CardExpander';
import { isPropEnabled } from '../utils';

export default class CardActions extends Component {
  constructor(props, context) {
    super(props, context);
  }

  static contextTypes = {
    isExpanded: PropTypes.bool.isRequired,
    onExpandClick: PropTypes.func.isRequired,
    iconClassName: PropTypes.string.isRequired,
    iconChildren: PropTypes.string,
  };

  static propTypes = {
    isExpander: PropTypes.bool,
    className: PropTypes.string,
    children: PropTypes.node,
    centered: PropTypes.bool,
  };

  render() {
    const { className, children, isExpander, ...props } = this.props;
    return (
      <section {...props} className={classnames('md-card-actions', className, { 'centered': isPropEnabled(props, 'centered') })}>
        <div className="action-area">
          {children}
        </div>
        {isExpander && <CardExpander />}
      </section>
    );
  }
}

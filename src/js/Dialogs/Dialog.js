import React, { Component, PropTypes } from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import classnames from 'classnames';
import { FlatButton } from '../Buttons';
import Toolbar from '../Toolbars';
import Divider from '../Dividers';

const DIALOG_PADDING = 8;

export default class Dialog extends Component {
  constructor(props) {
    super(props);

    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = { stacked: false };
  }

  static propTypes = {
    isSimple: PropTypes.bool.isRequired,
    isFullPage: PropTypes.bool.isRequired,
    transformOrigin: PropTypes.string,
    title: PropTypes.string,
    actions: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.node),
      PropTypes.arrayOf(PropTypes.object),
      PropTypes.node,
      PropTypes.object,
    ]),
    actionLeft: PropTypes.node,
    actionRight: PropTypes.node,
    className: PropTypes.string,
    contentClassName: PropTypes.string,
    children: PropTypes.node,
    style: PropTypes.object,
    onlyChildren: PropTypes.bool,
  };

  componentDidMount() {
    if(this.props.onlyChildren) { return; }
    let state = {};
    const { dialog, content } = this.refs;

    if(content.scrollHeight > content.clientHeight) {
      state.divided = true;
    }

    if(this.props.actions) {
      const maxButtonWidth = (dialog.offsetWidth - DIALOG_PADDING * 3) / 2;
      const actions = dialog.querySelectorAll('.md-btn');
      for(let action of actions) {
        if(action.offsetWidth > maxButtonWidth) {
          state.stacked = true;
          break;
        }
      }
    }

    this.setState(state); //eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const {
      title,
      children,
      className,
      contentClassName,
      actions,
      actionLeft,
      actionRight,
      style,
      transformOrigin,
      isSimple,
      isFullPage,
      onlyChildren,
      ...props,
    } = this.props;
    const { stacked, divided } = this.state;

    let header, footer;
    if(!onlyChildren && !isFullPage && title) {
      header = <h1 className="md-title">{title}</h1>;
    } else if(isFullPage) {
      header = (
        <Toolbar
          primary
          actionLeft={actionLeft}
          title={title}
          actionsRight={actionRight}
        />
      );
    }

    if(actions) {
      footer = (
        <footer className={classnames('md-dialog-footer', { stacked })}>
          {actions.map((action, key) => {
            if(!React.isValidElement(action)) {
              return <FlatButton key={key} {...action} />;
            } else {
              return action;
            }
          })}
        </footer>
      );
    }

    return (
      <div
        ref="dialog"
        className={classnames('md-dialog', className, {
          'full-page': isFullPage,
          'dialog-centered': !isFullPage,
        })}
        style={Object.assign({}, style, { transformOrigin })}
        {...props}
        >
        {header}
        {header && divided && <Divider />}
        {onlyChildren && children}
        {!onlyChildren &&
          <section
            ref="content"
            className={classnames('md-dialog-content', contentClassName, {
              'simple': isSimple,
            })}
            >
            {children}
          </section>
        }
        {footer && divided && <Divider />}
        {footer}
      </div>
    );
  }
}

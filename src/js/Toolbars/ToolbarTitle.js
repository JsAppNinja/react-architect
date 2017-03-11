import React, { PureComponent, PropTypes, Children, isValidElement, cloneElement } from 'react';
import cn from 'classnames';

export default class ToolbarTitle extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    prominent: PropTypes.bool,
    offset: PropTypes.bool,
    title: PropTypes.node,
  };

  render() {
    const { title, className, prominent, offset, ...props } = this.props;
    if (!title) {
      return null;
    }

    const fullClassName = cn('md-title md-title--toolbar', {
      'md-title--toolbar-prominent': prominent,
      'md-title--toolbar-offset': offset,
    }, className);

    if (isValidElement(title)) {
      const titleEl = Children.only(title);
      return cloneElement(title, {
        ...props,
        className: cn(fullClassName, titleEl.props.className),
      });
    }

    return (
      <h2
        {...props}
        className={fullClassName}
      >
        {title}
      </h2>
    );
  }
}

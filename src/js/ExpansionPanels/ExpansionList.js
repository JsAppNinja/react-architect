import { PureComponent, PropTypes, createElement, cloneElement, Children } from 'react';
import { findDOMNode } from 'react-dom';
import cn from 'classnames';

import { TAB } from '../constants/keyCodes';
import handleWindowClickListeners from '../utils/EventUtils/handleWindowClickListeners';

/**
 * The `ExpansionList` component is a wrapper for the `ExpansionPanel` that helps
 * determine which `ExpansionPanel` currently has tab focus and adjusts the column
 * sizes in the header of the `ExpansionPanel`.
 *
 * The `ExpansionList` and `ExpansionPanel` components should have probably been
 * implemented as a `table` insead of a `ul || ol` since it is more column based,
 * but it would complicate the API to have dynamic row generation for the expanded
 * panels. The expanded panels _might_ not follow the same column widths as their labels
 * so a singular row with a div for expanded content might not work correctly.
 */
export default class ExpansionList extends PureComponent {
  static propTypes = {
    /**
     * An optional style object to apply to the list.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the list.
     */
    className: PropTypes.string,

    /**
     * The children should be a list or singular `ExpansionPanel` component
     * to render with some additional props injected.
     */
    children: PropTypes.node,

    /**
     * The component to render the list as.
     */
    component: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.func,
    ]).isRequired,

    /**
     * Boolean if all the expansion panels in the list should animate when their content's visibility
     * changes. This is just a quicker way to disable all animations instead of having to toggle it off
     * on each panel.
     *
     * > The default value is really `true` since it gets passed down to the `Collapse` component.
     */
    animateContent: PropTypes.bool,
  };

  static defaultProps = {
    component: 'ul',
  };

  static childContextTypes = {
    animateContent: PropTypes.bool,
  };

  state = { columnWidths: [], focusedIndex: -1 };

  getChildContext() {
    const { animateContent } = this.props;
    return { animateContent };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.children !== nextProps.children) {
      this._calcColumnWidths();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { focusedIndex } = this.state;
    if (prevState.focusedIndex === focusedIndex || (prevState.focusedIndex > -1 && focusedIndex > -1)) {
      return;
    }

    handleWindowClickListeners(this._removeFocus, this.state.focusedIndex !== -1);
  }

  componentWillUnmount() {
    if (this.state.focusedIndex === -1) {
      handleWindowClickListeners(this._removeFocus, false);
    }

    window.removeEventListener('keyup', this._determineTabFocus);
  }

  _setContainer = (container) => {
    if (container !== null) {
      this._container = findDOMNode(container);
      window.addEventListener('keyup', this._determineTabFocus);

      this._calcColumnWidths();
    }
  };

  _determineTabFocus = (e) => {
    if ((e.which || e.keyCode) === TAB) {
      const panels = Array.prototype.slice.call(findDOMNode(this).querySelectorAll('.md-panel-header'));
      this.setState({ focusedIndex: panels.indexOf(e.target) });
    }
  };

  _removeFocus = () => {
    this.setState({ focusedIndex: -1 });
  };

  /**
   * Since this should really be rendered as a table, need to calculate the max width for each _column_
   * on the panel's header and apply that as a min width for the other panels.
   */
  _calcColumnWidths = () => {
    if (!this._container) {
      return;
    }

    const columnWidths = Array.prototype.slice.call(this._container.querySelectorAll('.md-panel-header'))
      .reduce((maxes, row) => {
        const columns = row.querySelectorAll('.md-panel-column');
        for (let i = 0; i < columns.length; i++) {
          // Only need to include the offsetWidth of the column because the child will really
          // determine the width of the column. Since it has already been defined at this point,
          // no additional work needs to be done.
          maxes[i] = Math.max(
            columns[i].offsetWidth,
            maxes[i] || 0
          );
        }

        return maxes;
      }, [0]);

    this.setState({ columnWidths });
  };

  render() {
    const { columnWidths, focusedIndex } = this.state;
    const {
      children,
      className,
      component,
      animateContent, // eslint-disable-line no-unused-vars
      ...props
    } = this.props;

    return createElement(component, {
      ...props,
      ref: this._setContainer,
      className: cn('md-expansion-panel-list', className),
    }, Children.map(children, (child, i) => (
      cloneElement(child, {
        key: child.key || i,
        columnWidths,
        focused: focusedIndex === i,
      })
    )));
  }
}

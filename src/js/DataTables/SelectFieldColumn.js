import React, { PureComponent, PropTypes } from 'react';
import cn from 'classnames';
import { findDOMNode } from 'react-dom';
import deprecated from 'react-prop-types/lib/deprecated';

import getField from '../utils/getField';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import SelectField from '../SelectFields/SelectField';
import findTable from './findTable';
import TableColumn from './TableColumn';

/**
 * The `SelectFieldColumn` component is just a simple wrapper between a `SelectField` and
 * the `TableColumn` components.
 *
 * All props that are on the `SelectField` are also available here (except the naming of style or className).
 * See the [SelectField](/components/select-fields?tab=1#select-field-proptypes) for remaining prop descriptions.
 */
export default class SelectFieldColumn extends PureComponent {
  static VerticalAnchors = SelectField.VerticalAnchors;
  static HorizontalAnchors = SelectField.HorizontalAnchors;
  static Positions = SelectField.Positions;

  static propTypes = {
    /**
     * An optional id to use for the select field in the column. If this is omitted, it's value will be
     * `${rowId}-${cellIndex}-select`
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * This is the optional style to apply to the `TableColumn`.
     */
    style: PropTypes.object,

    /**
     * This is the optional className to apply to the `TableColumn`.
     */
    className: PropTypes.string,

    /**
     * The is the optional style to apply to the select field's menu container.
     *
     * @see {@link SelectFields/SelectField#style}
     */
    menuStyle: PropTypes.object,

    /**
     * The is the optional class name to apply to the select field's menu container.
     *
     * @see {@link SelectFields/SelectField#className}
     */
    menuClassName: PropTypes.string,

    /**
     * This is how the select field should be fixed within the table. When this is omitted,
     * it will automatically use the responsive table as the fixture so that the select field
     * will close/adjust itself to the scrolling of the table.
     *
     * @see {@link Helpers/Layovers#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * Boolean if the select field should span the entire width of the column.
     */
    fullWidth: PropTypes.bool,

    /**
     * The position for the select field.
     *
     * @see {@link SelectFields/SelectField#position}
     */
    position: positionShape,

    /**
     * This is injected by the `TableRow` component.
     * @access private
     */
    header: PropTypes.bool,

    /**
     * This is injected by the `TableRow` component and used to help generate the unique id for the text
     * field.
     *
     * @access private
     */
    cellIndex: PropTypes.number,

    wrapperStyle: deprecated(PropTypes.object, 'There is no longer a wrapper'),
    wrapperClassName: deprecated(PropTypes.string, 'There is no longer a wrapper'),
  };

  static defaultProps = {
    position: SelectFieldColumn.Positions.BELOW,
    fullWidth: true,
  };

  static contextTypes = {
    rowId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  }

  state = { table: undefined, cellIndex: undefined };

  componentDidMount() {
    const { cellIndex } = this.props;
    const column = findDOMNode(this);
    const table = findTable(column);

    const state = { table };

    // If a developer creates their own component to wrap the EditDialogColumn, the cellIndex prop
    // might not be defined if they don't pass ...props
    if (!cellIndex && cellIndex !== 0) {
      const columns = [].slice.call(column.parentNode.querySelectorAll('th,td'));
      state.cellIndex = columns.indexOf(column);
    }

    this.setState(state); // eslint-disable-line react/no-did-mount-set-state
  }

  render() {
    const { rowId } = this.context;
    const {
      style,
      className,
      menuStyle,
      menuClassName,
      header,
      fixedTo,
      /* eslint-disable no-unused-vars */
      id: propId,
      cellIndex: propCellIndex,
      wrapperStyle,
      wrapperClassName,
      /* eslint-enable no-unused-vars */
      ...props
    } = this.props;

    const cellIndex = getField(this.props, this.state, 'cellIndex');

    let { id } = this.props;
    if (!id) {
      id = `${rowId}-${cellIndex}-select-field`;
    }

    return (
      <TableColumn
        header={header}
        style={style}
        className={cn('md-select-field-column', className)}
        adjusted={false}
      >
        <SelectField
          {...props}
          id={id}
          fixedTo={fixedTo || this.state.table}
          style={menuStyle}
          className={menuClassName}
        />
      </TableColumn>
    );
  }
}

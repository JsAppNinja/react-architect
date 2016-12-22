import * as React from 'react';
import { Props } from '../index';
import { InjectedTooltipProps } from '../Tooltips';
import { TextFieldTypes } from '../TextFields';
import { Positions as SelectFieldPositions } from '../SelectFields';

interface DataTableProps extends Props {
  baseId?: number | string;
  defaultSelectedRows?: Array<boolean>;
  responsive?: boolean;
  plain?: boolean;
  uncheckedIconClassName?: string;
  uncheckedIconChildren?: React.ReactNode;
  checkedIconClassName?: string;
  checkedIconChildren?: React.ReactNode;
  onRowToggle?: (rowId: number, checked: boolean, event: Event) => void;
  children: React.ReactNode;
}

interface TableHeaderProps extends Props {
  children: React.ReactElement<any>;
}

interface TableBodyProps extends Props {
  children: React.ReactElement<any> | Array<React.ReactElement<any>>;
}

interface TableRowProps extends Props {
  children: Array<React.ReactElement<any>>;
  onCheckboxClick?: (rowIndex: number, event: Event) => void;
  autoAdjust?: boolean;
  selected?: boolean;
  index?: number;
}

interface TableColumnProps extends InjectedTooltipProps {
  sorted?: boolean;
  sortIconChildren?: React.ReactNode;
  sortIconClassName?: string;
  numeric?: boolean;
  adjusted?: boolean;
  selectColumnHeader?: boolean;
  header?: boolean;
  children?: React.ReactNode;
}

interface EditDialogColumnProps extends Props {
  id?: number | string;
  dialogStyle?: React.CSSProperties;
  dialogClassName?: string;
  textFieldStyle?: React.CSSProperties;
  textFieldClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  transitionDuration?: number;
  disabled?: boolean;
  maxLength?: number;
  value?: number | string;
  defaultValue?: number | string;
  onChange?: (value: number | string, event: Event) => void;
  large?: boolean;
  title?: string;
  onOkClick?: (value: number | string, event: Event) => void;
  onCancelClick?: (value: number | string, event: Event) => void;
  okLabel?: string;
  cancelLabel?: string;
  onOutsideClick?: (event: Event) => void;
  okOnOutsideClick?: boolean;
  label?: React.ReactNode;
  placeholder?: string;
  inline?: boolean;
  inlineIconChildren?: React.ReactNode;
  inlineIconClassName?: string;
  noIcon?: boolean;
  header?: boolean;
  type?: TextFieldTypes;
  enforceMinWidth?: boolean;
  scrollThreshold?: number;
}

interface SelectFieldColumnProps extends Props {
  id?: number | string;
  wrapperStyle?: React.CSSProperties;
  wrapperClassName?: string;
  menuStyle?: React.CSSProperties;
  menuClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  header?: boolean;
  onMenuToggle?: (open: boolean, event: Event) => void;
  position?: SelectFieldPositions;
  defaultOpen?: boolean;
  scrollThreshold?: number;
}

interface TablePaginationProps extends Props {
  onPagination: (startIndex: number, rowsPerPage: number, currentPage: number) => void;
  rowsPerPage?: number;
  page?: number;
  defaultPage?: number;
  defaultRowsPerPage?: number;
  rowsPerPageLabel?: React.ReactNode;
  rowsPerPageItems?: Array<number>;
  rows: number;
  incrementIconChildren?: React.ReactNode;
  incrementIconClassName?: string;
  decrementIconChildren?: React.ReactNode;
  decrementIconClassName?: string;
}

export default class DataTable extends React.Component<DataTableProps, {}> { }
export { DataTable };

export class TableHeader extends React.Component<TableHeaderProps, {}> { }
export class TableBody extends React.Component<TableBodyProps, {}> { }
export class TableRow extends React.Component<TableRowProps, {}> { }
export class TableColumn extends React.Component<TableColumnProps, {}> { }
export class EditDialogColumn extends React.Component<EditDialogColumnProps, {}> { }
export class SelectFieldColumn extends React.Component<SelectFieldColumnProps, {}> { }
export class TablePagination extends React.Component<TablePaginationProps, {}> { }

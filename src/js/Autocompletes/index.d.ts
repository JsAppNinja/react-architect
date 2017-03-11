import * as React from 'react';
import { Props, IdPropType } from '../index';
import { SharedLayoverProps, LayoverPositions, LayoverPositionsEnum } from '../Helpers/index'

type OnOffType = 'on' | 'off';

type DataType = Array<React.ReactElement<any> | string | number | { [dataLabel: string]: string | number }>;

interface AutocompleteProps extends SharedLayoverProps {
  menuId?: IdPropType;
  listId?: IdPropType;
  textFieldStyle?: React.CSSProperties;
  textFieldClassName?: string;
  inputStyle?: React.CSSProperties;
  inputClassName?: string;
  listStyle?: React.CSSProperties;
  listClassName?: string;
  disabled?: boolean;
  label?: string;
  value?: string | number;
  defaultValue?: string | number;
  dataLabel?: string;
  dataValue?: string
  deleteKeys?: string | Array<string>;
  data: DataType;
  total?: number;
  offset?: number;
  filter?: (data: DataType, filterText: string | number, dataLabel?: string) => Array<string>;
  fullWidth?: boolean;
  inline?: boolean;
  findInlineSuggestion?: (data: DataType, value: string | number, dataLabel?: string) => string | number;
  autocompleteWithLabel?: boolean;
  onAutocomplete?: (suggestion: string | number, suggestionIndex: number, matches: DataType) => void;
  onChange?: (value: string, event: React.FormEvent<HTMLFormElement>) => void;
  clearOnAutocomplete?: boolean;
  onMenuOpen?: Function;
  onMenuClose?: Function;
  autoComplete?: OnOffType;
  position?: LayoverPositions | LayoverPositionsEnum;
  listInline?: boolean;
  listZDepth?: number;
  listHeightRestricted?: boolean;
}

export default class Autocomplete extends React.Component<AutocompleteProps, {}> {
  static caseInsensitiveFilter(data: DataType, filterText: string | number, dataLabel?: string): Array<string>;
  static fuzzyFilter(data: DataType, filterText: string | number, dataLabel?: string): Array<string>;
  static findIgnoreCase(data: DataType, filterText: string, dataLabel?: string): string;
}

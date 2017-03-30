import * as React from 'react';
import { Props } from '../index';

type Types = 'checkbox' | 'radio' | 'switch';

interface CommonProps extends Props {
  id: number | string;
  name: number | string;
  labelBefore?: boolean;
  disabled?: boolean;
  value?: number | string;
  checked?: boolean;
  defaultChecked?: boolean;
  inline?: boolean;
}

interface SelectionControlProps extends CommonProps {
  checkedCheckboxIconChildren?: React.ReactNode;
  checkedCheckboxIconClassName?: string;
  uncheckedCheckboxIconChildren?: React.ReactNode;
  uncheckedCheckboxIconClassName?: string;
  checkedRadioIconChildren?: React.ReactNode;
  checkedRadioIconClassName?: string;
  uncheckedRadioIconChildren?: React.ReactNode;
  uncheckedRadioIconClassName?: string;
  onChange?: (result: boolean | number | string, event: Event) => void;
  type: Types;
  'aria-label'?: string;
}

interface SelectionControlGroupProps extends Props {
  controlStyle?: React.CSSProperties;
  controlClassName?: string;
  id?: number | string;
  type: 'checkbox' | 'radio';
  component?: Function | string;
  label?: React.ReactNode;
  labelClassName?: string;
  labelCompoennt?: Function | string;
  onChange?: (value: string, event: Event) => void;
  name?: string | number;
  defaultValue?: number | string;
  value?: number | string;
  controls: Array<{ key?: number | string, label: React.ReactNode, value: number | string }>;
  disabled?: boolean;
}

interface CheckboxProps extends CommonProps {
  onChange?: (checked: boolean, event: Event) => void;
  checkedIconChildren?: React.ReactNode;
  checkedIconClassName?: string;
  uncheckedIconChildren?: React.ReactNode;
  uncheckedIconClassName?: string;
}

interface RadioProps extends CommonProps {
  onChange?: (value: number | string, event: Event) => void;
  checkedIconChildren?: React.ReactNode;
  checkedIconClassName?: string;
  uncheckedIconChildren?: React.ReactNode;
  uncheckedIconClassName?: string;
}

interface SwitchProps extends CommonProps {
  onChange?: (checked: boolean, event: Event) => void;
}

export default class SelectionControl extends React.Component<SelectionControlProps, {}> { }
export { SelectionControl };
export class SelectionControlGroup extends React.Component<SelectionControlGroupProps, {}> { }
export class Checkbox extends React.Component<CheckboxProps, {}> { }
export class Radio extends React.Component<RadioProps, {}> { }
export class Switch extends React.Component<SwitchProps, {}> { }

import * as React from 'react';
import { Props } from '../index';

interface DividerProps extends Props {
  vertical?: boolean;
  inset?: boolean;
  children?: React.ReactNode;
}

export default class Divider extends React.Component<DividerProps, {}> { }

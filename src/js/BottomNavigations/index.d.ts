import * as React from 'react';
import { Props } from '../index';

interface BottomNavigationProps extends Props {
  links: Array<{
    label: React.ReactNode,
    iconChildren?: React.ReactNode,
    iconClassName?: string,
    component?: Function | string
  }>;
  colored?: boolean;
  dynamic?: boolean;
  dynamicThreshold?: number;
  onNavChange?: (activeIndex: number, event: React.MouseEvent) => void;
  activeIndex?: number;
  defaultActiveIndex?: number;
  defaultVisible?: boolean;
  component?: Function | string;
  renderNode?: Object;
  transitionDuration?: number;
  onVisiblityChange?: (visible: boolean) => void;
}

export default class BottomNavigation extends React.Component<BottomNavigationProps, {}> { }

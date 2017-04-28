import * as React from 'react';
import { Props } from '../index';

export type DrawerTypes = {
  // Permanent drawers
  FULL_HEIGHT: 'FULL_HEIGHT',
  CLIPPED: 'CLIPPED',
  FLOATING: 'FLOATING',

  // Persistent drawers
  PERSISTENT: 'PERSISTENT',
  PERSISTENT_MINI: 'PERSISTENT_MINI',

  // Temporary
  TEMPORARY: 'TEMPORARY',
  TEMPORARY_MINI: 'TEMPORARY_MINI',
}

export type DrawerTypesType = 'full-height' | 'clipped' | 'floating' | 'persistent' | 'persistent-mini' | 'temporary' | 'temporary-mini';

export type MediaTypes = 'mobile' | 'tablet' | 'desktop';
export type DrawerPositions = 'left' | 'right';

export interface DrawerProps extends Props {
  navStyle?: React.CSSProperties;
  navClassName?: string;
  component?: Function | string;
  navItems?: Array<React.ReactElement<any> | { divider?: boolean, subheader?: boolean, primaryText?: string }>;
  autoclose?: boolean;
  header?: React.ReactNode;
  mobileType?: 'temporary' | 'temporary-mini';
  mobileMinWidth?: number;
  tabletType?: DrawerTypesType;
  tabletMinWidth?: number;
  desktopType?: DrawerTypesType;
  desktopMinWidth?: number;
  type?: DrawerTypesType;
  onMediaTypeChange?: (type: DrawerTypesType, media: { mobile: boolean, tablet: boolean, desktop: boolean }) => void;
  onVisibilityChange?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
  defaultMedia: MediaTypes;
  overlay?: boolean;
  portal?: boolean;
  renderNode?: Object;
  lastChild?: boolean;
  defaultVisible?: boolean;
  visible?: boolean;
  position?: DrawerPositions;
  inline?: boolean;
  transitionDuration?: number;
  clickableDesktopOverlay?: boolean;
  children?: React.ReactNode;

  /**
   * @deprecated
   */
  onVisibilityToggle?: (visible: boolean, event: React.MouseEvent<HTMLElement>) => void;
}

export default class Drawer extends React.Component<DrawerProps, {}> {
  static DrawerTypes: DrawerTypes;
  static getCurrentMedia(props?: {
    mobileMinWidth: number,
    tabletMinWidth: number,
    desktopMinWidth: number,
    mobileType: 'temporary' | 'temporary-mini',
    tabletType: DrawerTypes | DrawerTypesType,
    desktopType: DrawerTypes | DrawerTypesType,
  }): { type: DrawerTypesType, mobile: boolean, tablet: boolean, desktop: boolean };

  static matchesMedia(min: number, max?: number): boolean;
}

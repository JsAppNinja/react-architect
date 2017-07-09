import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import deprecated from 'react-prop-types/lib/deprecated';

import controlled from '../utils/PropTypes/controlled';
import anchorShape from '../Helpers/anchorShape';
import fixedToShape from '../Helpers/fixedToShape';
import positionShape from '../Helpers/positionShape';
import Button from '../Buttons/Button';
import DropdownMenu from './DropdownMenu';

/**
 * The `MenuButton` is a simple wrapper / combination of the `Button` and the `Menu`
 * components that can be uncontrolled.
 */
export default class MenuButton extends PureComponent {
  static Positions = DropdownMenu.Positions;
  static HorizontalAnchors = DropdownMenu.HorizontalAnchors;
  static VerticalAnchors = DropdownMenu.VerticalAnchors;

  static propTypes = {
    /**
     * An id to use for the menu button. This is required for accessibility.
     *
     * @see {@link Menus/Menu#id}
     */
    id: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the menu's list.
     *
     * @see {@link Menus/Menu#listId}
     */
    listId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional id to provide to the button. If this is omitted, the button will automatically
     * gain an id of `${id}-toggle`.
     */
    buttonId: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),

    /**
     * An optional style to apply to the button.
     */
    style: PropTypes.object,

    /**
     * An optional className to apply to the button.
     */
    className: PropTypes.string,

    /**
     * An optional style to apply to the surrounding menu.
     */
    menuStyle: PropTypes.object,

    /**
     * An optional className to apply to the surrounding menu.
     */
    menuClassName: PropTypes.string,

    /**
     * An optional style to apply to the list.
     */
    listStyle: PropTypes.object,

    /**
     * An optional class name to apply to the list.
     */
    listClassName: PropTypes.string,

    /**
     * Any additional props to provide to the list.
     *
     * @see {@link Menus/Menu#listProps}
     */
    listProps: PropTypes.object,

    /**
     * The z-depth to use for the list.
     *
     * @see {@link Menus/Menu/listZDepth}
     */
    listZDepth: PropTypes.number,

    /**
     * Boolean if the list should be displayed inline.
     *
     * @see {@link Lists/List#inline}
     */
    listInline: PropTypes.bool,

    /**
     * Boolean if the list's height should be restricted.
     *
     * @see {@link Menus/Menu#listHeightRestricted}
     */
    listHeightRestricted: PropTypes.bool,

    /**
     * Bolean if the menu's list is currently visible. If this is defined, it will
     * require the `onVisibilityChange` function to be defined since it will become
     * a controlled component.
     */
    visible: controlled(PropTypes.bool, 'onVisibilityChange', 'defaultVisible'),

    /**
     * Boolean if the menu's list should be visible by default.
     */
    defaultVisible: PropTypes.bool.isRequired,

    /**
     * An optional function to call when the button is clicked.
     */
    onClick: PropTypes.func,

    /**
     * An optional function to call when the visibility changes for the menu. The callback will
     * include the next visibility state and the event that triggered the change.
     *
     * ```js
     * onVisibilityChange(visible, event);
     * ```
     */
    onVisibilityChange: PropTypes.func,

    /**
     * This is a 0 to many relationship of `ListItem` to display in the menu's `List`. If the type
     * of the item is a number or string, it will be passed to the `ListItem` as the `primaryText`.
     * If it is an object, it should be the shape of the `ListItem` props. If it is a node, it will
     * just be rendered in the `List`.
     *
     * @see {@link Lists/ListItem}
     * @see {@link Menus/Menu#children}
     */
    menuItems: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
      PropTypes.object,
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.number,
        PropTypes.object,
        PropTypes.node,
      ])),
    ]),

    /**
     * This should be the children to use in the `Button` that gets created as the menu's toggle.
     *
     * @see {@link Buttons/Button}
     * @see {@link Menus/Menu#toggle}
     */
    children: PropTypes.node,

    /**
     * The anchor position of the menu's list.
     *
     * @see {@link Helpers/Layovers#anchor}
     */
    anchor: anchorShape,

    /**
     * This is the anchor to use when the `position` is set to `Autocomplete.Positions.BELOW`.
     *
     * @see {@link Helpers/Layovers#belowAnchor}
     */
    belowAnchor: anchorShape,

    /**
     * This is how the menu's list is fixed to the toggle.
     *
     * @see {@link Menus/Menu#fixedTo}
     */
    fixedTo: fixedToShape,

    /**
     * This is the animation position for the menu's list.
     *
     * @see {@link Menus/Menu#position}
     */
    position: positionShape,

    /**
     * Boolean if the menu's list should gan the cascading styles.
     *
     * @see {@link Menus/Menu#cascading}
     */
    cascading: PropTypes.bool,

    /**
     * The zDepth to use for the lists that appear in cascading menus.
     *
     * @see {@link Menus/Menu#cascadingZDepth}
     */
    cascadingZDepth: PropTypes.number,

    /**
     * The anchor position for the cascanding lists.
     *
     * @see {@link Menus/Menu#cascadingAnchor}
     */
    cascadingAnchor: anchorShape,

    /**
     * Boolean if the menu should display as a full width container. This will *not* update the button
     * to be full width as well.
     *
     * @see {@link Menus/Menu#fullWidth}
     */
    fullWidth: PropTypes.bool,

    /**
     * Boolean if the menu's container should display as `block` instead of `inline-block`.
     *
     * @see {@link Menus/Menu#block}
     */
    block: PropTypes.bool,

    /**
     * Boolean if the list should appear centered related to the button.
     *
     * @see {@link Menus/Menu#centered}
     */
    centered: PropTypes.bool,

    /**
     * Boolean if the menu's list should be the same width as the button.
     *
     * @see {@link Menus/Menu#sameWidth}
     */
    sameWidth: PropTypes.bool,

    /**
     * @see {@link Menus/Menu#xThreshold}
     */
    xThreshold: PropTypes.number,

    /**
     * @see {@link Menus/Menu#yThreshold}
     */
    yThreshold: PropTypes.number,

    /**
     * Boolean if the menu's list should be closed when an element outside of the menu has been clicked.
     *
     * @see {@link Menus/Menu#closeOnOutsideClick}
     */
    closeOnOutsideClick: PropTypes.bool,

    /**
     * The transition name to use for the menu's list visibility changes.
     *
     * @see {@link Menus/Menu#transitionName}
     */
    transitionName: PropTypes.string,

    /**
     * The transition name to use when the menu's list gains visibility.
     *
     * @see {@link Menus/Menu#transitionEnterTimeout}
     */
    transitionEnterTimeout: PropTypes.number,

    /**
     * The transition timeout to use when the menu's list loses visibility.
     *
     * @see {@link Menus/Menu#transitionLeaveTimeout}
     */
    transitionLeaveTimeout: PropTypes.number,

    /**
     * Boolean if the menu should automatically try to reposition itself to stay within
     * the viewport when the `fixedTo` element scrolls.
     *
     * @see {@link Helpers/Layovers#fixedTo}
     */
    repositionOnScroll: PropTypes.bool,

    buttonChildren: deprecated(
      PropTypes.node,
      'To build a button, put any elements in the `children`. The `ListItem` have been moved to the `menuItems` prop'
    ),
    onMenuToggle: deprecated(PropTypes.bool, 'Use `onVisibilityChange` instead'),
    isOpen: deprecated(PropTypes.bool, 'Use `visible` instead'),
    defaultOpen: deprecated(PropTypes.bool, 'Use `defaultVisible` instead'),
  };

  static defaultProps = {
    defaultVisible: false,
    repositionOnScroll: true,
  };

  render() {
    const {
      id,
      listId,
      buttonId,
      menuStyle,
      menuClassName,
      listStyle,
      listClassName,
      listProps,
      listZDepth,
      listInline,
      listHeightRestricted,
      menuItems,
      buttonChildren,
      children,
      anchor,
      belowAnchor,
      fixedTo,
      position,
      cascading,
      cascadingAnchor,
      cascadingZDepth,
      fullWidth,
      block,
      centered,
      sameWidth,
      repositionOnScroll,
      xThreshold,
      yThreshold,
      closeOnOutsideClick,
      transitionName,
      transitionEnterTimeout,
      transitionLeaveTimeout,
      visible,
      defaultVisible,
      onVisibilityChange,
      isOpen, // deprecated
      defaultOpen, // deprecated
      onMenuToggle, // deprecated
      ...props
    } = this.props;

    let items = children;
    let toggleChildren = buttonChildren;
    if (typeof menuItems !== 'undefined') {
      toggleChildren = children;
      items = menuItems;
    }

    return (
      <DropdownMenu
        id={id}
        listId={listId}
        style={menuStyle}
        className={menuClassName}
        listStyle={listStyle}
        listClassName={listClassName}
        listProps={listProps}
        listInline={listInline}
        listZDepth={listZDepth}
        listHeightRestricted={listHeightRestricted}
        visible={typeof isOpen !== 'undefined' ? isOpen : visible}
        defaultVisible={typeof defaultOpen !== 'undefined' ? defaultOpen : defaultVisible}
        menuItems={items}
        anchor={anchor}
        belowAnchor={belowAnchor}
        fixedTo={fixedTo}
        position={position}
        cascading={cascading}
        cascadingAnchor={cascadingAnchor}
        cascadingZDepth={cascadingZDepth}
        fullWidth={fullWidth}
        block={block}
        centered={centered}
        sameWidth={sameWidth}
        repositionOnScroll={repositionOnScroll}
        xThreshold={xThreshold}
        yThreshold={yThreshold}
        closeOnOutsideClick={closeOnOutsideClick}
        transitionName={transitionName}
        transitionEnterTimeout={transitionEnterTimeout}
        transitionLeaveTimeout={transitionLeaveTimeout}
        onVisibilityChange={onMenuToggle || onVisibilityChange}
      >
        <Button {...props} id={buttonId}>
          {toggleChildren}
        </Button>
      </DropdownMenu>
    );
  }
}

## August 2017
### v1.0.19 Released
- Fixed the `Autocomplete` no longer firing click events on the list items. [#475](https://github.com/mlaursen/react-md/issues/475)
- Updated the UMD build to correctly include the `MenuButton`. [#482](https://github.com/mlaursen/react-md/issues/482)
- Fixed an invalid PropType warning for Date and Time pickers. [#490](https://github.com/mlaursen/react-md/issues/490)
- Added a little bit more support for tabs with dynamic height changes. [#487](https://github.com/mlaursen/react-md/pull/487)
- Added support for semi-bold fonts. [#468](https://github.com/mlaursen/react-md/pull/468)

### v1.0.18 Released
##### Changelog
- Fixed the `Autocomplete` firing the `onAutocomplete` callback twice when using the keyboard to select
an item. [#466](https://github.com/mlaursen/react-md/issues/466)
- Fixed a `PropType` warning when using the `Dialog` and one of the actions already had a key.
[#465](https://github.com/mlaursen/react-md/issues/465)
- Fixed the `SelectField` and `TextField` from not floating the label when a `value` (or `label`) had
a value of `0`. [#461](https://github.com/mlaursen/react-md/issues/461) and [#460](https://github.com/mlaursen/react-md/issues/460)
- Fixed a weird infinite loop in the `FocusContainer` when some of the children are the `AccessibleFakeButton` and the user
pressed `shift+tab`. [#458](https://github.com/mlaursen/react-md/issues/458)
- Updated the multiline `TextField` so that it can be correctly snapshotted. [#457](https://github.com/mlaursen/react-md/issues/457)
- Fixed the `NavigationDrawer` incorrectly hiding a "permanent" drawer type when `defaultVisible={false}`. [#426](https://github.com/mlaursen/react-md/issues/426)
- Fixed some invalid checksum when Server Side Rendering the `NavigationDrawer`. [#420](https://github.com/mlaursen/react-md/issues/420)
> this also removed some unneeded transition class names from the `Drawer` when the drawer was "mini" or "permanent".
- Updated the `Drawer` and `NavigationDrawer` components to proide props to style the overlay that gets
created. [#389](https://github.com/mlaursen/react-md/issues/389)

## July 2017
### v1.0.17 Released
This patch was mostly about fixing components that needed to be resized after a container height/width
update instead of just a window resize event. In additioan, there have been some mobile device performance
and behavior changes. Components that manually added touch events now use passive events when possible and
the user can focus a text field and scroll the page without automatically hiding the keyboard like a native
input element.

##### Changelog
- Fixed the weird page scroll behavior for dialogs when the user closed the dialog by clicking the overlay.
[#367](https://github.com/mlaursen/react-md/issues/367)
- Updated the ListItem so that you can provide props to the surrounding li node. [#439](https://github.com/mlaursen/react-md/issues/439)
- Fixed a weird mobile safari but about using a virtualization library with any form input from react-md.
[#442](https://github.com/mlaursen/react-md/issues/442)
- Added passive event listeners. [#382](https://github.com/mlaursen/react-md/issues/382)
- Updated the Autocomplete to no longer require an automatic TextField re-focus after a suggestion has been selected.
[#428](https://github.com/mlaursen/react-md/issues/428)
- Fixed the TextField placeholder to correctly gain the disabled color. [#447](https://github.com/mlaursen/react-md/issues/447)
- Fixed the focus behavior of TextFields on mobile devices. [#434](https://github.com/mlaursen/react-md/issues/434)
- Fixed the unneeded PropType warning when a "controlled" TextField is disabled. [#432](https://github.com/mlaursen/react-md/issues/432)
- Fixed the PropType warning for Tabs. [#440](https://github.com/mlaursen/react-md/issues/440)
- Fixed the multiline TextField requiring a flex container to display correctly. It will now display correctly if it is in
just a `display: block` or whatever. [#365](https://github.com/mlaursen/react-md/issues/365)
- Fixed the TimePicker changing days when AM/PM was toggled. [#446](https://github.com/mlaursen/react-md/issues/446)
- Fixed the TimePicker to remember the last selected time better. [#438](https://github.com/mlaursen/react-md/issues/438)
- Fixed the TimePicker's ability to calculate time. [#359](https://github.com/mlaursen/react-md/issues/359)
- Fixed multiple components that manually calculate size for container resize events instead of just window resize events.
  - ExpansionPanels and Tabs [#448](https://github.com/mlaursen/react-md/issues/448)
  - Multiline TextFields [#365](https://github.com/mlaursen/react-md/issues/365)
  - TablePagination [#415](https://github.com/mlaursen/react-md/issues/415)


## June 2017
### v1.0.16 Released

##### Changelog
- Updated the slider to no longer call `onChange` or `onDragChange` when dragging and the value
or distance have not been updated. [d588fb4](https://github.com/mlaursen/react-md/commit/d588fb4e000ecc7d00131c6d29b99908bb715532)
- Fixed a small bug with my `handleKeyboardAccessibility` so that spacebar didn't work in autocompletes.
[b13f316](https://github.com/mlaursen/react-md/commit/b13f316d23dd3ba3d25d557a79f5fb32754b2fae)
- Fixed a keyboard accessibility problem with `SelectionControlGroup`. [eb6629d](https://github.com/mlaursen/react-md/commit/eb6629d8fb5117a565b309422d7225a790f5ffd9)
- Fixed an error where rendering the `Autocomplete` in a `ListItem` threw an error. [#412](https://github.com/mlaursen/react-md/issues/412)
- Updated the default `z-index` for the `Snackbar` so that it appears over the mini `Drawer`.
[#410](https://github.com/mlaursen/react-md/issues/410)
- Fixed the `DatePicker` so that it can accept a `value` of `null` and the empty string (`""`).
  - [#384](https://github.com/mlaursen/react-md/issues/384)
  - [#396](https://github.com/mlaursen/react-md/issues/396)
  - [#409](https://github.com/mlaursen/react-md/issues/409)
- Fixed the cell offset calculations. [#401](https://github.com/mlaursen/react-md/issues/401)
- Fixed non-contained menus. [#391](https://github.com/mlaursen/react-md/issues/391)
- Fixed the `onClick` prop for `SelectionControl`. [#390](https://github.com/mlaursen/react-md/issues/390)
- Fixed the `Snackbar` not working as intended when the action has an `onClick` function.
[#385](https://github.com/mlaursen/react-md/issues/385)
- Fixed the slider displaying the wrong value while sliding with touch or mouse. [#379](https://github.com/mlaursen/react-md/issues/379)
- Updated `.npmignore` to stop include the `jest-cache` with the published code. [#403](https://github.com/mlaursen/react-md/issues/403)
- Small typo fix. [#400](https://github.com/mlaursen/react-md/issues/400)

## May 2017
### v1.0.15 Released
General mobile Safari bugfixes and other small changes.

##### Changelog
- Fixed the "stiffness" of scrolling in mobile Safari. [#383](https://github.com/mlaursen/react-md/issues/383)
- Fixed the weird bug of requiring two taps in mobile Safari to open a `SelectField`. [#381](https://github.com/mlaursen/react-md/issues/381)
- Updated the `Slider` to automatically set the `defaultValue` to the provided `min` value and fixed the discrete slider's
visibility issue. [#379](https://github.com/mlaursen/react-md/issues/379)
- Correctly added the `name` attribute to the `FileInput` and `FileUpload` components. [#378](https://github.com/mlaursen/react-md/issues/378)
- Fixed the autocomplete not showing suggestions after being autocompleted and getting data via ajax.
[#374](https://github.com/mlaursen/react-md/issues/378)
- Fixed the `TablePagination`'s start value to only update when the `page` prop updates (if defined).
[#372](https://github.com/mlaursen/react-md/issues/372)
- Fixed the `TextField`s not blurring correctly when a touch device scrolls the page after focusing
the text field. [#366](https://github.com/mlaursen/react-md/issues/366)
- Updated the `ListItem` to allow the `nestedItems` to appear above the text instead of only below.
[#380](https://github.com/mlaursen/react-md/pull/380)


### v1.0.14 Released
This patch is mostly for keyboard accessibility updates so that the custom components interact the same way
as native form inputs.

##### Changelog
- Updated the menu component so that it correctly closes when a list item is "clicked" with spacebar or enter.
[#360](https://github.com/mlaursen/react-md/issues/360)
- Fixed the keyboard accessibility for selection controls, pickers, and select field. [#371](https://github.com/mlaursen/react-md/issues/371)
  - switch, radio, and checkbox will no longer be toggle-able with the enter key to emulate the native checkbox and radio
  - select fields, date pickers, and time pickers can only be opened by spacebar. The enter key will attempt to submit a form instead.
  - only the currently checked radio button will be tabbable in the `SelectionControlGroup`. Other options can be be selected by pressing
  the up, down, right, or left arrow keys like the native radio.
  - correctly updated the role for the `SelectField` to be a `"listbox"`
- Fixed the `readOnly` state for the date and time pickers [#371](https://github.com/mlaursen/react-md/issues/371)
- Fixed the text field display error in Firefox. [#368](https://github.com/mlaursen/react-md/issues/368)
- Fixed the `TablePagination` labels when fully controlled. [#369](https://github.com/mlaursen/react-md/issues/369)
- Added a final fallback for nested dialogs to render inline if rendered inside of pure components.
[#229](https://github.com/mlaursen/react-md/issues/229)
- Fixed the scroll locking of dialogs. [#361](https://github.com/mlaursen/react-md/issues/361)

### v1.0.13 Released
This patch was about removing the prop type warnings from the new React version and other small bugs.

##### Changelog
- Migrate React.PropTypes to prop-types. [#325](https://github.com/mlaursen/react-md/issues/325)
- Allow boolean values in selection controls [#350](https://github.com/mlaursen/react-md/issues/350)
- Fixed the picker diplay bug. [#354](https://github.com/mlaursen/react-md/issues/354)
- Fixed the SelectField error state bug. [#354](https://github.com/mlaursen/react-md/issues/353)
- Fixed the dialog mounting animation bug. [#348](https://github.com/mlaursen/react-md/issues/348)
- Allow a multiline textfield to grow from 1 row to multiple. [#347](https://github.com/mlaursen/react-md/issues/347)
- Fixed the AccessibleFakeButton to click when spacebar is pressed. [#346](https://github.com/mlaursen/react-md/issues/346)



## April 2017
### Added Showcases
Added a new place to showcase apps that are using react-md. You can view them [here](/discover-more/showcases).

### v1.0.12 Released
This release is mostly about fixing some of the cross-browser support and weird issues in mobile safari.
In addition, an [examples folder](https://github.com/mlaursen/react-md/tree/master/examples) has been added
to hopefully help newer people get a react-md project started up.

In addition, I decided to move the ticket from `v1.1.0` to `v1.0.12` about the annoying delay when a menu/drawer/toast
is closed by a click action.

##### Changelog
- Fixed the annoying delay on multiple components. [#210](https://github.com/mlaursen/react-md/issues/210)
- Fixed the `DatePicker`'s next/previous month logic. [#315](https://github.com/mlaursen/react-md/issues/315)
- Fixed the `CardActions` not centering correctly. [#316](https://github.com/mlaursen/react-md/issues/316)
- Halfly fixed the hidden content in full page dialogs. [#320](https://github.com/mlaursen/react-md/issues/320)
- Updated the `TablePagination`'s `rowsPerPage` logic to reset `page` and `start` when it has been chaged. [#322](https://github.com/mlaursen/react-md/issues/322)
- Fixed the `Slider`'s bullet position when in a `text-align: center` container. [#323](https://github.com/mlaursen/react-md/issues/323)
- Updated props from `string` to `node` for `react-intl` support. [#327](https://github.com/mlaursen/react-md/issues/327)
- Fixed the Ajax Autocomplete flashing bug. [#330](https://github.com/mlaursen/react-md/issues/330)
- Fixed the `Dialog`'s page layout breaking when it appears. [#333](https://github.com/mlaursen/react-md/issues/333)
- Updated the `TableCheckbox` to appear in a `th` component when in the table header. [#334](https://github.com/mlaursen/react-md/issues/334)
- Fixed some of the styles for better IE 11 support. [#339](https://github.com/mlaursen/react-md/issues/339)
- Fixed the mobile safari click event delegation bug that prevented Menus and other components to be closed when an area outside was clicked.
[#340](https://github.com/mlaursen/react-md/issues/340)


## March 2017
### v1.0.11 Released

##### Changelog
- Fixed the `SelectField`'s label disappearing when when the `menuItems` are defined in the `render` and one of its parents
re-renders (... take 2 :( ). [#300](https://github.com/mlaursen/react-md/issues/300)
- Fixed the tooltip's [unmounting errors](https://github.com/mlaursen/react-md/commit/ba8e734c663d87cc098d569258489c66590feb8b).
- Fixed the SelectionControlGroup disabling persisting the disabled color to the checkboxes/radios. [#308](https://github.com/mlaursen/react-md/issues/308)
- Fixed the checkboxes for DataTables when the rows are dynamic. [#297](https://github.com/mlaursen/react-md/issues/297)
- Fixed the snackbar's transition bug. [#311](https://github.com/mlaursen/react-md/issues/311)

### v1.0.10 Released
The `v1.0.9` tarball was published incorrectly through `yarn`, and was invalid. Republished correctly with `npm`.

### v1.0.9 Released

This was really another patch for drawers. 

##### Changelog
- Fixed the `Drawer` automatically opening when the `type` is set to `TEMPORARY`. [#291](https://github.com/mlaursen/react-md/issues/291)
- Fixed the DatePicker's min/max date validation error. [#293](https://github.com/mlaursen/react-md/issues/293)
- Fixed the `Drawer`'s `overlay` prop not working on mobile and tablet devices. [#298](https://github.com/mlaursen/react-md/issues/298)
- Fixed the `Drawer`'s `overlay` being visible on initial page load when the type is `TEMPORARY` on desktop screens. [#299](https://github.com/mlaursen/react-md/issues/299)
- Fixed the `SelectField`'s label disappearing when when the `menuItems` are defined in the `render` and one of its parents
re-renders. [#300](https://github.com/mlaursen/react-md/issues/300)

### v1.0.8 Released

##### Changelog
- My initial attempt at the defaultVisible prop not working correctly was incorrect. Updated the behavior as mentioned in
the new ticket. [#288](https://github.com/mlaursen/react-md/issues/288)

### v1.0.7 Released

##### Changelog
- Fixed the Drawer's defaultVisible prop not working entirely corrrectly. [#286](https://github.com/mlaursen/react-md/issues/286)
- Fixed the DateTimeFormat fake mock. [#285](https://github.com/mlaursen/react-md/issues/285)
- Fixed the Date/Time pickers to not open when disabled. [#281](https://github.com/mlaursen/react-md/issues/281)
- Fixed the prop warning for MenuButton and passed correct props to Menu. [#278](https://github.com/mlaursen/react-md/issues/278)
- Fixed the Menu attempting to setState after it had unmounted. [#268](https://github.com/mlaursen/react-md/issues/268)

## February 2017
### v1.0.6 Released

##### Changelog
- Fixed DatePicker's [calendar Date when controlled](https://github.com/mlaursen/react-md/issues/245)
- Added [controlled warnings](https://github.com/mlaursen/react-md/commit/d46cf4c6e356aa69ccbcd8fa7903451c4e20e307) to pickers.
- Allowed non-material design colors to compile [without errors](https://github.com/mlaursen/react-md/issues/244).
- FontIcon force size [fix](https://github.com/mlaursen/react-md/issues/221).
- Allowed a TableRow to only have a single column.

### v1.0.5 Released

##### Changelog
- Fixed the DatePicker's [min/max date validator](https://github.com/mlaursen/react-md/commit/53130fadde13253b403d9ed3fe662ed65f6c70d6).
- Fixed the FocusContainer's [window focus bug](https://github.com/mlaursen/react-md/commit/1fe1b9b763734809a565a7fa5c0f5d52bdf80906).
  - > Basically using `element.contains(window)` is invalid and throws a 'Node' does not have contains error.
- Automated the nested dialog [display error](https://github.com/mlaursen/react-md/issues/229) until Portals are updated.
- Fixed the TextField blocked [icon positioning](https://github.com/mlaursen/react-md/commit/9115e235946942095392306564d37fa439511976).
- Passed text-field related props from [pickers](https://github.com/mlaursen/react-md/commit/5daabbb973330d770cbacae99fc418245807afbc).
- Fixed the [TablePagination](https://github.com/mlaursen/react-md/commit/93d932f91e0e2dcfd664331e3dbd2fd48a6c02df)'s onPagination callback
to be more accurate.
- Fixed the TableRows's [onCheckboxClick callback](https://github.com/mlaursen/react-md/commit/69fbdd8fa8519f652fe0d6c8cce4ce0905a5c4a8) to
match documentation.

> I had a moment and accidentally published 1.0.4 with the same code as 1.0.3

## January 2017
### v1.0.3 Released
Minor bugfixes.

##### Changelog
- Patched the line-height for DataTables so that the columns will be centered.
- Correctly updated the peer-dependencies of `react(-\w+)*` to be 15.3.0.
- Fixed the full-page dialog positioning.

### v1.0.2 Released
Minor bugfixes.

##### Changelog
- Fixed active label for [SelectField](https://github.com/mlaursen/react-md/pull/235).
- Components that use the `Portal` component pass the `lastChild` and `renderNode` [props correctly](https://github.com/mlaursen/react-md/pull/234).

### v1.0.1 Released
Minor bugfixes.

##### Changelog
- Fixed proptypes of avatar to allow [PropTypes.node](https://github.com/mlaursen/react-md/issues/198) instead of `string` only.
- Fixed the [accidental form submission](https://github.com/mlaursen/react-md/commit/cf5761026cb0c793a1848ca19c5fdd8eafe1d792) if
selecting an item from an `autocomplete` by using the enter key press in a form.
- Fixed [Slider number alidation](https://github.com/mlaursen/react-md/issues/184) for floats.
- Fixed the issue where the [Switch's onChange prop](https://github.com/mlaursen/react-md/issues/182) fires twice when clicking/touching
the thumb.
- Fixed the styling issue for [password text fields](https://github.com/mlaursen/react-md/issues/192) that have a message with the field.
- Fixed the SelectField to allow a [0 based option value](https://github.com/mlaursen/react-md/issues/214).


## December 2016
### v1.0.0 Released!

This is the first prod-ready release of react-md. The library still isn't completely perfect, but I think it is close enough.

#### TL;DR
- Opt-in mixin component styles (or `@include react-md-everything;`)
- BEM Styles
- Grid System!
- Not fully backwards compatible.
- Accessibility focused.


##### Changelog
- Fixed the [background color bug](https://github.com/mlaursen/react-md/commit/49ce0717af9a63530c1239b0b18c9bd1941a0914).
- Fixed the precompiled bundles to actually reflect what my documentation said. The precompiled bundles
are now formatted as `PRIMARY-COLOR_SECONDARY_COLOR.min.css` instead of `PRIMARY-COLOR-SECONDARY-COLOR.MIN.CSS`.
- Created a [mixin to create color class names](https://github.com/mlaursen/react-md/commit/14e19f3c767ed9901f94a36ee89da238b36e2a09).
- Fixed the injectINK HOC for [keyboard _clicks_](https://github.com/mlaursen/react-md/commit/59dff18cfd8b5b3923b1fb346ef699d8bad3b302).
- FileInput/FileUpload [bugfixes](https://github.com/mlaursen/react-md/commit/2c4e1111fc53e25df94db67a43b892dfb94c0e50).
- Updated the password text fields' styles for [keyboard accessibility](https://github.com/mlaursen/react-md/commit/807aa2a0540756ae88845e5291bcb47e83c6d075).
- Updated the TextFieldMessage to not shrink when in a block text field.
- Updated EditDialogColumn for [accessibility](https://github.com/mlaursen/react-md/commit/217c42554044bdfda4652c8252c7863798c13b30).
- Updated typography to be able to opt out of [utility class names](https://github.com/mlaursen/react-md/commit/5c5eaa2f7a23fd4a811e58bf59ac73a4dc828e66).
- Updated SelectField [keyboard accessibility](https://github.com/mlaursen/react-md/commit/ffe270be18f2c957f2f257db800e1e602ba00e15).
- Updated tooltips to no longer rotate along with the `.md-collapser`s.
- Updated tooltips to be created through react components instead of my weird decision of creating it manually myself. [75eb2e0](https://github.com/mlaursen/react-md/commit/75eb2e0a6616e6109141fc38cb88b35527d52eff)
- Rewrote SelectFieldColumn. [#170](https://github.com/mlaursen/react-md/issues/170)
- Added the `getCurrentMedia` static method to the `NavigationDrawer` as well.
- Updated permanent drawers to no longer use the Portal.
- Updated the `Dialog` component to be able to be closed by pressing the escape key (only if not a `modal`). [b742ed5c](https://github.com/mlaursen/react-md/commit/b742ed5cedaff0e79c6b812794ffe1bf4d567258)
- Updated the Date and Time pickers to have _some_ [keyboard accessibility](https://github.com/mlaursen/react-md/issues/173). This still isn't the ideal solution
and will be changed in a future release (maybe?) to actually allow inline date and time selection that will appear in dropdowns.
- Updated `FocusContainer` to be able to enable/disable the focus containment after being fully mounted.

### General Website Changes

SassDoc pages are now searchable and filterable while on that page itself. I found that using the main search
to attempt to keep finding variables on the same page was a bit annoying. The SassDoc page can now be quick navigated
by clicking the visible FAB and clicking any items in the new Drawer.


### v1.0.0-beta Released

This release fixed up a couple more bugs (listed below) and now the main focus will be figuring out if there are any
production-breaking bugs remaining.

##### Changelog
- Fixed the Avatar colors changing [#161](https://github.com/mlaursen/react-md/issues/161)
- Updated EditDialogColumn to interact correctly with keyboard focus and touch devices
- Fixed the `Dialog` to remove the prevent scroll className when unmounting
- Updated the `Drawer.getCurrentMedia` function to use the `Drawer.defaultProps` as the default value of the `props` parameter.
- Updated the `Drawer` to allow for a _persistent_ temporary Drawer on desktop devices.
- Fixed the `AccessibleFakeButton` to no longer use the space key as an enter keypress.
- Fixed a weird warning on inks if the `waitForInkTransition` prop was enabled and the click event eventually
unmounted the inked component.
- Updated the Menu to correctly remove the window click event on unmount.
- Added correct deprecation notices to the `SelectField` and fixed the keyboard accessibility when using a `SelectField.Positions.BELOW` position.
- Fixed the duplication of the `md-background--primary-hover` and `md-background--secondary-hover`.
- Fixed the duplication of `md-background--primary-hover` and renamed the second one to `md-background--secondary-hover`.
- Minor CSS Fixes



## November 2016
### General Website Changes

With the upcoming `v1.0.0` release, the website has been remade to allow quicker navigation, searching, and finding
related documentation.
- A [Theme Builder](/customization/themes?tab=1) has also been added that allows you to pick and
choose a theme on your website.
- Examples and Prop Types have been separated into different tabs to help separate content a bit more.
- Most SassDoc can be viewed with the related component in a new SassDoc tab.
- The main search now includes sass placeholders, variables, functions, and mixins that will either redirect you to
the correct sassdoc tab, or to the [SassDoc Page](/sassdoc).

### v1.0.0.alpha.4 Released

The main focus of this release was adding a `JumpToContent` link for the `NavigationDrawer` for keyboard accessibility. When you use
the `NavigationDrawer` (or specifically use the `JumpToContentLink` component), the first `tab` press on the page will show a link that
will allow a user to focus the main content of the page instead of having to go through every navigation item.

##### Changelog
- Fixed some color variables that I had mistyped/miscopied...
- Fixed the spelling of `discreet -> discrete`
- Fixed the `Sliders` when using touch devices. [#144](https://github.com/mlaursen/react-md/issues/164)
- Fixed the `YearPicker` after the name change from `initialYearsDisplayed` to `yearsDisplayed`. [#165](https://github.com/mlaursen/react-md/issues/165)
- Added `onTabFocus` and `tabbedClassName` to the `AccessibleFakeButton`. [#160](https://github.com/mlaursen/react-md/issues/160)

### v1.0.0.alpha.3 Released

This release was focused on having a more consistent naming convention. Boolean props are now `adjective` instead of
`isAdjective` and any prop that was `initiallyProp` was renamed `defaultProp` to match how React handles the base html
tag defaults. This also included some small bugfixes as well as updating the Portal component to stop using the undocumented
`CSSPropertyOperations` since it crashed in React 15.4.0.

The `SelectField` was also updated to no longer use the `TextField` component internally and behave more like [the html select](https://github.com/mlaursen/react-md/issues/144).

### v1.0.0.alpha.2 Released

Fixed the UMD build so that the `default` was not needed from the browser for `ReactMD.COMPONENT`.

### v1.0.0.alpha.1 Released

I found out I messed up the naming with a `.` instead of `-` so the future releases are messed up. Whoops. But this change basically
added the old v0.3.7 styles back into the `dist` folder for UMD.


### v1.0.0-alpha Released

Whew. This was a big change. This was a complete rewrite from nested CSS priority to using my first attempt at BEM (so it definitely
isn't perfect). The Sass also changed to an _opt-in_ `mixin` framework. Styles will no longer be included when importing the `scss` files.
The styles can be created by using `react-md-everything` or `react-md-COMPONENTs`. This allows for access to variables by one import instead
of having to specify multiple. Also, the dark theme was finally finished! Woo! Exciting! See the [upgrade guide](/discover-more/upgrade-guides/v1.0.0#now-vs-previous-versions)
for more information.

Some other under-the-hood changes are that as many components as possible use the `PureComponent` instead of the `PureRenderMixin`
with a `Component`. This release also changed my goals from this project. This project's goal is now to be a completely accessible React/Sass UI
framework for material design.

Finally, a material design [Grid System](/customization/grids) was created so positioning is even easier than before.

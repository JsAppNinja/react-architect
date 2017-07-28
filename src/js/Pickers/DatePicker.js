import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import cn from 'classnames';

import DialogFooter from '../Dialogs/DialogFooter';
import DatePickerHeader from './DatePickerHeader';
import DatePickerCalendar from './DatePickerCalendar';
import YearPicker from './YearPicker';

export default class DatePicker extends PureComponent {
  static propTypes = {
    style: PropTypes.object,
    className: PropTypes.string,
    okLabel: PropTypes.node.isRequired,
    okPrimary: PropTypes.bool.isRequired,
    onOkClick: PropTypes.func.isRequired,
    cancelLabel: PropTypes.node.isRequired,
    cancelPrimary: PropTypes.bool.isRequired,
    onCancelClick: PropTypes.func.isRequired,
    DateTimeFormat: PropTypes.func.isRequired,
    locales: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.arrayOf(PropTypes.string),
    ]).isRequired,
    calendarDate: PropTypes.instanceOf(Date).isRequired,
    calendarTempDate: PropTypes.instanceOf(Date).isRequired,
    calendarMode: PropTypes.oneOf(['calendar', 'year']).isRequired,
    changeCalendarMode: PropTypes.func.isRequired,
    icon: PropTypes.bool,
    inline: PropTypes.bool,
    displayMode: PropTypes.oneOf(['landscape', 'portrait']),

    /**
     * The first day of week: 0 for Sunday, 1 for Monday, 2 for Tuesday, and so on.
     */
    firstDayOfWeek: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6]),

    /**
     * An optional className to apply to the title in calendar header.
     */
    calendarTitleClassName: PropTypes.string,

    /**
     * The DateTimeFormat options to apply to format the title in calendar header.
     */
    calendarTitleFormat: PropTypes.shape({
      era: PropTypes.oneOf(['narrow', 'short', 'long']),
      year: PropTypes.oneOf(['numeric', '2-digit']),
      month: PropTypes.oneOf(['numeric', '2-digit', 'narrow', 'short', 'long']),
    }),

    /**
     * An optional className to apply to a weekday in calendar header.
     */
    calendarWeekdayClassName: PropTypes.string,

    /**
     * The DateTimeFormat option to apply to format a weekday in calendar header.
     */
    calendarWeekdayFormat: PropTypes.oneOf(['narrow', 'short', 'long']),
  };

  render() {
    const {
      okLabel,
      okPrimary,
      onOkClick,
      cancelLabel,
      cancelPrimary,
      onCancelClick,
      DateTimeFormat,
      locales,
      calendarTempDate,
      calendarMode,
      changeCalendarMode,
      style,
      className,
      inline,
      icon,
      displayMode,
      firstDayOfWeek,
      calendarTitleClassName,
      calendarTitleFormat,
      calendarWeekdayClassName,
      calendarWeekdayFormat,
      ...props
    } = this.props;

    let picker;
    if (calendarMode === 'calendar') {
      picker = (
        <DatePickerCalendar
          {...props}
          key="calendar"
          calendarTempDate={calendarTempDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          firstDayOfWeek={firstDayOfWeek}
          titleClassName={calendarTitleClassName}
          titleFormat={calendarTitleFormat}
          weekdayClassName={calendarWeekdayClassName}
          weekdayFormat={calendarWeekdayFormat}
        />
      );
    } else {
      picker = (
        <YearPicker
          {...props}
          key="year"
          calendarTempDate={calendarTempDate}
          DateTimeFormat={DateTimeFormat}
          locales={locales}
        />
      );
    }

    const actions = [{
      key: 'cancel',
      onClick: onCancelClick,
      primary: cancelPrimary,
      secondary: !cancelPrimary,
      label: cancelLabel,
    }, {
      key: 'ok',
      onClick: onOkClick,
      primary: okPrimary,
      secondary: !okPrimary,
      label: okLabel,
    }];

    return (
      <div
        style={style}
        className={cn('md-picker md-picker--date', {
          [`md-picker--${displayMode}`]: displayMode,
          'md-picker--inline': inline,
          'md-picker--inline-icon': inline && icon,
        }, className)}
      >
        <DatePickerHeader
          DateTimeFormat={DateTimeFormat}
          locales={locales}
          calendarTempDate={calendarTempDate}
          calendarMode={calendarMode}
          changeCalendarMode={changeCalendarMode}
        />
        <div className="md-picker-content-container">
          {picker}
          <DialogFooter actions={actions} />
        </div>
      </div>
    );
  }
}

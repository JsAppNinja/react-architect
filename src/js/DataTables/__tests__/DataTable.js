/* eslint-env jest*/
import React from 'react';
import { shallow } from 'enzyme';
import { findDOMNode } from 'react-dom';
import {
  Simulate,
  renderIntoDocument,
  findRenderedDOMComponentWithTag,
} from 'react-addons-test-utils';

import DataTable from '../DataTable';

class Body extends React.Component {
  render() {
    return (
      <tbody>
        <tr>
          <td />
        </tr>
      </tbody>
    );
  }
}

describe('DataTable', () => {
  it('should wrap the table in a responsive container by default', () => {
    const wrapper = shallow(<DataTable baseId="test"><Body /></DataTable>);
    expect(wrapper.hasClass('md-data-table--responsive')).toBe(true);

    wrapper.setProps({ responsive: true });
    expect(wrapper.hasClass('md-data-table--responsive')).toBe(true);

    wrapper.setProps({ responsive: false });
    expect(wrapper.hasClass('md-data-table--responsive')).toBe(false);
  });

  it('should merge style and className correctly based on the responsive prop', () => {
    const props = {
      baseId: 'test-table',
      style: { background: 'red' },
      className: 'test-1',
      tableStyle: { background: 'orange' },
      tableClassName: 'test-2',
      responsive: true,
    };

    const wrapper = shallow(<DataTable {...props}><Body /></DataTable>);
    let table = wrapper.find('table');
    expect(wrapper.hasClass(props.className)).toBe(true);
    expect(table.hasClass(props.tableClassName)).toBe(true);

    wrapper.setProps({ responsive: false });
    table = wrapper.find('table');
    expect(table.hasClass(props.className)).toBe(true);
    expect(wrapper.hasClass(props.className)).toBe(true);
  });

  it('adds any event listeners', () => {
    const onClick = jest.fn();
    const onMouseDown = jest.fn();
    const onMouseUp = jest.fn();
    const onMouseOver = jest.fn();
    const onMouseLeave = jest.fn();
    const onTouchStart = jest.fn();
    const onTouchEnd = jest.fn();
    const onTouchCancel = jest.fn();

    const table = renderIntoDocument(
      <DataTable
        baseId="woop"
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
        onTouchCancel={onTouchCancel}
      >
        <tbody><tr><td>c</td></tr></tbody>
      </DataTable>
    );

    const tableNode = findRenderedDOMComponentWithTag(table, 'table');
    Simulate.click(tableNode);
    expect(onClick).toBeCalled();

    Simulate.mouseOver(tableNode);
    expect(onMouseOver).toBeCalled();

    Simulate.mouseLeave(tableNode);
    expect(onMouseLeave).toBeCalled();

    Simulate.mouseDown(tableNode);
    expect(onMouseDown).toBeCalled();

    Simulate.mouseUp(tableNode);
    expect(onMouseUp).toBeCalled();

    Simulate.touchStart(tableNode);
    expect(onTouchStart).toBeCalled();

    Simulate.touchEnd(tableNode);
    expect(onTouchEnd).toBeCalled();

    Simulate.touchCancel(tableNode);
    expect(onTouchCancel).toBeCalled();
  });

  it('wraps the table in a responsive container when the responsive prop is true', () => {
    const props = {
      baseId: 'woop',
      responsive: true,
      children: <tbody><tr><td>C</td></tr></tbody>,
    };
    let table = renderIntoDocument(<DataTable {...props} />);
    let tableNode = findDOMNode(table);
    expect(tableNode.className).toBe('md-data-table--responsive');
    expect(tableNode.nodeName).toBe('DIV');

    props.responsive = false;
    table = renderIntoDocument(<DataTable {...props} />);
    tableNode = findDOMNode(table);
    expect(tableNode.className).toBe('md-data-table');
    expect(tableNode.nodeName).toBe('TABLE');
  });

  describe('_toggleSelectedRow', () => {
    it('should correctly toggle all rows when the row is 0 and a header exists', () => {
      const table = renderIntoDocument(
        <DataTable baseId="woop">
          <thead>
            <tr>
              <th>Wow!</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No way!</td>
            </tr>
            <tr>
              <td>What a save!</td>
            </tr>
          </tbody>
        </DataTable>
      );

      table._toggleSelectedRow(0, true, { target: { checked: true } });
      expect(table.state.selectedRows).toEqual([true, true]);
    });

    it('should only toggle a single row when the row is 0 and a header does not exist', () => {
      const table = renderIntoDocument(
        <DataTable baseId="woop">
          <tbody>
            <tr>
              <td>No way!</td>
            </tr>
            <tr>
              <td>What a save!</td>
            </tr>
          </tbody>
        </DataTable>
      );

      table._toggleSelectedRow(0, false, { target: { checked: true } });
      expect(table.state.selectedRows).toEqual([true, false]);
    });

    it('should call the onRowToggle prop with the correct arguments', () => {
      const onRowToggle = jest.fn();
      let table = renderIntoDocument(
        <DataTable baseId="woop" onRowToggle={onRowToggle}>
          <thead>
            <tr>
              <th>Wow!</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>No way!</td>
            </tr>
            <tr>
              <td>What a save!</td>
            </tr>
          </tbody>
        </DataTable>
      );

      const event = { target: { checked: true } };
      table._toggleSelectedRow(0, true, event);
      expect(onRowToggle.mock.calls.length).toBe(1);
      expect(onRowToggle.mock.calls[0][0]).toBe(0);
      expect(onRowToggle.mock.calls[0][1]).toBe(true);
      expect(onRowToggle.mock.calls[0][2]).toBe(2);
      expect(onRowToggle.mock.calls[0][3]).toEqual(event);

      table = renderIntoDocument(
        <DataTable baseId="woop" onRowToggle={onRowToggle}>
          <tbody>
            <tr>
              <td>No way!</td>
            </tr>
            <tr>
              <td>What a save!</td>
            </tr>
          </tbody>
        </DataTable>
      );

      table._toggleSelectedRow(0, false, event);
      expect(onRowToggle.mock.calls.length).toBe(2);
      expect(onRowToggle.mock.calls[1][0]).toBe(0);
      expect(onRowToggle.mock.calls[1][1]).toBe(true);
      expect(onRowToggle.mock.calls[1][2]).toBe(1);
      expect(onRowToggle.mock.calls[1][3]).toEqual(event);
    });
  });
});

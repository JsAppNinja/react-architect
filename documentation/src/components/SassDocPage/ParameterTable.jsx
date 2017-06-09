import React from 'react';
import PropTypes from 'prop-types';
import DataTable from 'react-md/lib/DataTables/DataTable';
import TableHeader from 'react-md/lib/DataTables/TableHeader';
import TableRow from 'react-md/lib/DataTables/TableRow';
import TableColumn from 'react-md/lib/DataTables/TableColumn';
import TableBody from 'react-md/lib/DataTables/TableBody';

import Markdown from 'components/Markdown';
import parameterShape from './parameterShape';

const ParameterTable = ({ parameters }) => {
  if (!parameters.length) {
    return <h5 className="sassdoc__section">None</h5>;
  }

  const rows = parameters.map(({ name, description, type, default: defaultValue }) => (
    <TableRow key={name}>
      <TableColumn>
        <pre>
          {name.indexOf('$') === -1 ? '$' : ''}{name}
        </pre>
      </TableColumn>
      <TableColumn><Markdown markdown={description} /></TableColumn>
      <TableColumn><pre>{type}</pre></TableColumn>
      <TableColumn><pre>{defaultValue || '\u2014'}</pre></TableColumn>
    </TableRow>
  ));

  return (
    <DataTable className="sassdoc__section sassdoc__parameter-table" plain>
      <TableHeader>
        <TableRow>
          <TableColumn>Name</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Default value</TableColumn>
        </TableRow>
      </TableHeader>
      <TableBody>{rows}</TableBody>
    </DataTable>
  );
};

ParameterTable.propTypes = {
  parameters: PropTypes.arrayOf(parameterShape).isRequired,
};

export default ParameterTable;

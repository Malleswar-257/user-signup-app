import React, { useState } from 'react';
import DataTable from 'react-data-table-component';

const UserSignupTable = ({ data }) => {
  const [selectedRows, setSelectedRows] = useState([]);

  const columns = [
    {
      name: 'Username',
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: 'Email',
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: 'Password',
      selector: (row) => row.password,
      sortable: false,
    },
    {
      name: 'Role',
      selector: (row) => row.role,
      sortable: true,
    },
  ];

  const handleRowSelect = (selectedRows) => {
    setSelectedRows(selectedRows);
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      pagination
      selectableRows
      onSelectedRowsChange={handleRowSelect}
      search
      selectOnEnter
      highlightOnHover
      paginationServer
      paginationTotalRows={data.length}
    />
  );
};

export default UserSignupTable;
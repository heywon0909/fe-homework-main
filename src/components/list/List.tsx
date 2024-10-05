import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

export type rowType = { id: number, name: string, star: boolean; robot: { id: string, is_online: boolean } };
export type rowsType = Array<rowType>
interface Props{
    columns: GridColDef<(rowsType)[number]>[],
    rows: rowsType
}
export default function List({columns,rows}:Props) {
  return (
    <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 6,
            },
          },
        }}
        pageSizeOptions={[6]}
        checkboxSelection
        disableRowSelectionOnClick
      />
    </Box>
  );
}
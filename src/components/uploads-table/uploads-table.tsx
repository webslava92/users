/* eslint-disable no-console */
import React from 'react';
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

type Row = {
  uploadId: number;
  entries: number;
  creationDate: string;
};

type Props = {
  items: Row[];
  // setDialogOpen?: Function;
};

type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: 'left' | 'center' | 'right' | undefined;
};

const columns: readonly Column[] = [
  { id: 'uploadId', label: 'Id' },
  { id: 'creationDate', label: 'Create date' },
  { id: 'entries', label: 'Entries' },
];

export function UploadsTable({
  items,
}: Props) {
  const styles = {
    container: {
      maxHeight: 'calc(100vh - 400px)',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    title: {
      textAlign: 'center',
      margin: 2,
    },
    headerCell: {
      fontWeight: 700,
      backgroundColor: '#ccc',
    },
  };

  const handleContextMenu = (row: any) => {
    console.log('row', row.id);
  };

  return (
    <>
      <Typography variant='h5' sx={styles.title}>
        Download list
      </Typography>
      <Paper>
        <TableContainer sx={styles.container}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.id} sx={styles.headerCell}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {items && items.map((row: Row) => (
                <TableRow
                  onContextMenu={() => handleContextMenu(row)}
                  sx={{ cursor: row.uploadId ? 'pointer' : 'unset' }}
                  key={row.uploadId}
                >
                  <TableCell>{row.uploadId}</TableCell>
                  <TableCell>{row.creationDate}</TableCell>
                  <TableCell>{row.entries}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

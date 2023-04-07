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
  leadId: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  uploadId?: number;
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
  { id: 'id', label: 'Id', align: 'center' },
  { id: 'firstName', label: 'First name', align: 'center' },
  { id: 'lastName', label: 'Last name' },
  { id: 'phone', label: 'Phone' },
  { id: 'email', label: 'Email' },
  { id: 'creationDate', label: 'Create date' },
];

export function LeadsTable({
  items,
}: // setDialogOpen,
Props) {
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

  console.log('items', items);

  const handleContextMenu = (row: any) => {
    console.log('row', row.id);
  };

  return (
    <>
      <Typography variant='h5' sx={styles.title}>
        Detailed information about information uploaded from csv files
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
              {items &&
                items.map((row: Row) => (
                  <TableRow
                    onContextMenu={() => handleContextMenu(row)}
                    sx={{ cursor: row.leadId ? 'pointer' : 'unset' }}
                    key={row.leadId}
                  >
                    <TableCell>{row.leadId}</TableCell>
                    <TableCell>{row.firstName}</TableCell>
                    <TableCell>{row.lastName}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>{row.email}</TableCell>
                    <TableCell>{row.creationDate}</TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </>
  );
}

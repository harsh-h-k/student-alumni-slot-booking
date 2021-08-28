import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  tablehead : {
    backgroundColor : "#d5edf5",
  },
});



function DataTable({data}) {
    const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead className={classes.tablehead}>
          <TableRow>
            <TableCell>Username</TableCell>
            <TableCell align="right">Booking Date and time of booking</TableCell>
            <TableCell align="right">Booking Slot</TableCell>
            
          </TableRow>
        </TableHead>
        <TableBody>
          {data?.map((book) => (
            <TableRow key={book._id}>
              <TableCell component="th" scope="row">
                {book.username}
              </TableCell>
              <TableCell align="right">{book.bookingDate}</TableCell>
              <TableCell align="right">{book.bookingSlot}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default DataTable

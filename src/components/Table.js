import React from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  margin: {
    marginTop: 10,
  },
}));

export default function (props) {
  const {
    tableData,
    columnNames,
    handleDeleteRecord,
    openEditForm,
    openAddForm,
  } = props;
  const classes = useStyles();

  return (
    <div className="table">
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {columnNames.map((name, index) => (
                <TableCell align="center" key={`${name}${index}`}>
                  {name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData &&
              tableData.map((record, index) => (
                <TableRow key={`${record.name}${index}`}>
                  <TableCell align="center">{record.name}</TableCell>
                  <TableCell align="center">{record.email}</TableCell>
                  <TableCell align="center">{record.phone}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={openEditForm.bind(null, record, index)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteRecord.bind(null, index)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="contained"
        color="primary"
        onClick={openAddForm}
        className={classes.margin}
      >
        Add Record
      </Button>
    </div>
  );
}

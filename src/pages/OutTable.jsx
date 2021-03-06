import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import { makeStyles, Typography } from "@material-ui/core";

function OutTable() {
  const { id } = useParams();
  const [details, loading, error] = useDocumentData(
    firestore.doc(`parchi/${id}`),
    { idField: "id" }
  );

  return (
    <div>
      {error && <strong>Error: {JSON.stringify(error)}</strong>}
      {loading && <span>Collection: Loading...</span>}
      {details && (
        <div>
          <DenseTable details={details} />
        </div>
      )}
    </div>
  );
}

const useStyles = makeStyles({});

function createData(size, bag, weight, total) {
  return { size, bag, weight, total };
}

function DenseTable({ details }) {
  const classes = useStyles();
  const rows = details.total_out.items;

  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        <Table
          className={classes.table}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell>Size</TableCell>
              <TableCell align="center">Bag</TableCell>
              <TableCell align="center">Weight</TableCell>
              <TableCell align="center">Total Kg</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row, index) => (
              <TableRow key={index}>
                <TableCell component="th" scope="row">
                  {row.size}
                </TableCell>
                <TableCell align="center">{row.bags}</TableCell>
                <TableCell align="center">{row.weight}</TableCell>
                <TableCell align="center">{row.total_weight}</TableCell>
              </TableRow>
            ))}
            <TableRow>
              <TableCell></TableCell>
              <TableCell></TableCell>
              <TableCell align="center">
                <b>Total : </b>
              </TableCell>
              <TableCell align="center">
                <b>{details.total_out.value}</b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default OutTable;

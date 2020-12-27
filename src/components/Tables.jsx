import {
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import RemoveCircleIcon from "@material-ui/icons/RemoveCircle";

function Tables({ type, total, setTotal, tableDataIn, setTableDataIn }) {
  const [open, setOpen] = React.useState(false);
  const [bags, setBags] = useState(0);
  const [size, setSize] = useState("");
  const [weight, setWeight] = useState(0);

  useEffect(() => {
    let total = 0;
    if (!tableDataIn) return;
    tableDataIn.map((item) => {
      total += item.total_weight;
    });
    setTotal(total);
  }, [tableDataIn]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteTableRow = (id) => {
    const newTable = tableDataIn.filter((item) => item.id !== id);
    setTableDataIn(newTable);
  };

  const addData = () => {
    if (type) {
      setTableDataIn(() => [
        ...tableDataIn,
        {
          size: size,
          bags: bags,
          weight: weight,
          total_weight: bags * weight,
          id: new Date().toString(),
        },
      ]);
    } else {
      setTableDataIn(() => [
        ...tableDataIn,
        {
          bags: bags,
          weight: weight,
          total_weight: bags * weight,
          id: new Date().toString(),
        },
      ]);
    }

    setOpen(false);
    setBags(0);
    setWeight(0);
    setSize("");
  };

  return (
    <Fragment>
      <TableContainer
        style={{
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
          borderTop: "1px solid #505050",
          borderBottom: "1px solid #505050",
        }}
      >
        <Table size="small">
          <TableHead>
            <TableRow>
              {type && <TableCell align="center">Size</TableCell>}
              <TableCell>Bag</TableCell>
              <TableCell align="center">Weight</TableCell>
              <TableCell align="center">Total </TableCell>
              <TableCell align="center">
                <AddCircleIcon
                  style={{ fill: "#4caf50" }}
                  onClick={handleClickOpen}
                />
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tableDataIn &&
              tableDataIn.map((row, index) => (
                <TableRow key={index}>
                  {type && (
                    <TableCell component="th" scope="row">
                      {row.size}
                    </TableCell>
                  )}
                  <TableCell component="th" scope="row">
                    {row.bags}
                  </TableCell>
                  <TableCell align="center">{row.weight}</TableCell>
                  <TableCell align="center">{row.total_weight}</TableCell>
                  <TableCell align="center">
                    <RemoveCircleIcon
                      color="error"
                      onClick={() => {
                        deleteTableRow(row.id);
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            <TableRow>
              <TableCell></TableCell>

              <TableCell align="center">
                <b>Total: </b>
              </TableCell>
              <TableCell align="center">
                <b>{total.toFixed(2)} </b>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogContent>
          {type && (
            <FormControl style={{ minWidth: 120 }}>
              <InputLabel id="demo-simple-select-label">Size</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={size}
                onChange={(event) => setSize(event.target.value)}
              >
                <MenuItem value={"10Rs"}>10Rs</MenuItem>
                <MenuItem value={"20Rs"}>20Rs</MenuItem>
                <MenuItem value={"100Gm"}>100Gm</MenuItem>
                <MenuItem value={"250Gm"}>250Gm</MenuItem>
                <MenuItem value={"500Gm"}>500Gm</MenuItem>
                <MenuItem value={"1Kg"}>1Kg</MenuItem>
              </Select>
            </FormControl>
          )}
          <br />
          <TextField
            autoFocus={!type}
            margin="dense"
            id="name"
            label="Bag"
            type="text"
            value={bags ? bags : ""}
            onChange={(event) => setBags(event.target.value)}
          />
          <TextField
            margin="dense"
            id="weight"
            label="Weight (Kg)"
            type="text"
            value={weight ? weight : ""}
            onChange={(event) => setWeight(event.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" size="small">
            Cancel
          </Button>
          <Button onClick={addData} color="primary" size="small">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
}

export default Tables;

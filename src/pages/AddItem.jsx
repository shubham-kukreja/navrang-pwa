import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import {
  Button,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  makeStyles,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@material-ui/core";
import { firestore } from "../config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import Tables from "../components/Tables";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
const categories = ["A", "B", "C", "D", "E", "F", "G"];

function AddItem() {
  const [previousRem, setPreviousRem] = useState(0);
  const [totalIn, setTotalIn] = useState(0);
  const [totalOut, setTotalOut] = useState(0);
  const [total, setTotal] = useState(0);
  const [rem, setRem] = useState(0);
  const [spinner, setSpinner] = useState(false);
  const [tableDataIn, setTableDataIn] = useState([]);
  const [tableDataOut, setTableDataOut] = useState([]);
  const [cat, setCat] = useState("A");

  const classes = useStyles();
  const parchiRef = firestore.collection("parchi");

  const query = parchiRef.where("cat", "==", cat).limit(25);
  const [parchi, loading, error] = useCollectionData(query, { idField: "id" });
  const history = useHistory();

  useEffect(() => {
    if (!loading && !error && parchi[1]) setPreviousRem(parchi[1].rem);
  }, [parchi, cat]);

  useEffect(() => {
    setTotal(parseFloat(previousRem) + parseFloat(totalIn));
    setRem(
      parseFloat(previousRem) + parseFloat(totalIn) - parseFloat(totalOut)
    );
  }, [totalIn, totalOut, previousRem, total, rem]);

  const saveItem = async () => {
    const item = {
      cat: cat,
      date: new Date(),
      previous_rem: previousRem,
      rem: rem,
      total: total,
      total_in: { value: totalIn, items: tableDataIn },
      total_out: { value: totalOut, items: tableDataOut },
    };
    setSpinner(true);
    await firestore.collection("parchi").add(item);
    setSpinner(false);
    history.push(`/blends/${cat}`);
  };

  if (spinner || loading) {
    return (
      <div className="flex-container-center">
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {error && <p>An Error Occured</p>}
      <List component="nav" className={classes.root}>
        <ListItem button>
          <FormControl style={{ minWidth: 240 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={cat}
              onChange={(event) => setCat(event.target.value)}
            >
              {categories.map((item) => (
                <MenuItem value={item}>{item}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </ListItem>
        <ListItem button>
          <ListItemText primary={`${new Date().toDateString()}`} />
        </ListItem>
        <ListItem button>
          <ListItemText primary={`मा. शिल्लक :`} />
          {!loading && !error && (
            <TextField
              inputProps={{ min: 0, style: { textAlign: "right" } }}
              value={previousRem}
              style={{ width: "50%", textAlign: "right" }}
              name="previousRem"
              onChange={(e) => setPreviousRem(e.target.value)}
            />
          )}
        </ListItem>
        <br />
        <ListItem>
          <ListItemText primary={`दिला :`} />
          <Typography id="standard" value={totalIn} name="totalIn">
            {totalIn} Kg
          </Typography>
        </ListItem>
        <Tables
          total={totalIn}
          setTotal={setTotalIn}
          tableDataIn={tableDataIn}
          setTableDataIn={setTableDataIn}
        />
        <br />
        <ListItem>
          <ListItemText primary={`एकूण :`} />
          <Typography style={{ margin: 5 }} name="total">
            {isNaN(total) ? 0 : total} Kg
          </Typography>
        </ListItem>
        <br />
        <ListItem>
          <ListItemText primary={`जावक :`} />
          <Typography style={{ margin: 5 }} name="totalOut">
            {totalOut} Kg
          </Typography>
        </ListItem>
        <Tables
          type={1}
          total={totalOut}
          setTotal={setTotalOut}
          tableDataIn={tableDataOut}
          setTableDataIn={setTableDataOut}
        />
        <br />
        <ListItem button>
          <ListItemText primary={`शिल्लक :`} />
          <Typography style={{ margin: 5 }} name="rem">
            {isNaN(rem) ? 0 : rem}
          </Typography>
        </ListItem>
        <br />
        <br />
      </List>
      <Container style={{ display: "flex", justifyContent: "center" }}>
        <Button
          style={{ backgroundColor: "#4caf50", color: "white" }}
          onClick={saveItem}
        >
          Save
        </Button>
      </Container>
      <br />
      <br />
    </>
  );
}

export default AddItem;

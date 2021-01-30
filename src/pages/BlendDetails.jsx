import React, { Fragment } from "react";
import { useParams } from "react-router-dom";
import { firestore } from "../config/firebase";
import { useCollectionData } from "react-firebase-hooks/firestore";
import {
  CircularProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

function BlendDetails(props) {
  const { id } = useParams();
  const classes = useStyles();
  const parchiRef = firestore.collection("parchi");
  const query = parchiRef.where("cat", "==", id);

  const [parchi, loading, error] = useCollectionData(query, { idField: "id" });

  return (
    <Fragment>
      <div className="flex-container-center">
        Blend Details : {id}
        <List component="nav" className={classes.root}>
          {error && <strong>Error: {JSON.stringify(error)}</strong>}
          {loading && (
            <div className="flex-container-center">
              <CircularProgress />
            </div>
          )}
          {parchi &&
            parchi
              .sort((a, b) => a.date.date < b.date.date)
              .map((data, index) => (
                <ItemCard key={data.id} data={data} index={index} />
              ))}
        </List>
      </div>
    </Fragment>
  );
}

const ItemCard = ({ data, index }) => {
  return (
    <ListItemLink
      key={index}
      to={`/blendetails/${data.id}`}
      primary={`${data.date.toDate().getDate()} / ${
        data.date.toDate().getMonth() + 1
      } / ${data.date.toDate().getFullYear()}`}
    />
  );
};

export default BlendDetails;
function ListItemLink(props) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

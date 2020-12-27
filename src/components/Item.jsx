import { List, ListItem, ListItemText, makeStyles } from "@material-ui/core";
import React from "react";
import { Link as RouterLink } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));
function ListItemLink(props) {
  const { primary, to } = props;

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
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

function Item({ data }) {
  const classes = useStyles();

  return (
    <List component="nav" className={classes.root}>
      <ListItem button>
        <ListItemText primary={`Category : ${data.cat}`} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={`${data.date.toDate().toDateString()}`} />
      </ListItem>
      <ListItem button>
        <ListItemText primary={`मा. शिल्लक : ${data.previous_rem}`} />
      </ListItem>
      <ListItemLink
        to={`/intable/${data.id}`}
        primary={`दिला : ${data.total_in.value}`}
      />
      <ListItemLink
        to={`/outtable/${data.id}`}
        primary={`एकूण : ${data.total}`}
      />
      <ListItemLink
        to={`/outtable/${data.id}`}
        primary={`जावक : ${data.total_out.value}`}
      />
      <ListItem button>
        <ListItemText primary={`शिल्लक : ${data.rem}`} />
      </ListItem>
    </List>
  );
}

export default Item;

import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { makeStyles } from "@material-ui/core/styles";
import DescriptionIcon from "@material-ui/icons/Description";
import React, { Fragment } from "react";
import { Link, Link as RouterLink } from "react-router-dom";
import FAB from "../components/FAB";

const categories = ["A", "B", "C", "D", "E", "F", "G"];

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
}));

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

function Blends() {
  const classes = useStyles();

  return (
    <Fragment>
      <List component="nav" className={classes.root}>
        {categories.map((cat, index) => (
          <ListItemLink
            key={index}
            to={`/blends/${cat}`}
            primary={"Category " + cat}
            icon={<DescriptionIcon />}
            className={classes.listItem}
          />
        ))}
      </List>
      <div style={{ position: "fixed", bottom: 20, right: 20 }}>
        <Link to={`/add`}>
          <FAB />
        </Link>
      </div>
    </Fragment>
  );
}
export default Blends;

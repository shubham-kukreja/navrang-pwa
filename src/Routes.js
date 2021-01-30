import React, { Fragment } from "react";
import { Route, Switch } from "react-router-dom";
import BlendDetails from "./pages/BlendDetails";
import Blends from "./pages/Blends";
import InTable from "./pages/InTable";
import ItemDetails from "./pages/ItemDetails";
import OutTable from "./pages/OutTable";
import Navbar from "./components/Navbar";
import AddItem from "./pages/AddItem";
import Tables from "./components/Tables";
import Staff from "./pages/Staff";
import StaffDetails from "./pages/StaffDetails";

function Routes() {
  return (
    <Fragment>
      <Navbar />
      <Switch>
        <Route path="/" exact>
          <Blends />
        </Route>
        <Route path="/staff" exact>
          <Staff />
        </Route>
        <Route path="/staff/:id" exact>
          <StaffDetails />
        </Route>
        <Route path="/blends/:id" exact>
          <BlendDetails />
        </Route>
        <Route path="/blendetails/:id" exact>
          <ItemDetails />
        </Route>
        <Route path="/outtable/:id" exact>
          <OutTable />
        </Route>
        <Route path="/intable/:id" exact>
          <InTable />
        </Route>
        <Route path="/add">
          <AddItem />
        </Route>
        <Route path="/table">
          <Tables type={1} />
        </Route>
      </Switch>
    </Fragment>
  );
}

export default Routes;

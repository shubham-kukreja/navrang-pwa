import { Button } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function Staff() {
  const history = useHistory();

  const [Staff, setStaff] = useState(
    JSON.parse(localStorage.getItem("staff_data"))
      ? JSON.parse(localStorage.getItem("staff_data"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("staff_data", JSON.stringify(Staff));
  }, [Staff]);

  const addStaff = () => {
    const name = prompt();
    const newStaff = [...Staff, { name: name, kaam: [] }];
    setStaff(newStaff);
  };

  const removeStaff = (name) => {
    const newStaff = Staff.filter((item) => item.name !== name);
    setStaff(newStaff);
  };

  return (
    <div>
      {Staff &&
        Staff.map((item, index) => (
          <div key={index} onClick={() => history.push(`/staff/${item.name}`)}>
            <h1>{item.name}</h1>
            <Button onClick={() => removeStaff(item.name)}>Remove Staff</Button>
          </div>
        ))}
      <br />
      <Button onClick={() => addStaff()}>Add Staff</Button>
    </div>
  );
}

export default Staff;

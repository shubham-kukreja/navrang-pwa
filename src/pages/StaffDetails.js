import { Button } from "@material-ui/core";
import { ControlPointSharp } from "@material-ui/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function StaffDetails() {
  const { id } = useParams();
  const [kaam, setKaam] = useState([]);

  useEffect(() => {
    if (id) {
      let staff_data = JSON.parse(localStorage.getItem("staff_data"));
      staff_data = staff_data.filter((item) => item.name === id)[0];
      setKaam(staff_data.kaam);
    }
  }, []);

  useEffect(() => {
    if (kaam) {
      let staff_data = JSON.parse(localStorage.getItem("staff_data"));
      const index = staff_data.findIndex((item) => item.name === id);
      staff_data[index].kaam = kaam;
      localStorage.setItem("staff_data", JSON.stringify(staff_data));
    }
  }, [kaam]);

  const addKaam = () => {
    const newKaam = prompt();
    setKaam([...kaam, newKaam]);
  };

  const deleteKaam = (id) => {
    const newKaam = kaam.filter((item) => item !== id);
    setKaam(newKaam);
  };

  return (
    <div>
      {kaam &&
        kaam.map((item) => (
          <div>
            {item}
            <Button onClick={() => deleteKaam(item)}>Delete Task</Button>
          </div>
        ))}
      <Button onClick={addKaam}>Add Task</Button>
    </div>
  );
}

export default StaffDetails;

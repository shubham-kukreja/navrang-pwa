import React from "react";
import TextField from "@material-ui/core/TextField";
import { Typography } from "@material-ui/core";

function Item({ data }) {
  return (
    <div className="flex-container-center">
      <div>
        <Typography variant="h6">Category : {data.cat}</Typography>
      </div>
      <br />
      <br />
      <div>
        <TextField
          id="standard-basic"
          label="मागील शिल्लक :"
          value={data?.previous_rem}
        />
      </div>
      <br />
      <div>
        <TextField
          id="standard-basic"
          label="दिला :"
          value={data?.total_in.value}
        />
      </div>
      <br />
      <div>
        <TextField id="standard-basic" label="एकूण :" value={data?.total} />
      </div>
      <br />
      <div>
        <TextField
          id="standard-basic"
          label="जावक :"
          value={data?.total_out.value}
        />
      </div>
      <br />
      <div>
        <TextField id="standard-basic" label="शिल्लक :" value={data?.rem} />
      </div>
    </div>
  );
}

export default Item;

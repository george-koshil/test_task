import React, { useEffect, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

export default function EditTable(props) {
  const {
    initialState = {
      name: "",
      email: "",
      phone: "",
    },
    handleChangeRecord,
    buttonName,
    handleCancelChanges,
    tableData,
  } = props;
  const [record, setRecord] = useState(initialState);
  const [prevData, setPrevData] = useState(null);

  useEffect(() => {
    setPrevData(tableData);
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setRecord((record) => {
      return { ...record, [id]: value };
    });
  };

  const handleRecord = () => {
    if (buttonName === "Add") setRecord(initialState);
    handleChangeRecord(record, record.index);
  };

  return (
    <form noValidate autoComplete="off" className="form">
      <TextField
        id="name"
        label="Name"
        variant="outlined"
        value={record.name}
        onChange={handleChange}
      />
      <TextField
        id="email"
        label="Email"
        variant="outlined"
        value={record.email}
        onChange={handleChange}
      />
      <TextField
        id="phone"
        label="Phone"
        variant="outlined"
        value={record.phone}
        onChange={handleChange}
      />

      <Button
        variant="contained"
        color="primary"
        onClick={handleRecord}
      >
        {buttonName}
      </Button>

      <Button
        variant="contained"
        color="primary"
        onClick={handleCancelChanges.bind(null, prevData)}
      >
        Cancel changes
      </Button>
    </form>
  );
}

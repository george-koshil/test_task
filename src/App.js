import React, { useEffect, useState } from "react";
import Table from "./components/Table";
import ReactModal from "react-modal";
import EditTable from "./components/EditTable";
import './App.css'

ReactModal.setAppElement("#modal-root");

export default function App() {
  const [tableData, setTableData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddForm, setIsAddForm] = useState(false);
  const [isEditForm, setIsEditForm] = useState(false);
  const [editRecord, setEditRecord] = useState();

  useEffect(() => {
    setTableData(JSON.parse(localStorage.getItem("table")) || tableData);
  }, []);

  const saveData = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const handleDeleteRecord = (index) => {
    const newTableData = [...tableData];
    newTableData.splice(index, 1);
    setTableData(newTableData);
    saveData("table", newTableData);
  };

  const handleAddRecord = (record) => {
    setTableData([...tableData, record]);
    saveData("table", [...tableData, record]);
  };

  const handleEditRecord = (record, index) => {
    const newTableData = [...tableData];
    newTableData.splice(index, 1, record);
    setTableData(newTableData);
    saveData("table", newTableData);
  };

  const handleCancelChanges = prevState => {
    setTableData(prevState);
    saveData('table', prevState);
  };

  const handleClose = () => {
    setIsModalOpen(false);
    setIsAddForm(false);
    setIsEditForm(false);
  };

  const openEditForm = (record, index) => {
    setEditRecord({ ...record, index });
    setIsModalOpen(true);
    setIsEditForm(true);
  };

  const openAddForm = () => {
    setIsModalOpen(true);
    setIsAddForm(true);
  };

  return (
    <div>
      <Table
        columnNames={["name", "email", "phone", "action"]}
        tableData={tableData}
        handleDeleteRecord={handleDeleteRecord}
        openEditForm={openEditForm}
        openAddForm={openAddForm}
      />

      <ReactModal isOpen={isModalOpen} onRequestClose={handleClose} className='modal'>
        {isAddForm && (
          <EditTable
              handleChangeRecord={handleAddRecord}
              buttonName="Add"
              handleCancelChanges={handleCancelChanges}
              tableData={tableData}
          />
        )}
        {isEditForm && (
          <EditTable
            initialState={editRecord}
            handleChangeRecord={handleEditRecord}
            handleCancelChanges={handleCancelChanges}
            buttonName="Save"
            tableData={tableData}
          />
        )}
      </ReactModal>
    </div>
  );
}

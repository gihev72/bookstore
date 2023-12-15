import { useState, useEffect } from "react";
import "./App.css";
import { AgGridReact } from "ag-grid-react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-material.css";
import AddBook from "./components/AddTodo";

function App() {
  const [books, setBooks] = useState([]);

  const columnDefs = [
    { field: "title", sortable: true, filter: true },
    { field: "author", sortable: true, filter: true },
    { field: "year", sortable: true, filter: true },
    { field: "isbn", sortable: true, filter: true },
    { field: "price", sortable: true, filter: true },
    {
      headerName: "",
      field: "id",
      width: 90,
      cellRenderer: (params) => (
        <IconButton
          onClick={() => deleteBook(params.value)}
          size="small"
          color="error"
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = () => {
    fetch(
      "https://bookstore-b41f7-default-rtdb.europe-west1.firebasedatabase.app/books/.json"
    )
      .then((response) => response.json())
      .then((data) => addKeys(data))
      .catch((err) => console.error(err));
  };

  const addBooks = (newBook) => {
    fetch(
      "https://bookstore-b41f7-default-rtdb.europe-west1.firebasedatabase.app/books/.json",
      {
        method: "POST",
        body: JSON.stringify(newBook),
      }
    )
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };

  const deleteBook = (id) => {
    fetch(
      `https://bookstore-b41f7-default-rtdb.europe-west1.firebasedatabase.app/books/${id}.json`,
      {
        method: "DELETE",
      }
    )
      .then((response) => fetchItems())
      .catch((err) => console.error(err));
  };

  const addKeys = (data) => {
    const keys = Object.keys(data);
    const valuekeys = Object.values(data).map((item, index) =>
      Object.defineProperty(item, "id", { value: keys[index] })
    );
    setBooks(valuekeys);
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5">TodoList</Typography>
        </Toolbar>
      </AppBar>
      <AddBook addbook={addBooks} />
      <div
        className="ag-theme-material"
        style={{ height: 400, width: "100%", padding: 16 }}
      >
        <AgGridReact rowData={books} columnDefs={columnDefs} />
      </div>
    </>
  );
}

export default App;
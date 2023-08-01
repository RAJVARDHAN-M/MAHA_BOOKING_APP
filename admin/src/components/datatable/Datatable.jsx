import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];

  const [list, setList] = useState([]);
  const { data, loading, error } = useFetch(`https://maha-booking-app-api.onrender.com/api/${path}/`);
  
  // console.log(data)
  useEffect(() => {
  getData()
   
    setList(data);
  }, []);
  
  const getData = () => {
    fetch(`https://maha-booking-app-api.onrender.com/api/${path}`)
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setList(data);
        // You can do further processing with the 'data' here
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        // Handle any errors that occurred during the fetch
      });
  };
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://maha-booking-app-api.onrender.com/api/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (err) {}
  };
  




  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        className="datagrid"
        rows={list}
        columns={columns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
        getRowId={(row) => row._id}
      />
    </div>
  );
};

export default Datatable;

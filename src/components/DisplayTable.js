// DisplayTable.js
import React from "react";

const DisplayTable = ({ data, onSort, onDelete }) => {
  return (
    <table className="table table-bordered table-striped">
      <thead>
        <tr>
          <th onClick={() => onSort("name")}>Name</th>
          <th onClick={() => onSort("age")}>Age</th>
          <th onClick={() => onSort("email")}>Email</th>
          <th>
            <button className="btn btn-secondary" onClick={() => onSort("name")}>
              Sort
            </button>
          </th>
          
        </tr>
      </thead>

      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.name}</td>
            <td>{item.age}</td>
            <td>{item.email}</td>
            <td>
              <button
                className="btn btn-danger"
                onClick={() => onDelete(item.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DisplayTable;

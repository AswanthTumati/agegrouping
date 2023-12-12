// DisplayComponent.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import DisplayTable from "./DisplayTable";

const DisplayComponent = ({ data, onDelete }) => {
  const [sortedData, setSortedData] = useState(data);

  const categorizeData = (data) => {
    const ageGroups = {
      "1-18": [],
      "19-30": [],
      "31-45": [],
      "45+": [],
    };
    data.forEach((item) => {
      const age = parseInt(item.age);
      if (age >= 1 && age <= 18) {
        ageGroups["1-18"].push(item);
      } else if (age >= 19 && age <= 30) {
        ageGroups["19-30"].push(item);
      } else if (age >= 31 && age <= 45) {
        ageGroups["31-45"].push(item);
      } else {
        ageGroups["45+"].push(item);
      }
    });
    return ageGroups;
  };

  useEffect(() => {
    const sorted = [...data].sort((a, b) => (a.age > b.age ? 1 : -1));
    setSortedData(sorted);
  }, [data]);

  const handleSort = (key) => {
    const sorted = [...sortedData].sort((a, b) => (a[key] > b[key] ? 1 : -1));
    setSortedData(sorted);
  };

  const handleDelete = (id) => {
    onDelete(id);
    const updatedData = sortedData.filter((item) => item.id !== id);
    setSortedData(updatedData);
  };

  const renderAgeGroup = (ageGroup, title) => {
    return (
      <div key={title} className="col mb-4">
        <h3>{title}</h3>
        <DisplayTable
          data={ageGroup}
          onSort={handleSort}
          onDelete={handleDelete}
        />
      </div>
    );
  };

  const ageGroups = categorizeData(sortedData);

  return (
    <div className="">
      <Link to="/form" className="justify-content-center">
        <button className="btn btn-primary ">Add+</button>
      </Link>
      <div className="row">
        {renderAgeGroup(ageGroups["1-18"], "1-18 age group")}
        {renderAgeGroup(ageGroups["19-30"], "19-30 age group")}
        {renderAgeGroup(ageGroups["31-45"], "31-45 age group")}
        {renderAgeGroup(ageGroups["45+"], "45+ age group")}
      </div>
    </div>
  );
};

export default DisplayComponent;

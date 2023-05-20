import React from "react";

function DashboardOnlyNumberData({ data, icon, name }) {
  return (
    <div className="data">
      <div>
        <h2>{data}</h2>
        <p>{name}</p>
      </div>
      {icon}
    </div>
  );
}

export default DashboardOnlyNumberData;

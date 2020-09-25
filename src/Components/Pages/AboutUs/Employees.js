import React from "react";
import { CircularProgress } from "@material-ui/core";
import { useAxiosGet } from "../../httpRequests/HttpRequests";
import Employee from './Employee';

function Employees() {
  let content = null;
  const url = "http://dummy.restapiexample.com/api/v1/employees";

  const employees = useAxiosGet(url);

  if (employees.loading) {
    content = (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (employees.data) {
    content = employees.data.map((employee, key) => (
      <div key={key}>
        <Employee employee={employee} />
      </div>
    )); 
  }

  return <div>{content}</div>;
}

export default Employees;

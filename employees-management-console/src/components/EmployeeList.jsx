import React from "react";
import EditEmployee from "./EditEmployee";
const EmployeeList = props => {
  const employeeNames = props.employeeslist;
  console.log(
    "inside Employee List " + employeeNames.map(emp => emp.employee_name)
  );

  return (
    <React-Fragment>
      <br></br>
      <br></br>
      <h5 className="regform">
        The employees in the organization are as follows....
      </h5>
      <ul>
        {employeeNames.map(emp => (
          <div key={emp.id}>
            {emp.employee_name}
            <button
              className="btn btn-primary btn-sm m-2"
              onClick={() => {
                props.onEdit(
                  emp.id,
                  emp.employee_name,
                  emp.employee_age,
                  emp.employee_salary
                );
              }}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm m-2"
              onClick={() => {
                if (
                  window.confirm("Are you sure you want to delete this item?")
                )
                  props.onDelete(emp.id);
              }}
            >
              Delete
            </button>
          </div>
        ))}
      </ul>
    </React-Fragment>
  );
};
export default EmployeeList;

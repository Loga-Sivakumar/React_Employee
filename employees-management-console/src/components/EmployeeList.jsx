import React from 'react';
const EmployeeList = props => {
  const employeeNames = props.employeeslist;
  console.log(
    'inside Employee List ' + employeeNames.map(emp => emp.employee_name)
  );
  

  return (
    <React-Fragment>
      <br></br>
      <br></br>
      <h5 className='regform'>
        Here are the employees of your organization!!!
      </h5>
      <ul>
        {employeeNames.map(emp => (
          <div key={emp.id}>
            {emp.employee_name} 
            <div>
            <button
              className='btn btn-primary btn-sm m-2'
              onClick={() => {
                props.onEdit(
                  emp.id,
                  emp.employee_name,
                  emp.employee_age,
                  emp.employee_salary,
                );
              }}
            >
              Edit
            </button>
            <button
              className='btn btn-danger btn-sm m-2'
              onClick={() => {
                if (
                  window.confirm(`Are you sure you want to delete ${emp.employee_name} ?`)
                )
                  props.onDelete(emp.id);
              }}
            >
              Delete
            </button>
            <br></br><br></br>
            </div>
          </div>
        ))}
      </ul>
    </React-Fragment>
  );
};
export default EmployeeList;

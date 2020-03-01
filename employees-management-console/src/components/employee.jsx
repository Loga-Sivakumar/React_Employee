import React, { Component } from "react";
import http from "./services/httpService";
import EmployeeList from "./EmployeeList";
import EditEmployee from "./EditEmployee";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "./css/employee.css";
import "bootstrap/dist/css/bootstrap.min.css";

class Employee extends Component {
  state = {
    employees: [],
    employee_name: "",
    employee_age: "",
    employee_salary: "",
    employee_id: "",
    errors: {},
    isEdit: false
  };
  render() {
    if (this.state.isEdit === true)
      return (
        <EditEmployee
          employee_id={this.state.employee_id}
          employee_name={this.state.employee_name}
          employee_age={this.state.employee_age}
          employee_salary={this.state.employee_salary}
          employeeslist={this.state.employees}
        />
      );
    return (
      <React-fragment>
        <div className="background">
          <h1 className="heading">Employee Repository</h1>
        </div>

        <span className="regform">Employee Registration Form</span>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label column sm="2">
              Employee Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                placeholder="Minimum 5 characters required"
                name="employee_name"
                ref="employee_name"
                value={this.employee_name}
                onChange={this.handleChange}
              />
            </Col>
            <Col sm="2">
              <span style={{ color: "red" }}>{this.state.errors["name"]}</span>
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label column sm="2">
              Employee Age
            </Form.Label>
            <Col sm="4">
              <Form.Control
                placeholder="Age Limit min-18 max-70"
                name="employee_age"
                ref="employee_age"
                value={this.employee_age}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label column sm="2">
              Employee Salary
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="employee_salary"
                ref="employee_salary"
                value={this.employee_salary}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="submit">
            Submit
          </Button>
        </Form>

        <EmployeeList
          employeeslist={this.state.employees}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </React-fragment>
    );
  }
  async componentDidMount() {
    let { data: employees } = await http.get(
      "http://localhost:4000/api/employees"
    );

    console.log({ employees });
    this.setState({ employees });
    console.log(
      "after setstate " + this.state.employees.map(emp => emp.employee_salary)
    );
  }

  handleEdit = (id, name, age, salary, event) => {
    console.log("inside Handle edit" + id);
    this.setState({ isEdit: true });
    this.setState({ employee_id: id });
    this.setState({ employee_name: name });
    this.setState({ employee_age: age });
    this.setState({ employee_salary: salary });
  };

  handleSubmit = async event => {
    console.log("Inside Handle Sumbit");
    event.preventDefault();
    if (this.validateForm()) {
      const dataentries = {
        employee_name: this.state.employee_name,
        employee_age: this.state.employee_age,
        employee_salary: this.state.employee_salary
      };
      console.log(
        "employee name in handle submit is in STATE is " +
          this.state.employee_name
      );
      console.log(
        "employee name in handle submit is " + dataentries.employee_name
      );
      let { data: employee } = await http.post(
        "http://localhost:4000/api/employees/create/",
        dataentries
      );
      console.log({ employee });
      const updatedEmployees = [...this.state.employees];
      this.setState({ employees: updatedEmployees });

      //get
      let { data: employees } = await http.get(
        "http://localhost:4000/api/employees"
      );

      console.log({ employees });
      this.setState({ employees });

      this.setState({
        employee_name: "",
        employee_age: "",
        employee_salary: ""
      });
    } else console.log("inside submit else ");
  };
  validateForm() {
    console.log("Inside validate forms " + this.state.employee_name);
    let errors = {};
    let formIsValid = true;
    let employee_name = this.state.employee_name;
    if (employee_name === null)
      this.errors["employee_name"] = "Cannot be empty";
    this.setState({ errors: errors });
  }
  handleChange = event => {
    console.log("Inside HandleChange");
    this.setState({ [event.target.name]: event.target.value });
  };

  handleDelete = async (id, event) => {
    console.log("inside Handle Delete " + id);
    let { data: employeesdel } = await http.delete(
      "http://localhost:4000/api/employees/delete/" + id
    );
    console.log("After Delete " + employeesdel);

    const newEmployees = [...this.state.employees];
    this.setState({ employees: newEmployees });

    //get
    let { data: employees } = await http.get(
      "http://localhost:4000/api/employees"
    );

    console.log({ employees });
    this.setState({ employees });
    //console.log("After delete " + employeesdel.map(emp => emp.employee_name));
  };
}

export default Employee;

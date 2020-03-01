import React, { Component } from "react";
import Employee from "./employee";
import http from "./services/httpService";
import { Button } from "react-bootstrap";
import { Form } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
class EditEmployee extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    employee_id: this.props.employee_id,
    employee_name: this.props.employee_name,
    employee_age: this.props.employee_age,
    employee_salary: this.props.employee_salary
  };

  render() {
    return (
      <React-Fragment>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label column sm="2">
              Employee Name
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="employee_name"
                ref="employee_name"
                value={this.employee_name}
                placeholder={this.props.employee_name}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} controlId="formPlaintextName">
            <Form.Label column sm="2">
              Employee Age
            </Form.Label>
            <Col sm="4">
              <Form.Control
                name="employee_age"
                ref="employee_age"
                value={this.employee_age}
                placeholder={this.props.employee_age}
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
                placeholder={this.props.employee_salary}
                onChange={this.handleChange}
              />
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="submit">
            Update
          </Button>
        </Form>
        <h1>{this.props.employee_id}</h1>
      </React-Fragment>
    );
  }
  handleChange = event => {
    console.log("Inside HandleChange edit employee");
    console.log("****" + this.state.employee_name);
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = async event => {
    console.log("Inside Handle Sumbit edit employee");
    const employee_id = this.state.employee_id;
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
    let { data: employee } = await http.put(
      "http://localhost:4000/api/employees/update/" + employee_id,
      dataentries
    );
    console.log({ employee });
    const updatedEmployees = [...this.state.employees];
    this.setState({ employees: updatedEmployees });

    // //get
    // let { data: employees } = await http.get(
    //   "http://localhost:4000/api/employees"
    // );

    // console.log({ employees });
    // this.setState({ employees });
    // event.preventDefault();
    // this.setState({ employee_name: "", employee_age: "", employee_salary: "" });
  };
}

export default EditEmployee;

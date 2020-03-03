import React, { Component } from 'react';
import http from './services/httpService';
import EmployeeList from './EmployeeList';
import EditEmployee from './EditEmployee';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import './css/employee.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class Employee extends Component {
  state = {
    employees: [],
    employee_name: '',
    employee_age: '',
    employee_salary: '',
    employee_id: '',
    isEdit: false,
    isAge:true,
    isName:true,
    isSalary:true
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
          cancel={this.handleCancel}
        />
      );
    return (
      <React-fragment>
        <div className='background'>
          <h1 className='heading'>Employee Repository</h1>
        </div>

        <span className='regform'>Employee Registration Form</span>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} >
            <Form.Label column sm='2' >Employee Name</Form.Label> 
            <Col sm='4'>
              <Form.Control
                placeholder='Enter a valid name'
                name='employee_name'
                ref='employee_name'
                value={this.state.employee_name}
                onChange={this.handleChange}
              />
              <span  className='required'>required</span>
            </Col>
            {this.state.isName === false && <span className='error'>Invalid input</span>}
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Label column sm='2'>
              Employee Age
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                placeholder='Age Limit min-18 max-70'
                name='employee_age'
                ref='employee_age'
                value={this.state.employee_age}
                onChange={this.handleChange}
              />
               <span  className='required'>required</span>
            </Col>
            {this.state.isAge === false && <span className='error'>Invalid Input</span>}
          </Form.Group>
          <Form.Group as={Row} >
            <Form.Label column sm='2'>
              Employee Salary
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                name='employee_salary'
                ref='employee_salary'
                value={this.state.employee_salary}
                onChange={this.handleChange}
              />
               <span  className='required'>required</span>
            </Col>
            {this.state.isSalary === false && <span className='error'>Invalid input</span>}
          </Form.Group>

          <Button type='submit' variant='primary' className='submit'>
            Submit
          </Button>
          <br></br><br></br>
        </Form>

        <EmployeeList
          employeeslist={this.state.employees}
          onEdit={this.handleEdit}
          onDelete={this.handleDelete}
        />
      </React-fragment>
    );
  }

  // componenetDidMount Initial data load from API

  async componentDidMount() {
    let { data: employees } = await http.get(
      'http://localhost:4000/api/employees'
    );
    console.log({ employees });
    this.setState({ employees });
    console.log(
      'after setstate ' + this.state.employees.map(emp => emp.employee_salary)
    );
  }

// Edit Event Handling

  handleEdit = (id, name, age, salary, event) => {
    console.log('inside Handle edit' + id);
    this.setState({ isEdit: true });
    this.setState({ employee_id: id });
    this.setState({ employee_name: name });
    this.setState({ employee_age: age });
    this.setState({ employee_salary: salary });
  };

  //Delete Event Handling

  handleDelete = async (id, event) => {
    console.log('inside Handle Delete ' + id);
    let { data: employeesdel } = await http.delete(
      'http://localhost:4000/api/employees/delete/' + id
    );
    console.log('After Delete ' + employeesdel);

    const newEmployees = [...this.state.employees];
    this.setState({ employees: newEmployees });

    let { data: employees } = await http.get(
      'http://localhost:4000/api/employees'
    );
    console.log({ employees });
    this.setState({ employees });

  };

  //Form input onChange validation

  handleChange = event => {
    console.log('Inside HandleChange');

   //Name Validation

if(event.target.name==='employee_name')
{
  if(event.target.value.match('^[a-zA-Z ]*$') != null)
  {
console.log('valid name ');
this.setState({isName:true});
  }
  else
  this.setState({isName:false});
  this.setState({ [event.target.name]: event.target.value });
}
    //Age Validation

if(event.target.name==='employee_age')
{
  console.log('inside first if ');
if(isNaN(event.target.value)||(event.target.value<18)||(event.target.value>70))
this.setState({isAge:false});
else
this.setState({isAge:true});
this.setState({ [event.target.name]: event.target.value });
}

//Salary Validation

if(event.target.name==='employee_salary')
{
  if(isNaN(event.target.value))
  this.setState({isSalary:false});
  else
  this.setState({isSalary:true});
  this.setState({ [event.target.name]: event.target.value });
}
  };

  //Employee creation Form Submission

  handleSubmit = async event => {
    console.log('Inside Handle Sumbit');
      const dataentries = {
        employee_name: this.state.employee_name,
        employee_age: this.state.employee_age,
        employee_salary: this.state.employee_salary,
      };
      console.log(
        'employee name in handle submit is in STATE is ' +
          this.state.employee_name
      );
      console.log(
        'employee name in handle submit is ' + dataentries.employee_name
      );
      if(this.state.employee_name!==''&&this.state.isName===true&&this.state.employee_age!==''&&this.state.isAge===true&&this.state.employee_salary!==''&&this.state.isSalary===true)
      {
     await http.post(
        'http://localhost:4000/api/employees/create/',
        dataentries
      );
    
      alert (`Do you want to create the employee named ${this.state.employee_name} ?`);
      this.setState({
        employee_name: '',
        employee_age: '',
        employee_salary: '',
      });
    }
    else
 alert('Invalid Form details!!!');
  };

  // Handle the Cancel button from Child

  handleCancel=()=>
  {
    this.setState({isEdit:false});
  }
}

export default Employee;

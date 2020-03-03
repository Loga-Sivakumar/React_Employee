import React, { Component } from 'react';
import http from './services/httpService';
import { Button } from 'react-bootstrap';
import { Form } from 'react-bootstrap';
import { Row } from 'react-bootstrap';
import { Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
class EditEmployee extends Component {
 
  state = {
    employee_id: this.props.employee_id,
    employee_name: this.props.employee_name,
    employee_age: this.props.employee_age,
    employee_salary: this.props.employee_salary,
    employees:this.props.employeeslist,
    isAge:true,
    isName:true,
    isSalary:true,
  };

  render() {
    return (
      <React-Fragment>
        <span className='regform'>Employee Update Form</span>
        <Form onSubmit={this.handleSubmit}>
          <Form.Group as={Row} controlId='formPlaintextName'>
            <Form.Label column sm='2'>
              Employee Name
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                name='employee_name'
                ref='employee_name'
                value={this.state.employee_name}
                placeholder={this.props.employee_name}
                onChange={this.handleChange}
              />
            </Col>
            {this.state.isName === false && <span className='error'>Invalid input</span>}
          </Form.Group>

          <Form.Group as={Row} controlId='formPlaintextName'>
            <Form.Label column sm='2'>
              Employee Age
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                name='employee_age'
                ref='employee_age'
                value={this.state.employee_age}
                placeholder={this.props.employee_age}
                onChange={this.handleChange}
              />
            </Col>
            {this.state.isAge === false && <span className='error'>Invalid Input</span>}
          </Form.Group>
          <Form.Group as={Row} controlId='formPlaintextName'>
            <Form.Label column sm='2'>
              Employee Salary
            </Form.Label>
            <Col sm='4'>
              <Form.Control
                name='employee_salary'
                ref='employee_salary'
                value={this.state.employee_salary}
                placeholder={this.props.employee_salary}
                onChange={this.handleChange}
              />
            </Col>
            {this.state.isSalary === false && <span className='error'>Invalid input</span>}
          </Form.Group>

          <Button type='submit' variant='primary' className='submit'>
            Update
          </Button> <span>
          </span><span></span>
          <Button  variant='secondary' onClick={this.props.cancel}>
            Cancel
          </Button> 
        </Form>
      </React-Fragment>
    );
  }


//Handle Form input change

  handleChange = event => {
    console.log('Inside HandleChange edit employee');
    console.log('****' + this.state.employee_name);

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
    {
    this.setState({isAge:false});
    }
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

  //handle Form Submit

  handleSubmit = async event => {
    console.log('Inside Handle Sumbit edit employee');
  
    const employee_id = this.state.employee_id;
    const dataentries = {
      employee_name: this.state.employee_name,
      employee_age: this.state.employee_age,
      employee_salary: this.state.employee_salary
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
    let { data: employee } = await http.put(
      'http://localhost:4000/api/employees/update/' +employee_id,
      dataentries
    );
    console.log({ employee });
      }
      else
      alert('Invalid Form details!!!');
  };
}

export default EditEmployee;

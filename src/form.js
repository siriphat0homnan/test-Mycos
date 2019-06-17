import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
// import DatePicker from "react-datepicker";
 
// import "react-datepicker/dist/react-datepicker.css";


export default class FromInputData extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName: "",
            startWorkDate: "",
            position: "Junior software engineer",
            salary: "",
            dateOfBirth: "",
            summit: false,
            fullName: "", 
            startToWorkDate: "",
            age: "",
            providentFund: ""
        };
      
       


        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleChange(event) {
        this.setState({ firstName: event.target.firstName });
        this.setState({ lastName: event.target.lastName });
        this.setState({ startWorkDate: event.target.startWorkDate });
        this.setState({ position: event.target.position });
        this.setState({ salary: event.target.salary });
        this.setState({ dateOfBirth: event.target.dateOfBirth });
    }

    handleSubmit(event) {
        var fullName = (this.state.firstName +' '+this.state.lastName);
        var startWorkDate = this.state.startWorkDate;
        var position = this.state.position;
        var salary = this.state.salary;
        var age = getAge(this.state.dateOfBirth);
        var monthWork = getWorkMonth(startWorkDate);
        var providentFund = calculateOfEmployyerProvidentFund(monthWork, position, salary);
        // alert(fullName, startWorkDate, age, monthWork, providentFund);
       
        this.setState({
            fullName: fullName,
            startToWorkDate: startWorkDate,
            age: age,
            monthWork: monthWork,
            providentFund: providentFund
        })

        event.preventDefault();


        // find Provident Fund
        function calculateOfEmployyerProvidentFund(monthWork, position, salary){
            var year = 12;
            var providentFund = 0;
            var firstYear = 0;
            var secondYear = 0;
            var salaryChange = 0;
            var positionInFunc = ["Junior software engineer", "Software engineer", "Senior software engineer", "Director"];
            var rateOfPosition = [0.02, 0.05, 0.08, 0.15];
            var rateOfYear = [0, 0.2, 0.5, 0.7, 1];
            var index = positionInFunc.indexOf(position);

            rateOfPosition = rateOfPosition[index];
            salaryChange = salary * monthWork * rateOfPosition;
            // first Year
            var monthWorkNotFullYear = year - (monthWork % year); //เก็บเดือนเศษปีแรก
            if(monthWorkNotFullYear < 3){
                firstYear = (monthWorkNotFullYear) * salary;    // select rate 0 becase work < 3 month
            }else if(monthWorkNotFullYear >= 3){
                firstYear = (monthWorkNotFullYear) * salary * rateOfPosition * rateOfYear[1];    // select rate 0.2 becase work > 3 month
                
            }
            
            // Second Year
            var secondYear = monthWork - year;
            console.log(salaryChange, firstYear, secondYear);
            if(secondYear >= year){
                switch(secondYear) {
                    case (secondYear >= 12 && secondYear < 35):
                        secondYear = secondYear * salary * rateOfPosition * rateOfYear[2];
                      break;
                    case secondYear >= 36 && secondYear < 59:
                        secondYear = secondYear * salary * rateOfPosition * rateOfYear[3];
                      break;
                    case secondYear >= 60:
                        secondYear = secondYear * salary * rateOfPosition * rateOfYear[4];
                      break;
                  }
                  
            }else{
                secondYear = 0;
            }
            providentFund =  salaryChange + firstYear + secondYear;
            
            // Sum of All
            
              
            console.log(salaryChange, firstYear, secondYear);
            return providentFund;
        }

        // find work job year
        function getWorkMonth(startWorkDate){
            var today = new Date();
            var workMonth = new Date(startWorkDate);
            var year = today.getFullYear() - workMonth.getFullYear();
            var month = today.getMonth() - workMonth.getMonth();
            if(month >= 0){
                month = (year * 12) + month;
            }else{
                year = 0;
                month = 12 + month;
            }

            return month;
        }

        // find age
        function getAge(dateOfBirth) {
            var today = new Date();
            var birthDate = new Date(dateOfBirth);
            var age = today.getFullYear() - birthDate.getFullYear();
            var month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age = age - 1;
            }

            return age;
        }
       
    }


    render() {
        return (
            <div className="row">
                <Col sm={12} md={5} lg={5} className="m-5 p-5 bg-sec1-left">
                    <Form onSubmit={this.handleSubmit}>
                        {/* onSubmit={() => alert(JSON.stringify(this.state))} */}
                        {/* Input Fisst Name */}
                        <FormGroup row>
                            <Label for="firstName" md={3}>First Name: </Label>
                            <Col md={9}>
                                <Input type="text" name="firstName" id="firstName" placeholder="Your First Name" onChange={e => { this.setState({ firstName: e.target.value }) }} value={this.state.firstName} />
                            </Col>
                        </FormGroup>

                        {/* Input Last Name */}
                        <FormGroup row>
                            <Label for="lastName" md={3}>Last Name: </Label>
                            <Col md={9}>
                                <Input type="text" name="lastName" id="lastName" placeholder="Your Last Name" onChange={e => { this.setState({ lastName: e.target.value }) }} value={this.state.lastName} />
                            </Col>
                        </FormGroup>

                        {/* Input Start Working */}
                        <FormGroup row>
                            <Label for="startWorkDate" md={3}>Start Work Date (A.D): </Label>
                            <Col md={9}>
                                <Input type="date" id="startWorkDate" name="startWorkDate" data-date-format="mm/dd/yy" onChange={e => { this.setState({ startWorkDate: e.target.value }) }} value={this.state.startWorkDate} />
                            </Col>
                        </FormGroup>

                        {/* Input Position */}
                        <FormGroup row>
                            <Label for="position" md={3}>Position</Label>
                            <Col md={9}>
                                <Input type="select" name="position" id="position" value={this.state.value} onChange={e => { this.setState({ position: e.target.value }) }}>
                                    <option value="Junior software engineer">Junior Software Engineer</option>
                                    <option value="Software engineer">Software Engineer</option>
                                    <option value="Senior software engineer">Senior Software Engineer</option>
                                    <option value="Director">Director</option>
                                </Input>
                            </Col>
                        </FormGroup>

                        {/* Input Salary */}
                        <FormGroup row>
                            <Label for="salary" md={3}>Salary (Bath): </Label>
                            <Col md={9}>
                                <Input type="text" name="salary" id="salary" placeholder="Your Salary" onChange={e => { this.setState({ salary: e.target.value }) }} value={this.state.salary} />
                            </Col>
                        </FormGroup>

                        {/* Input Birth */}
                        <FormGroup row>
                            <Label for="dateOfBirth" md={3}>Date of Birth (A.D): </Label>
                            <Col md={9}>
                                <Input type="date" id="dateOfBirth" name="dateOfBirth" onChange={e => { this.setState({ dateOfBirth: e.target.value }) }} value={this.state.dateOfBirth} />
                            </Col>
                        </FormGroup>

                        <Button id="summit" outline color="success">Send</Button>{' '}
                    </Form>
                </Col>

                <Col sm={12} md={5} lg={5} className ="m-5 p-5 bg-sec1-right">
                    <FormGroup row>
                        <Label for="fullName" md={5}>Full Name: </Label>
                        <Col md={7}>
                            <Input id="fullName" name="fullName" value={this.state.fullName} disabled></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="startToWorkDate" md={5}>Start Working Date: </Label>
                        <Col md={7}>
                            <Input id="startToWorkDate" name="startToWorkDate" value={this.state.startToWorkDate} disabled></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="age" md={5}>Age: </Label>
                        <Col md={7}>
                        <Input id="age" name="age" value={this.state.age} disabled></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="monthWork" md={5}>Work Duration (Months): </Label>
                        <Col md={7}>
                        <Input id="monthWork" name="monthWork" value={this.state.monthWork} disabled></Input>
                        </Col>
                    </FormGroup>
                    <FormGroup row>
                        <Label for="providentFund" md={5}>Provident Fund Collected (Bath): </Label>
                        <Col md={7}>
                        <Input id="providentFund" name="providentFund" value={this.state.providentFund} disabled></Input>
                        </Col>
                    </FormGroup>
                    
                  
                </Col>
            </div>
        )
    }

}
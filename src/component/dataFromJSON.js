import React from 'react';
import { Col, Button, Form, FormGroup, Label, Input } from 'reactstrap';
import DataJson from '../data/employee.json'
import form  from './form'

export default class DataFromJSON extends React.Component {

    constructor(props) {
        super(props)
        this.state = {rows:[]}
    };


    handleSubmit(event) {
        var i = 0;
        var fullname = [];
        var startWork = [];
        var age = [];
        var Duration = [];
        var fund = [];

        // cal of all
        DataJson.forEach(data => {
            fullname[i] = data.firstName + " " + data.lastName;
            startWork[i] = data.startWorkingDate;
            age[i] =  getAge(data.dateOfBirth);
            Duration[i] = getWorkMonth(data.startWorkingDate);
            fund[i] = calculateOfEmployyerProvidentFund(Duration[i], data.position, data.salary);
            i++; 
        });
        
        // sum array
        var clone = [];
        var start = 0;
        var end = i;
        while(start < end){
            clone[start] = [fullname[start], startWork[start], age[start], Duration[start], fund[start]];
            start++;
        }

        alert(JSON.stringify(clone));
        // document.getElementById('test1').innerHTML = clone;
        // console.log(clone[0][0]);
        // this.setState({rows: clone}, function () {
        //         console.log(this.state.rows);
        //     });
       
        // this.setState({rows: clone});
        // clone.forEach(item => {
        //     dataArry.push(item);
        // })
        // this.setState({rows: clone}, function () {
        //     console.log(this.state.rows);
        // });

        // function getDataFomatHTML(clone){
 
        //     var arry = [];
        //     clone.forEach(item => {
        //         //  arry.push(<tr><td>{item[0]}</td><td>{item[1]}</td><td>{item[2]}</td><td>{item[3]}</td><td>{item[4]}</td></tr>);
        //         arry.push("<tr><td>" + item[0] + "</td><td>" +"<td>" + item[1] + "</td><td>" + "<td>" + item[2] + "</td><td>" + "<td>" + item[3] + "</td><td>" + "<td>" + item[4] + "</td><tr>" );
        //     } )
        //     return arry;
        // }

        // console.log(JSON.stringify(clone));

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
           
            // Sum of All
            providentFund =  salaryChange + firstYear + secondYear;
              
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

        event.preventDefault();
    }
    render() {
        return (
            <div>
                 <Form onSubmit={this.handleSubmit}>
                    <Button id="summitToShowJSON" outline color="success">Get Data</Button>
                 </Form>

                {/* <table>
                    <thead>
                        <tr>
                            <th>Full Name</th>
                            <th>Start Work</th>
                            <th>Age</th>
                            <th>Duration</th>
                            <th>Fund</th>
                        </tr>
                    </thead>
                    <tboby>
                    {
                        this.state.rows.map(item => {
                        <tr>
                            <td>{item[0]}</td>
                            <td>{item[1]}</td>
                            <td>{item[2]}</td>
                            <td>{item[3]}</td>
                            <td>{item[4]}</td>
                        </tr>
                        })
                    }
                    </tboby>
                </table> */}
              
                
                
               

                 
               
            </div>
        )
    }
}
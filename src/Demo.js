import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';

export default class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = { employees: [] };
    }

    /**
     * Components did mount life cycle
     */

    componentDidMount() {
        this.getEmployeeList();
    }

    getEmployeeList() {
        axios.get('http://localhost:4500/users', { headers: {Authorization: 'Bearer ' + localStorage.getItem("access_token") } }).then((response) => {
            this.setState({ employees: response.data });
        });
    }

    editRecord(id) {
        let path = `/edit/` + id;
        this.props.history.push(path);
    }

    deleteRecord(id)  {
            axios.delete('http://localhost:4500/users/'+ id)
                .then((res) => {
                    this.getEmployeeList();
                })
                .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <h4>
                    <Link to="/create">Add New Employee</Link>
                </h4>
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>FirstName</th>
                            <th>LastName</th>
                            <th>Email</th>
                            <th>ContactNumber</th>
                            <th>Action</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.employees.map((employee) =>
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.FirstName}</td>
                                <td>{employee.LastName}</td>
                                <td>{employee.Email}</td>
                                <td>{employee.ContactNumber}</td>
                                <td><button onClick={this.editRecord.bind(this, employee.id)}>Edit</button></td>
                                <td><button onClick={this.deleteRecord.bind(this, employee.id)}>Delete</button></td>
                            </tr>
                        )}
                    </tbody>
                </Table>
            </div>
        )
    }
}

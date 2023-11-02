import React, { Component } from 'react';
import axios from 'axios';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Demo from './Demo'

export default class Create extends Component {
    constructor(props) {
        super(props);
        // this.onChangeFirstName = this.onChangeFirstName.bind(this);
        // this.onChangeLastName = this.onChangeLastName.bind(this);
        // this.onChangeEmail = this.onChangeEmail.bind(this);
        // this.onChangeContactNumber = this.onChangeContactNumber.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            FirstName: '',
            LastName: '',
            Email:'',
            ContactNumber: ''
        }
    }

    // onChangeFirstName(e) {
    //     debugger
    //     this.setState({
    //         FirstName: e.target.value
    //     });
    //   }
    //   onChangeLastName(e) {
    //     this.setState({
    //         LastName: e.target.value
    //     })  
    //   }
    //   onChangeEmail(e) {
    //     this.setState({
    //         Email: e.target.value
    //     })
    //   }
    //   onChangeContactNumber(e) {
    //     this.setState({
    //         ContactNumber: e.target.value
    //     })
    //   }
    
      onSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:4500/users', this.state)
            .then(res => 
                console.log('Add New Employee successfully'),
                // toastr.success('Add New Employee successfully'),
                );
        
        this.setState({
            FirstName: '',
            LastName: '',
            Email: '',
            ContactNumber: ''
        })
        this.props.history.push('/demo');
       }

       previousPath() {
        let path = '/demo';
        this.props.history.push(path);
      }

    render(props) {
        return (
            <div style={{marginTop: 10}}>
                <h3>Add New Employee</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>FirstName:  </label>
                        <input type="text"  value={this.state.FirstName} onChange={e => this.setState({FirstName: e.target.value})} name="FirstName" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>LastName: </label>
                        <input type="text" value={this.state.LastName} onChange={e => this.setState({LastName: e.target.value})} name="LastName" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>Email: </label>
                        <input type="text" value={this.state.Email} onChange={e => this.setState({Email: e.target.value})} name="Email" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label>ContactNumber: </label>
                        <input type="text" value={this.state.ContactNumber} onChange={e => this.setState({ContactNumber: e.target.value})} name="ContactNumber" className="form-control"/>
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Register Employee" className="btn btn-primary"/>
                    </div>
                    <button onClick={this.previousPath.bind(this)}>Previous</button>
                </form>
            </div>
        )
    }
}
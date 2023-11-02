import React, { Component } from 'react';
import axios from 'axios';

export default class Edit extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
    
        this.state = {
            FirstName: '',
            LastName: '',
            Email:'',
            ContactNumber: ''
        }
    }

    componentDidMount() {
        axios.get('http://localhost:4500/users/'+this.props.match.params.id)
            .then(response => {
                console.log('data', response);
                this.setState({ 
                    FirstName: response.data.FirstName, 
                    LastName:response.data.LastName,
                    Email: response.data.Email,
                    ContactNumber: response.data.ContactNumber,
                 });
            })
            .catch(function (error) {
                console.log(error);
            })
      }

      onSubmit(e) {
        e.preventDefault();
        axios.put('http://localhost:4500/users/'+this.props.match.params.id, this.state)
            .then((res) =>{
                console.log('Employee Updated Successfully')
                this.props.history.push('/demo');
        });
      }

    render() {
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
                    <input type="submit" value="Update" className="btn btn-primary"/>
                </div>
            </form>
        </div>
        )
    }
}
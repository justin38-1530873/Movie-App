import React, { Component } from 'react';
import './style.css';

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      'email': undefined,
      'password': undefined,
      'handle': undefined,
    };
  }

  handleChange(event) {
    let field = event.target.name;
    let value = event.target.value; 

    let changes = {}; 
    changes[field] = value;
    this.setState(changes); 
  }

  handleSignUp(event) {
    event.preventDefault(); 
    this.props.signUpCall(this.state.email, this.state.password, this.state.handle);
    this.props.history.push('/');
  }

  handleSignIn(event) {
    event.preventDefault(); 
    this.props.signInCall(this.state.email, this.state.password);
    this.props.history.push('/');
  }

  render() {
    return (
      <form className='signUp'>
        <h1>CUSTOMER LOGIN</h1>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input className="form-control"
            id="email"
            type="email"
            name="email"
            onChange={(e) => this.handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input className="form-control"
            id="password"
            type="password"
            name="password"
            onChange={(e) => this.handleChange(e)}
          />
        </div>

        <div className="form-group">
          <label htmlFor="handle">Nick Name</label>
          <input className="form-control"
            id="handle"
            name="handle"
            onChange={(e) => this.handleChange(e)}
          />
        </div>


        <div className="form-group">
          <div className="button">
          <button className="btn btn-default mr-2"
            onClick={(e) => this.handleSignUp(e)}
          >
            Sign-up
            </button>
          <button className="btn btn-default"
            onClick={(e) => this.handleSignIn(e)}
          >
            Sign-in
            </button>
          </div>
        </div>
      </form>
    )
  }
}

export default SignUp

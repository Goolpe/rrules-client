import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { loginUser } from '../actions/authActions';
import classnames from 'classnames';

class LoginPage extends Component{
  constructor(props){ 
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {}
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e){
    this.setState({ 
      [e.target.name]: e.target.value,
      errors: {} 
    })
  }

  handleSubmit(e){ 
    e.preventDefault();
    const user = {
        email: this.state.email,
        password: this.state.password,
    }
    this.props.loginUser(user);
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated) {
        this.props.history.push('/')
    }
    if(nextProps.errors) {
        this.setState({
            errors: nextProps.errors
        });
    }
  }

  render(){	
      const {errors} = this.state;
      return (
          <div className="mt-3 mb-3">
            <form onSubmit={this.handleSubmit} style={{maxWidth:"400px", margin: "auto"}}>
              <InputGroup className="mt-3 mb-3">
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <input type="email" value={this.state.email} onChange={this.handleChange} name="email" className={classnames('form-control', {
                        'is-invalid': errors.email
                    })} placeholder="E-mail" required/>
                {errors.email && (<div className="invalid-feedback">{errors.email}</div>)}
              </InputGroup>
              <InputGroup className="mt-3 mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <div className="fas fa-key"></div>
                  </InputGroupText>
                </InputGroupAddon>
                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className={classnames('form-control', {
                        'is-invalid': errors.password
                    })} placeholder="Пароль" required/>
                {errors.password && (<div className="invalid-feedback">{errors.password}</div>)}
              </InputGroup>
              <button className="btn btn-info  mt-3 w-100 p-3" type="submit" >Войти</button>
            </form> 

           {this.state.redirect && <Redirect to={`/@${this.state.name}`}/>}  
          </div>
    );
  }
}

LoginPage.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, { loginUser })(withRouter(LoginPage));


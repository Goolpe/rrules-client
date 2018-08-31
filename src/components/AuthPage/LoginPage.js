import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import { loginUser } from '../actions/authActions';

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
    this.setState({ [e.target.name]: e.target.value})
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
     if(this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
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
      return (
          <div className="mt-3">
            <button className="btn btn-dark m-2"> <i className="fab fa-vk"></i></button>
            <button className="btn btn-dark m-2 pr-3 pl-3"> <i className="fab fa-facebook-f"> </i></button>  
            <button className="btn btn-dark m-2"> <i className="fab fa-google"> </i></button> 
            <p className="mt-3 mb-4" style={{borderBottom: "1px solid #ebeced", lineHeight: "0.1em"}}><span style={{background: "#fff", padding: "0 10px"}}>или</span></p>
            <form onSubmit={this.handleSubmit} style={{maxWidth:"400px", margin: "auto"}}>
              <InputGroup className="mt-3 mb-3">
                <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                <input type="email" value={this.state.email} onChange={this.handleChange} name="email" className="form-control" placeholder="E-mail" required/>
              </InputGroup>
              <InputGroup className="mt-3 mb-3">
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <div className="fas fa-key"></div>
                  </InputGroupText>
                </InputGroupAddon>
                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" placeholder="Пароль" required/>
              </InputGroup>
              <p className="text-dark m-auto" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: '3'})}>Не могу войти</p>
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


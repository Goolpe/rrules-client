import React, {Component} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import classnames from 'classnames';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { FaVk, FaFacebookF, FaGoogle } from "react-icons/fa";

class AuthPage extends Component{
  constructor(props){ 
    super(props);
    this.state = {
      logemail: '',
      activeTab: 'login'
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }

  componentDidMount() {
    window.scrollTo(0,0);
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
  }
  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render(){	
      return ( <div>     
		  <section id="login" className="pt-5">
        <div className="container" >
        <div className="container shadow bg-white pt-5 pb-5 text-center" style={{maxWidth: "400px"}}>
          <a href='https://randomrulesdb.herokuapp.com/auth/vkontakte' className="btn btn-dark m-2"> <FaVk /></a>
          <a href='https://randomrulesdb.herokuapp.com/auth/facebook' className="btn btn-dark m-2 pr-3 pl-3"> <FaFacebookF /></a>  
          <a href='https://randomrulesdb.herokuapp.com/auth/google' className="btn btn-dark m-2"> <FaGoogle /></a> 
          <p className="mt-3 mb-4" style={{borderBottom: "1px solid #ebeced", lineHeight: "0.1em"}}><span style={{background: "#fff", padding: "0 10px"}}>или</span></p>
           <Nav tabs style={{cursor: "pointer"}} className="justify-content-center">
            <NavItem>
              <NavLink
                className={"text-dark " + classnames({ active: this.state.activeTab === 'login' })}
                onClick={() => { this.toggle('login'); }}
              >
                ВХОД
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                className={"text-dark " + classnames({ active: this.state.activeTab === 'register' })}
                onClick={() => { this.toggle('register'); }}
              >
                РЕГИСТРАЦИЯ
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="login">
              <Row>
                <Col sm="12">
                  <LoginPage />
                  <p className="text-dark m-auto" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: 'forgot'})}>Не могу войти</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="register">
              <Row>
                <Col sm="12">
                  <RegisterPage />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="forgot">
              <Row>
                <Col sm="12">
                  <div>
                    <form>
                      <p className="mt-3">Восстановление аккаунта</p>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <input type="email" value={this.state.logemail} onChange={this.handleChange} name="logemail" className="form-control" placeholder="E-mail" required/>
                     </InputGroup>
                      <button type="submit" onClick={this.checkLetters} className="btn btn-info w-100 p-3">Восстановить пароль</button>
                    </form> 
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
        </div>
      </section>
      </div>
    );
  }
}

AuthPage.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, {})(withRouter(AuthPage));


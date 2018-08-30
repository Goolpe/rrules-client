import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createAccount, authAccount } from '../actions/authActions';
import moment from 'moment';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import classnames from 'classnames';

class AuthPage extends Component{
  constructor(props){ 
    super(props);
    this.state = {
      loginForm: true,
      regForm: false,
      dateReg: moment(new Date()).format('YYYYMMDD'),
      username:'',
      email: '',
      password: '',
      passwordConf: '',
      logemail: '',
      logpassword: '',
      redirect: false,
      profileId: '',
      isAuthenticated: false,
      activeTab: '1'
    };
    this.onChange = this.onChange.bind(this);
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  onChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }

  handleRegistration(event){
    event.preventDefault();
    if(this.state.password === this.state.passwordConf){
      const account = {
          "dateReg": this.state.dateReg,
          "username": this.state.username,
          "email": this.state.email,
          "password": this.state.password
           }
      // this.props.createAccount(account)
      fetch('https://localhost:8080/signup', { 
         method: 'post', 
         headers: new Headers({
           'Authorization': 'Basic '+btoa('username:password'), 
           'Content-Type': 'application/x-www-form-urlencoded'
         }), 
         body: 'A=1&B=2'
       }).then(response=> console.log(response))

      this.setState({
        activeTab: '1',
        username:'',
        email: '',
        password: '',
        passwordConf: '' })}
      else{
        alert("Пароли не совпадают")
      }
  }

  handleAuth(event){ 
    event.preventDefault();

    const account = {
        "logemail": this.state.logemail,
        "logpassword": this.state.logpassword
         }

    this.props.authAccount(account)

    this.setState({
      isAuthenticated: true, 
      logemail: '',
      logpassword: '',
      redirect: true })
  }

  componentDidMount() {
    window.scrollTo(0,0);
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
		  <section id="login" style={{minHeight:"100vh"}} className="pt-5">
        <div className="container" >
        <div className="container shadow-lg bg-white pt-5 pb-5 text-center" style={{maxWidth: "400px"}}>
           <Nav tabs style={{cursor: "pointer"}} className="justify-content-center">
            <NavItem>
              <NavLink
                className={classnames({ active: this.state.activeTab === '1' })}
                onClick={() => { this.toggle('1'); }}
              >
                ВХОД
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink 
                className={classnames({ active: this.state.activeTab === '2' })}
                onClick={() => { this.toggle('2'); }}
              >
                РЕГИСТРАЦИЯ
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <Row>
                <Col sm="12">
                  <div className="mt-3">
                    <button className="btn btn-dark m-2"> <i className="fab fa-vk"></i></button>
                    <button className="btn btn-dark m-2 pr-3 pl-3"> <i className="fab fa-facebook-f"> </i></button>  
                    <button className="btn btn-dark m-2"> <i className="fab fa-google"> </i></button> 
                    <p className="mt-3 mb-4" style={{borderBottom: "1px solid #ebeced", lineHeight: "0.1em"}}><span style={{background: "#fff", padding: "0 10px"}}>или</span></p>
                    <form onSubmit={this.handleAuth} style={{maxWidth:"400px", margin: "auto"}}>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <input type="email" value={this.state.logemail} onChange={this.handleChange} name="logemail" className="form-control" placeholder="E-mail" required/>
                      </InputGroup>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <div className="fas fa-key"></div>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" value={this.state.logpassword} onChange={this.handleChange} name="logpassword" className="form-control" placeholder="Пароль" required/>
                      </InputGroup>
                      <p className="text-dark m-auto" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: '3'})}>Не могу войти</p>
                      <button className="btn btn-info  mt-3 w-100 p-3" type="submit" >Войти</button>
                    </form> 

                   {this.state.redirect && <Redirect to={`/@${this.state.username}`}/>}  
                  </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <div className="mt-3">
                    <button className="btn btn-dark m-2"> <i className="fab fa-vk"></i></button>
                    <button className="btn btn-dark m-2 pr-3 pl-3"> <i className="fab fa-facebook-f"> </i></button>  
                    <button className="btn btn-dark m-2"> <i className="fab fa-google"> </i></button> 
                    <p className="mt-3 mb-4" style={{borderBottom: "1px solid #ebeced", lineHeight: "0.1em"}}><span style={{background: "#fff", padding: "0 10px"}}>или</span></p>
                    <form onSubmit={this.handleRegistration} >
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" className="form-control" placeholder="E-mail" required/>
                     </InputGroup>
                     <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <div className="fab fa-slideshare"></div>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="text" value={this.state.username} onChange={this.handleChange} name="username" className="form-control" placeholder="Никнейм" required/>
                      </InputGroup>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <div className="fas fa-key"></div>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" placeholder="Пароль" required/>
                      </InputGroup>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <div className="fas fa-key"></div>
                          </InputGroupText>
                        </InputGroupAddon>
                        <input type="password" value={this.state.passwordConf} onChange={this.handleChange} name="passwordConf" className="form-control" placeholder="Повторите пароль" required/>
                      </InputGroup>
                      <div className="mb-3 custom-control custom-checkbox my-1 mr-sm-2">
                        <input type="checkbox" className="custom-control-input" id="customControlInline" required/>
                        <label style={{fontSize: "14px"}} className="custom-control-label" htmlFor="customControlInline">Я принимаю <Link to="/agreement" className="btn-link">пользовательскоe соглашениe</Link></label>
                      </div>
                      <button type="submit" onClick={this.checkLetters} className="btn btn-info w-100 p-3">Зарегистрироваться</button>
                      
                    </form> 
                    </div>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row>
                <Col sm="12">
                  <div>
                    <form>
                      <p className="mt-3">Восстановление аккаунта</p>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <input type="email" value={this.state.email} onChange={this.handleChange} name="email" className="form-control" placeholder="E-mail" required/>
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
  createAccount: PropTypes.func.isRequired,
  authAccount: PropTypes.func.isRequired
};

export default connect(null, { createAccount, authAccount })(AuthPage);


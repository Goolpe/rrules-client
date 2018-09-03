import React, {Component} from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col, InputGroup, InputGroupAddon } from 'reactstrap';
import classnames from 'classnames';
import LoginPage from './LoginPage';
import RegisterPage from './RegisterPage';

class AuthPage extends Component{
  constructor(props){ 
    super(props);
    this.state = {
      logemail: '',
      activeTab: '1'
    };
    this.toggle = this.toggle.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value})
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
                  <LoginPage />
                  <p className="text-dark m-auto" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: '3'})}>Не могу войти</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="2">
              <Row>
                <Col sm="12">
                  <RegisterPage />
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

export default AuthPage;


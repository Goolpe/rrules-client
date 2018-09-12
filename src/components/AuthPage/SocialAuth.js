import React, {Component} from 'react';
import { TabContent, TabPane, Row, Col, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import classnames from 'classnames';
import LoginPage from './LoginPage';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { registerUser } from '../actions/authActions';

class SocialAuth extends Component{
  constructor(props){ 
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
      errors: {},
      activeTab: 'soclogin'
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0,0);
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
  }
  handleChange(e){
    this.setState({ 
      [e.target.name]: e.target.value,
      errors: {} 
    })
  }

  handleSubmit(e) {
      e.preventDefault();

      const user = {
          name: this.state.name,
          email: this.state.email,
          password: this.state.password,
          password_confirm: this.state.password_confirm
      }
      this.props.registerUser(user, this.props.history);
  }
  render(){ 
    const { errors } = this.state;
      return ( 
        <section id="SocialAuth" style={{minHeight:"100vh"}} className="pt-5">
          <div className="container" >
        <div className="container shadow-lg bg-white pt-5 pb-5 text-center" style={{maxWidth: "400px"}}>
          {this.props.match.params.id === "vk" && <i className="fab fa-vk fa-2x" ></i>}
          {this.props.match.params.id === "google" && <i className="fab fa-google fa-2x" ></i>}
          {this.props.match.params.id === "facebook" && <i className="fab fa-facebook-f fa-2x" ></i>}
         <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="soclogin">
              <Row>
                <Col sm="12">
                  <p>Придумайте никнейм</p>
                  <form onSubmit={this.handleSubmit} style={{maxWidth:"400px", margin: "auto"}}>
                    <InputGroup className="mt-3 mb-3">
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <div className="fab fa-slideshare"></div>
                        </InputGroupText>
                      </InputGroupAddon>
                      <input type="text" value={this.state.name} className={classnames('form-control', {'is-invalid': errors.name})} onChange={this.handleChange} name="name" placeholder="Никнейм" required/>
                      {errors.name && (<div className="invalid-feedback">{errors.name}</div>)}
                    </InputGroup>
                    <button className="btn btn-info mt-3 mb-3 w-100 p-3" type="submit">Создать аккаунт</button>
                  </form> 
                  <p className="text-dark m-auto" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: 'login'})}>Уже есть аккаунт</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="login">
              <Row>
                <Col sm="12">
                  <p>Войдите в аккаунт</p>
                  <LoginPage />
                  <p className="text-muted m-auto" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: 'forgot'})}>Не могу войти</p>
                  <p className="text-dark m-auto pt-3" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: 'soclogin'})}>Нет аккаунта</p>
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="forgot">
              <Row>
                <Col sm="12">
                  <div>
                    <form>
                      <p>Восстановление аккаунта</p>
                      <InputGroup className="mt-3 mb-3">
                        <InputGroupAddon addonType="prepend">@</InputGroupAddon>
                        <input type="email" value={this.state.logemail} onChange={this.handleChange} name="logemail" className="form-control" placeholder="E-mail" required/>
                     </InputGroup>
                      <button type="submit" onClick={this.checkLetters} className="btn btn-info w-100 p-3">Восстановить пароль</button>
                    </form> 
                    <p className="text-dark m-auto pt-3" style={{cursor: "pointer"}} onClick={()=> this.setState({activeTab: 'login'})}>Вспомнил пароль</p>
                  </div>
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </div>
        </div>
      </section>
    )
  }
}

SocialAuth.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors
})

export  default connect(mapStateToProps, {registerUser})(withRouter(SocialAuth));


import React, {Component} from 'react';
import { Redirect } from 'react-router';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createAccount, authAccount } from '../actions/authActions';
import moment from 'moment';

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
      isAuthenticated: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    this.handleAuth = this.handleAuth.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }

  handleRegistration(event){
    event.preventDefault();
    const account = {
        "dateReg": this.state.dateReg,
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "passwordConf" : this.state.passwordConf
         }
    this.props.createAccount(account)
    this.setState({
      regForm: false,
      username:'',
      email: '',
      password: '',
      passwordConf: '' })
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
      redirect: true,
      logemail: '',
      logpassword: '' })
  }

  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
      return ( <div>     
		  <section id="login" style={{minHeight:"100vh"}}>
        <div className="container pt-5 pb-5 text-center" >
        {this.state.regForm ?

          <div>
            <h1 className="mb-5">РЕГИСТРАЦИЯ</h1>
            <form onSubmit={this.handleRegistration}  style={{maxWidth:"400px", margin: "auto"}}>
             <div className="form-group">
                <label >Username</label>
                <input type="text" value={this.state.username} onChange={this.handleChange} name="username" className="form-control" placeholder="Введите ник" required/>
              </div>
              <div className="form-group">
                <label >Email</label>
                <input type="email" value={this.state.email} onChange={this.handleChange} name="email" className="form-control" placeholder="Введите email" required/>
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" placeholder="Придумайте надежный пароль" required/>
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input type="password" value={this.state.passwordConf} onChange={this.handleChange} name="passwordConf" className="form-control" placeholder="Повторите пароль" required/>
              </div>
              <button type="submit" onClick={this.checkLetters} className="btn btn-info w-100 p-3">Зарегистрироваться</button>
              
            </form>    
            <p className="mt-3 w-100">Нажимая на кнопку "Зарегистрироваться", Вы подтверждаете, что прочитали и приняли условия игры.</p>
            <button onClick={()=> {this.setState({regForm: false})}} className="btn bg-transparent text-info m-auto mt-5">Войти в аккаунт</button>
          </div>

          :

          <div>
          { this.state.loginForm ?

            <div>
              <h1 className="mb-5">ВХОД</h1>
            <form onSubmit={this.handleAuth} style={{maxWidth:"400px", margin: "auto"}}>
              <div className="form-group text-left">
                <label>Email</label>
                <input type="email" value={this.state.logemail} onChange={this.handleChange} name="logemail" className="form-control" placeholder="Введите email" required/>
              </div>
              <div className="form-group text-left">
                <label>Пароль</label>
                <input type="password" value={this.state.logpassword} onChange={this.handleChange} name="logpassword" className="form-control" placeholder="Пароль для входа" required/>
              </div>
              <button className="btn btn-info w-100 p-3" type="submit" >Войти</button>
            </form>  
             {this.state.redirect && <Redirect to={`/@${this.state.username}`}/>}  

            <button onClick={()=> {this.setState({regForm: true, loginForm: true})}} className="btn bg-transparent text-info m-auto mt-5">Зарегистрироваться</button><br/>
            <button className="btn bg-transparent text-info m-auto" onClick={()=> this.setState({loginForm: false})}>Не могу войти</button>
            </div>
            :
            <div>
              <h1 className="text-center mb-5">ОТПРАВИТЬ ДАННЫЕ ДЛЯ ВХОДА</h1>
              <form style={{maxWidth:"400px", margin: "auto"}}>
                <div className="form-group">
                  <label className="text-left"  name="logemail">Email</label>
                  <input type="email" value={this.state.logemail} onChange={this.handleChange} className="form-control" placeholder="Введите email" required/>
                </div>
                <button type="submit" className="btn btn-info w-100 p-3">Отправить</button>
              </form>   
              <button className="btn bg-transparent text-info m-auto mt-5" onClick={()=> this.setState({loginForm: true})} >Вернуться на страницу входа</button><br />
              <button onClick={()=> {this.setState({regForm: true, loginForm: true})}} className="btn bg-transparent text-info m-auto">Зарегистрироваться</button>
            </div>
          }
          </div>
           }
          <p className="w-50 mx-auto mt-4 mb-4" style={{ borderBottom: '1px solid #dddede', lineHeight: '0.1em'}}><span style={{color:'#6c757d', background:'#f4f4f4'}}>или</span></p> 
          <div className="row m-auto w-50 justify-content-center">
            <i className="fab fa-vk fa-2x mr-3 ml-3 text-muted"></i>
            <i className="fab fa-facebook fa-2x mr-3 ml-3 text-muted"></i>
            <i className="fab fa-google fa-2x mr-3 ml-3 text-muted"></i>
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


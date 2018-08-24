import React, {Component} from 'react';
import {
  withRouter
} from 'react-router-dom';

const accounts = [
  {
    id: 1,
    name: "goolpe",
    email: "gooolpe@gmail.com",
    password: "12345"
  },
  {
    id: 133,
    name: "goolpe2",
    email: "gooolpe2@gmail.com",
    password: "123453"
  }
]
class AuthPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loginForm: true,
      regForm: false,
      username:'',
      email: '',
      password: '',
      passwordConf: '',
      nameId: false
    };
    this.handleName = this.handleName.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handlePassConf = this.handlePassConf.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleName(event){
    this.setState({
      username: event.target.value
    })
  }
  handleEmail(event){
    this.setState({
      email: event.target.value
    })
  }
  handlePass(event){
    this.setState({
      password: event.target.value
    })
  }
  handlePassConf(event){
    this.setState({
      passwordConf: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    fetch('//localhost:8080/users',{
     method: 'post',
     headers: {'Content-Type':'application/json'},
     body: {
      "username": this.state.username,
      "email": this.state.email,
      "password": this.state.password,
      "passwordConf": this.state.passwordConf
     }})
    }

  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
    const AuthButton = withRouter(
      ({ history }) =>

        this.props.auth ? (
            <button className="btn btn-info w-100 p-3" onClick={() => {this.props.signout(() => history.push("/auth"));}}>Выйти</button>
        ) : (
          <button className="btn btn-info w-100 p-3" onClick={() => {this.props.authenticate(() => history.push("/id"))}}>Войти</button>
        )
    );
      return (      
		  <section id="login" style={{height:"100vh"}}>
        <div className="container pt-5 pb-5 text-center" >
        {this.state.regForm ?

          <div>
            <h1 className="text-center mb-5">РЕГИСТРАЦИЯ</h1>
            <form style={{maxWidth:"400px", margin: "auto"}}>
             <div className="form-group">
                <label >Username</label>
                <input type="text" value={this.state.username} onChange={this.handleName} className="form-control" id="InputUsername" aria-describedby="emailHelp" placeholder="Введите ник" required/>
              </div>
              <div className="form-group">
                <label >Email</label>
                <input type="email" value={this.state.email} onChange={this.handleEmail} className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Введите email" required/>
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input type="password" value={this.state.password} onChange={this.handlePass} className="form-control" id="InputPassword1" placeholder="Придумайте надежный пароль" required/>
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input type="password" value={this.state.passwordConf} onChange={this.handlePassConf} className="form-control" id="InputPassword2" placeholder="Повторите пароль" required/>
              </div>
              <div className="form-group form-check">
                <input type="checkbox" className="form-check-input" id="Check1" required/>
                <label className="form-check-label" htmlFor="Check1">Прочитал условия, блаблабла</label>
              </div>
              <button type="submit" className="btn btn-info w-100 p-3">Зарегистрироваться</button>
            </form>    
            <button  className="btn btn-link nav-link w-100">Войти в аккаунт</button>
          </div>
// onClick={()=> {this.setState({regForm: false})}}
          :

          <div>
          { this.state.loginForm ?

            <div>
              <h1 className="mb-5">ВХОД</h1>
            <form onSubmit={this.handleSubmit} style={{maxWidth:"400px", margin: "auto"}}>
              <div className="form-group text-left">
                <label>Email</label>
                <input type="email" value={this.state.email} onChange={this.handleEmail} className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Введите email" required/>
              </div>
              <div className="form-group text-left">
                <label>Пароль</label>
                <input type="password" value={this.state.password} onChange={this.handlePass} className="form-control" id="InputPassword1" placeholder="Пароль для входа" required/>
              </div>
              <AuthButton type="submit" />
            </form>    
            <button onClick={()=> {this.setState({regForm: true, loginForm: true})}} className="btn btn-link nav-link w-100">Зарегистрироваться</button>
            <button className="btn btn-link nav-link w-100" onClick={()=> this.setState({loginForm: false})}>Не могу войти</button>
            </div>
            :
            <div>
              <h1 className="text-center mb-5">ОТПРАВИТЬ ДАННЫЕ ДЛЯ ВХОДА</h1>
              <form style={{maxWidth:"400px", margin: "auto"}}>
                <div className="form-group">
                  <label className="text-left" value={this.state.email} onChange={this.handleEmail}>Email</label>
                  <input type="email" className="form-control" id="InputEmail1" aria-describedby="emailHelp" placeholder="Введите email" required/>
                </div>
                <button type="submit" className="btn btn-info w-100 p-3">Отправить</button>
              </form>   
              <button className="btn btn-link nav-link w-100" onClick={()=> this.setState({loginForm: true})} >Вернуться на страницу входа</button> 
               <button onClick={()=> {this.setState({regForm: true, loginForm: true})}} className="btn btn-link nav-link w-100">Зарегистрироваться</button>
            </div>
          }
          </div>
           }
        </div>
      </section>
    );
  }
}

export default AuthPage;


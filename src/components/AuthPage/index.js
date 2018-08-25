import React, {Component} from 'react';

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
      logemail: '',
      logpassword: '',
      nameId: false,
      redirect: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleRegistration = this.handleRegistration.bind(this);
    // this.handleAuth = this.handleAuth.bind(this);
  }
  handleChange(e){
    this.setState({ [e.target.name]: e.target.value})
  }

  handleRegistration(event){
    event.preventDefault();
    fetch('https://randomrulesdb.herokuapp.com/users',{
      method: 'post',
      headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
      body: JSON.stringify({
        "username": this.state.username,
        "email": this.state.email,
        "password": this.state.password,
        "passwordConf" : this.state.passwordConf
       })})
  }

  // handleAuth(event){
  //   event.preventDefault();
  //   fetch('//localhost:8080/users',{
  //    method: 'post',
  //    headers: {
  //           'Accept': 'application/json, text/plain, */*',
  //           'Content-Type': 'application/json'
  //         },
  //    body: JSON.stringify({
  //     "logemail": this.state.logemail,
  //     "logpassword": this.state.logpassword
  //    })}).then(res => console.log(res))
  // }
  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){	
      return (      
		  <section id="login" style={{minHeight:"100vh"}}>
        <div className="container pt-5 pb-5 text-center" >
        {this.state.regForm ?

          <div>
            <h1 className="mb-5">РЕГИСТРАЦИЯ</h1>
            <form onSubmit={this.handleRegistration} style={{maxWidth:"400px", margin: "auto"}}>
             <div className="form-group">
                <label >Username</label>
                <input type="text" value={this.state.username} onChange={this.handleChange} name="username" className="form-control" aria-describedby="emailHelp" placeholder="Введите ник" required/>
              </div>
              <div className="form-group">
                <label >Email</label>
                <input type="email" value={this.state.email} onChange={this.handleChange} name="email" className="form-control" aria-describedby="emailHelp" placeholder="Введите email" required/>
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input type="password" value={this.state.password} onChange={this.handleChange} name="password" className="form-control" placeholder="Придумайте надежный пароль" required/>
              </div>
              <div className="form-group">
                <label>Пароль</label>
                <input type="password" value={this.state.passwordConf} onChange={this.handleChange} name="passwordConf" className="form-control" placeholder="Повторите пароль" required/>
              </div>
              <button type="submit" className="btn btn-info w-100 p-3">Зарегистрироваться</button>
              
            </form>    
            <p className="mt-2 w-100">Нажимая на кнопку "Зарегистрироваться", Вы подтверждаете, что прочитали и приняли условия игры.</p>
            <button onClick={()=> {this.setState({regForm: false})}} className="btn btn-link nav-link m-auto mt-5">Войти в аккаунт</button>
          </div>
// onClick={() => {this.props.authenticate()}}
          :

          <div>
          { this.state.loginForm ?

            <div>
              <h1 className="mb-5">ВХОД</h1>
            <form onSubmit={this.handleAuth} style={{maxWidth:"400px", margin: "auto"}}>
              <div className="form-group text-left">
                <label>Email</label>
                <input type="email" value={this.state.logemail} onChange={this.handleChange} name="logemail" className="form-control" aria-describedby="emailHelp" placeholder="Введите email" required/>
              </div>
              <div className="form-group text-left">
                <label>Пароль</label>
                <input type="password" value={this.state.logpassword} onChange={this.handleChange} name="logpassword" className="form-control" placeholder="Пароль для входа" required/>
              </div>
              <button className="btn btn-info w-100 p-3" type="submit" >Войти</button>
            </form>    
            <button onClick={()=> {this.setState({regForm: true, loginForm: true})}} className="btn btn-link nav-link m-auto mt-5">Зарегистрироваться</button>
            <button className="btn btn-link nav-link m-auto" onClick={()=> this.setState({loginForm: false})}>Не могу войти</button>
            </div>
            :
            <div>
              <h1 className="text-center mb-5">ОТПРАВИТЬ ДАННЫЕ ДЛЯ ВХОДА</h1>
              <form style={{maxWidth:"400px", margin: "auto"}}>
                <div className="form-group">
                  <label className="text-left" value={this.state.logemail} onChange={this.handleChange} name="logemail">Email</label>
                  <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Введите email" required/>
                </div>
                <button type="submit" className="btn btn-info w-100 p-3">Отправить</button>
              </form>   
              <button className="btn btn-link nav-link m-auto mt-5" onClick={()=> this.setState({loginForm: true})} >Вернуться на страницу входа</button> 
              <button onClick={()=> {this.setState({regForm: true, loginForm: true})}} className="btn btn-link nav-link m-auto">Зарегистрироваться</button>
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


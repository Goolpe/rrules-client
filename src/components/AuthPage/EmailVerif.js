import React, {Component} from 'react';
import classnames from 'classnames';

class EmailVerif extends Component{

  componentDidMount() {
    window.scrollTo(0,0);
  }
  render(){ 
      return ( 
      <section id="emailVerification" style={{minHeight:"500px"}} className="d-flex align-items-center justify-content-center">
            <div className="container shadow-lg bg-white pt-5 pb-5 text-center" style={{maxWidth: "700px"}}>
              <p>Мы выслали ссылку на Вашу почту. Если её нет, проверьте в папке "спам".</p>
            </div>
      </section>
    )
  }
}

export default EmailVerif;


import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

class EmailVerif extends Component{

  componentDidMount() {
    window.scrollTo(0,0);
    if(this.props.auth.isAuthenticated) {
        this.props.history.push('/');
    }
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

EmailVerif.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export  default connect(mapStateToProps, {})(withRouter(EmailVerif));


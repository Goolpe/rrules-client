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
        <main className="d-flex align-items-center">
          <div className="container shadow bg_card text_card pt-5 pb-5 text-center">
            <p>Мы выслали ссылку на Вашу почту. Если её нет, проверьте в папке "спам".</p>
          </div>
        </main>
    )
  }
}

EmailVerif.propTypes = {
    auth: PropTypes.object
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export  default connect(mapStateToProps, {})(withRouter(EmailVerif));


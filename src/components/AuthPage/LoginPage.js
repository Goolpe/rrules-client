import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import classnames from 'classnames';
import { FaKey } from 'react-icons/fa';
import { loginUser } from '../actions/authActions';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.errors !== this.props.errors) {
      this.setState({
        errors: this.props.errors,
      });
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
      errors: {},
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
    };
    this.props.loginUser(user);
    if (this.props.loginUser(user)) {
      this.props.history.push('/');
    }
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit} style={ { maxWidth: '400px', margin: 'auto' } }>
        <InputGroup className='mt-3 mb-3'>
          <InputGroupAddon addonType='prepend'>@</InputGroupAddon>
          <input type='email'
            value={this.state.email}
            onChange={this.handleChange}
            name='email'
            className={ classnames('form-control', {
              'is-invalid': errors.email,
            }) }
            placeholder='E-mail'
            required
          />
          {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
        </InputGroup>
        <InputGroup className='mt-3 mb-3'>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <FaKey />
            </InputGroupText>
          </InputGroupAddon>
          <input type='password'
            value={this.state.password}
            onChange={this.handleChange}
            name='password'
            className={classnames('form-control', {
              'is-invalid': errors.password,
            })}
            placeholder='Пароль'
            required
          />
          {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
        </InputGroup>
        <button className='btn btn-info  mt-3 w-100 p-3' type='submit'>Войти</button>
      </form>
    );
  }
}

LoginPage.propTypes = {
  loginUser: PropTypes.func,
  auth: PropTypes.object,
  errors: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(withRouter(LoginPage));
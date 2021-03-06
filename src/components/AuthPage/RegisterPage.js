import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';
import classnames from 'classnames';
import { FaKey, FaSlideshare } from 'react-icons/fa';
import { registerUser } from '../actions/authActions';

class RegisterPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      password: '',
      password_confirm: '',
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
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password_confirm: this.state.password_confirm,
    };
    this.props.registerUser(user, this.props.history);
  }

  render() {
    const { errors } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <InputGroup className='mt-3 mb-3'>
          <InputGroupAddon addonType='prepend'>@</InputGroupAddon>
          <input type='email'
            value={this.state.email}
            className={classnames('form-control', {
              'is-invalid': errors.email,
            })} onChange={this.handleChange}
            name='email'
            placeholder='E-mail'
            required
          />
          {errors.email && (<div className='invalid-feedback'>{errors.email}</div>)}
       </InputGroup>
       <InputGroup className='mt-3 mb-3'>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <FaSlideshare />
            </InputGroupText>
          </InputGroupAddon>
          <input type='text'
            value={this.state.name}
            className={classnames('form-control', {
              'is-invalid': errors.name,
            })}
            onChange={this.handleChange}
            name='name'
            placeholder='Никнейм'
            required
          />
          {errors.name && (<div className='invalid-feedback'>{errors.name}</div>)}
        </InputGroup>
        <InputGroup className='mt-3 mb-3'>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <FaKey />
            </InputGroupText>
          </InputGroupAddon>
          <input type='password'
            value={this.state.password}
            className={classnames('form-control', {
              'is-invalid': errors.password,
            })}
            onChange={this.handleChange}
            name='password'
            placeholder='Пароль'
            required
          />
          {errors.password && (<div className='invalid-feedback'>{errors.password}</div>)}
        </InputGroup>
        <InputGroup className='mt-3 mb-3'>
          <InputGroupAddon addonType='prepend'>
            <InputGroupText>
              <FaKey />
            </InputGroupText>
          </InputGroupAddon>
          <input type='password'
            value={this.state.password_confirm}
            className={classnames('form-control', {
              'is-invalid': errors.password_confirm,
            })}
            onChange={this.handleChange}
            name='password_confirm'
            placeholder='Повторите пароль'
            required
          />
          {errors.password_confirm && (<div className='invalid-feedback'>{errors.password_confirm}</div>)}
        </InputGroup>
        <div className='mb-3 custom-control custom-checkbox my-1 mr-sm-2'>
          <input type='checkbox' className='custom-control-input' id='customControlInline' required/>
          <label style={ { fontSize: '14px' } }
            className='custom-control-label text-dark'
            htmlFor='customControlInline'>Я принимаю
            <Link to='/agreement' className='btn-link text-muted'>пользовательскоe соглашениe</Link>
          </label>
        </div>
        <button type='submit'
          onClick={this.checkLetters}
          className='btn btn-info w-100 p-3'>Зарегистрироваться
        </button>
      </form>
    );
  }
}

RegisterPage.propTypes = {
  registerUser: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(RegisterPage));
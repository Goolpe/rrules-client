import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { FaSpinner, FaStar, FaAngleLeft } from 'react-icons/fa';
import ReactPlayer from 'react-player';
import '../../styles/user.css';
import { fetchPerson } from '../actions/personActions';
import { logoutUser } from '../actions/authActions';

class UserPage extends Component {
  constructor(props) {
    super(props);
    this.onLogout = this.onLogout.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchPerson(this.props.match.params.nickname, this.props.history);
  }

  componentDidUpdate(prevProps) {
    if(this.props.match.params.nickname !== prevProps.match.params.nickname){
      this.props.fetchPerson(this.props.match.params.nickname, this.props.history);
    }
  }
  onLogout(e) {
    this.props.logoutUser(this.props.history);
  }

  render() {
    const person = this.props.person;
    return (
      <main>
        <section className='container'>
          {this.props.auth.user.name !== person.name && person.status === 'мастер' &&
          <Link to='/masters' className='btn p-0 text_card'>
            <FaAngleLeft size='1.5em'/> Все мастера 
          </Link>}
          <div className='shadow bg_card mt-3'>
            {person.bgphoto && <div className='w-100 position-relative border-bottom userpage__bg'
              style={ { backgroundImage: `url(${person.bgphoto})` } }
            >
              <figure className='position-absolute userpage__avatar' style={{bottom:'0',left:'0'}}>
                  <img width='100%' alt='user' src={person.photo}/>
              </figure>
            </div>}
            <ul className='p-4 text_card'>
              {!person.name && <FaSpinner />}
              {person.name && <h1>{person.name}</h1>}
              {person.status && 
              <li>
                <span className='text-muted'>Статус: </span>{person.status}
              </li>}
              {person.rating >= 0 &&
              <li>
                <span className='text-muted'>Рейтинг: </span>
                <FaStar className='text-warning' /> - {person.rating}/5
              </li>}
              {person.status === 'мастер' &&
              <li>
                <span className='text-muted'>Проведенных игр: </span>{person.gamesCount}
              </li>}
              {person.status === 'мастер' &&
              <li>
                <span className='text-muted'>Платные игры: </span>{person.paidGames ? 'водит' : 'не водит'}
              </li>}
              {person.date &&
              <li>
                <span className='text-muted'>Зарегистрирован: </span>
                {moment(person.date).startOf('hour').fromNow()}
              </li>}

              {(person.fullName || person.sex || person.dateBirth || person.cityLive) && <hr/>}

              {person.fullName &&
              <li>
                <span className='text-muted'>Имя: </span>{person.fullName}
              </li>}
              {person.sex &&
              <li>
                <span className='text-muted'>Пол: </span>{person.sex}
              </li>}
              {person.dateBirth &&
              <li>
                <span className='text-muted'>Возраст: </span>{moment().diff(person.dateBirth, 'years')} лет
              </li>}
              {person.cityLive &&
              <li>
                <span className='text-muted'>Город: </span>{person.cityLive}
              </li>}
              {person.discord &&
              <li>
                <span className='text-muted'>Discord: </span>{person.discord}
              </li>}
              {person.skype &&
              <li>
                <span className='text-muted'>Skype: </span>{person.skype}
              </li>}
              {person.otherContacts &&
              <li>
                <span className='text-muted'>Доп. контакты: </span>{person.otherContacts}
              </li>}

              {(person.about || person.systems || person.setting) && <hr/>}

              {person.about &&
              <li>
                <span className='text-muted'>О себе: </span>{person.about}
              </li>}
              {person.systems &&
              <li>
                <span className='text-muted'>Любимые системы: </span>{person.systems}
              </li>}
              {person.setting &&
              <li>
                <span className='text-muted'>Любимые сеттинги: </span>{person.setting}
              </li>}
              {person.leading &&
              <React.Fragment>
              <hr/>
              <li><span className='text-muted'>Примеры игр: </span></li>
              <div className='row mt-3'>
                {person.example1 && <div className='col-12 col-md-6 mb-3'>
                  <ReactPlayer url={person.example1} width='100%' height='300px' controls />
                </div>}
                {person.example2 && <div className='col-12 col-md-6 mb-3'>
                  <ReactPlayer url={person.example2} width='100%' height='300px' controls />
                </div>}
                {person.example3 && <div className='col-12 col-md-6 mb-3'>
                  <ReactPlayer url={person.example3} width='100%' height='300px' controls />
                </div>}
                {person.example4 && <div className='col-12 col-md-6 mb-3'>
                  <ReactPlayer url={person.example4} width='100%' height='300px' controls />
                </div>}
              </div>
              </React.Fragment>}
            </ul>
          </div>
        </section>
      </main>
    );
  }
}

UserPage.propTypes = {
  fetchPerson: PropTypes.func,
  person: PropTypes.object,
  logoutUser: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
  person: state.person.item,
});

export default connect(mapStateToProps, { fetchPerson, logoutUser })(UserPage);
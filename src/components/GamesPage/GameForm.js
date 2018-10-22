import React, { Component } from 'react';
import 'moment/locale/ru';
import MomentLocaleUtils, {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaAngleLeft } from 'react-icons/fa';
import { createGame } from '../actions/gameActions';

class GameForm extends Component {
  render() {
    const { from, to } = this.props;
    const modifiers = { start: from, end: to };
    return (
      <main id='createGame'>
        <section className='container text_card'>
          <ToastContainer
            position='top-center'
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnVisibilityChange
            draggable
            pauseOnHover
          />
          <form onSubmit={this.props.onSubmit}>
            <div className='row'>
              <div className='col-auto mr-auto p-0'>
                <p className='text_card pb-4'>
                  <Link to={`${this.props.id}`} className='p-0 btn text_card'>
                    <FaAngleLeft size='1.5em'/> Назад&nbsp;
                  </Link>
                </p>
              </div>
              <div className='col-auto p-0'>
                {this.props.deleteGameData &&
                  <button
                    onClick={this.props.deleteGameData}
                    className='btn btn-danger rounded-0 mb-2 mr-2'
                  >
                    Удалить
                  </button>
                }
                <button type='submit' className='btn btn-info rounded-0 mb-2'>Готово!</button>
              </div>
            </div>
{/*  Button to create game and exit  */}
            <div className='row p-3 align-items-begin bg_card shadow'>
              <div className='col-12'>
{/*  Name of the game  */}
                <label className='mr-2'>Название: </label>
                <input type='text'
                  value={this.props.nameGame}
                  maxLength='100'
                  className='w-100'
                  onChange={this.props.onChange}
                  name='nameGame'
                  placeholder=''
                  required
                />
                <br />
                {this.props.handleFromChange &&
                <React.Fragment>
  {/*  Date and time  */}
                  <label className='mr-2 mt-3'>Дата и время игры: </label>
                  <div className='text-dark'>
                    <DayPickerInput
                        value={from}
                        placeholder='Начало'
                        format='LLL'
                        formatDate={formatDate}
                        parseDate={parseDate}
                        dayPickerProps={ {
                          selectedDays: [from, { from, to }],
                          disabledDays: { before: new Date(), after: this.props.to },
                          toMonth: to,
                          modifiers,
                          locale: 'ru',
                          localeUtils: MomentLocaleUtils,
                          numberOfMonths: 1,
                          onDayClick: () => this.to.getInput().focus(),
                        } }
                        onDayChange={this.props.handleFromChange}
                      />{' '}
                      —{' '}
                        <DayPickerInput
                          ref={ (el) => { this.to = el } }
                          value={to}
                          placeholder='Конец'
                          format='LLL'
                          formatDate={formatDate}
                          parseDate={parseDate}
                          dayPickerProps={ {
                            selectedDays: [from, { from, to }],
                            disabledDays: { before: this.props.from || new Date() },
                            modifiers,
                            locale: 'ru',
                            localeUtils: MomentLocaleUtils,
                            month: from,
                            fromMonth: from,
                            numberOfMonths: 1,
                            onDayClick: () => this.to.getInput().focus(),
                          } }
                          onDayChange={this.props.handleToChange}
                        />
                  </div>
                </React.Fragment>
                }
  {/*  Number of seats  */}
                <label className='mr-2 mt-3'>Количество мест: </label>
                <input type='number'
                  min='1'
                  max='20'
                  value={this.props.placeAll}
                  onChange={this.props.onChange}
                  name='placeAll'
                  placeholder=''
                  required
                />
                <br />
  {/*  Type of the game  */}
                  <label className='mr-2 mt-3'>Тип игры: </label>
                <div className='custom-control custom-radio mb-2'>
                  <input type='radio'
                    className='custom-control-input'
                    value='sortByTypeOnline'
                    onChange={this.props.selectOption}
                    checked={this.props.selectedOption === 'sortByTypeOnline'}
                    id='radio1'
                  />
                  <label className='custom-control-label' htmlFor='radio1'>Online</label>
                </div>
                <div className='custom-control custom-radio mb-2'>
                  <input type='radio'
                    className='custom-control-input'
                    value='sortByTypeIRL'
                    onChange={this.props.selectOption}
                    checked={this.props.selectedOption === 'sortByTypeIRL'}
                    id='radio2'
                  />
                  <label className='custom-control-label' htmlFor='radio2'>IRL</label>
                </div>
                  {this.props.selectedOption === 'sortByTypeIRL' &&
                <div>
                  <label className='mr-2 mt-3'>Город: </label>
                  <input type='string'
                    value={this.props.cityGame}
                    style={ { width: '50%' } }
                    onChange={this.props.onChange}
                    name='cityGame'
                    placeholder=''
                  />
                  <br/>
                  <label className='mr-2 mt-3'>Место проведения: </label>
                  <input type='string'
                    value={this.props.placeGame}
                    style={ { width: '50%' } }
                    onChange={this.props.onChange}
                    name='placeGame'
                    placeholder=''
                  />
                </div>
                }
  {/*  Price  */}
                <div>
                  <label className='mr-2 mt-3'>Стоимость: </label>
                  <input type='number'
                    min='0'
                    max='10000'
                    value={this.props.priceGame}
                    onChange={this.props.onChange}
                    name='priceGame'
                    placeholder=''
                    required
                  />
                  <br />
                </div>
                <div>
                  <label className='mr-2 mt-3'>Превью: </label>
                  <input type='string'
                    value={this.props.preview}
                    className='w-100'
                    onChange={this.props.onChange}
                    name='preview'
                  />
                  <br />
                </div>
                <div>
                  <label className='mr-2 mt-3'>Ссылка на стрим: </label>
                  <input type='string'
                    value={this.props.videoLink}
                    className='w-100'
                    onChange={this.props.onChange}
                    name='videoLink'
                    placeholder='YouTube'
                  />
                  <br />
                </div>
  {/*  Additionally info  */}
                <label className='mr-2 mt-3'>Информация: </label>
                <textarea className='w-100'
                  maxLength='1000'
                  value={this.props.infoGame}
                  onChange={this.props.onChange}
                  name='infoGame'
                  placeholder=''
                />
              </div>
            </div>
          </form>
        </section>
      </main>
    );
  }
}

GameForm.propTypes = {
  createGame: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createGame })(withRouter(GameForm));
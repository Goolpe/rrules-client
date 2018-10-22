import React, { Component } from 'react';
import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { UncontrolledTooltip } from 'reactstrap';

class AgreementPage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <main>
        <div className='container'>
          <div className='d-flex justify-content-end w-100 pt-3 pb-3' >
            <Link className='userpage__facog mt-2 text_card'
              style={ { height: '1.5em' } }
              id='TooltipSetting'
              to='/auth'
            >
              <FaTimes size='1.5em'/>
            </Link>
            <UncontrolledTooltip className='mr-2' placement='left' target='TooltipSetting'>
              Авторизация
            </UncontrolledTooltip>
          </div>
          <div className='shadow bg_card text_card p-5 w-100 m-auto'>
            <h1>Пользовательское соглашение (далее соглашение)</h1>
            <hr />
            <p className='text-justify'>
            </p>
          </div>
        </div>
      </main>
    );
  }
}

export default AgreementPage;

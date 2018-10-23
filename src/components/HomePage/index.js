import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import '../../styles/home.css';
import { FiList, FiImage } from 'react-icons/fi';
import { FaGlobe } from 'react-icons/fa';
import { fetchArt } from '../actions/artActions';
import Games from '../GamesPage/GamesBlock';
import NewsBlock from './news';
import Social from './social';

class HomePage extends Component {
  componentDidMount() {
    window.scrollTo(0, 0);
    this.props.fetchArt();
  }

  render() {
    const artItems = this.props.art.map((img, index) =>
      <div className='col-12 col-md-6 col-lg-3 mt-3 mb-3 text-center'
        style={ { height: '200px', overflow: 'hidden' } }
        key={index}
      >
        <img
          className='art-block__image img-fluid shadow'
          alt={img.text}
          src={img.photo_604} key={index}/>
        </div>,
    ).slice(0, 4);
    return (
      <main>
        <NewsBlock />
        <section className='container text_card'>
          <div className='row'>
            <section className='col-12 col-lg-8'>
              <div className='bg-info p-3 text-center shadow d-block w-100'>
                ИГРЫ
              </div>
              <Games />
              <Link to='/games' className='text_card'><FiList size='1.5em'/> Все игры</Link>
            </section>
            <section className='col-12 col-lg-4'>
              <Link to='/streams'>
                <figure className='w-100 text-white shadow mb-4'>
                  <figcaption className='bg-info p-3 text-center w-100'>
                    СТРИМЫ
                  </figcaption>
                  <div className='figure__block'>
                    <img src='./streams.jpg'
                      alt='streams'
                      className='img-fluid'
                    />
                  </div>
                </figure>
              </Link>
              <Link to='/masters'>
                <figure className='w-100 text-white shadow mb-4' >
                  <figcaption className='bg-info p-3 text-center w-100'>
                    МАСТЕРА
                  </figcaption>
                  <div className='figure__block'>
                    <img src='./masters.jpg'
                      alt='masters'
                      className='img-fluid'
                    />
                  </div>
                </figure>
              </Link>
              <Link to='/library'>
                <figure className='w-100 text-white shadow mb-4'>
                  <figcaption className='bg-info p-3 text-center w-100'>
                    БИБЛИОТЕКА
                  </figcaption>
                  <div className='figure__block'>
                    <img src='./library.jpg'
                      alt='library'
                      className='img-fluid'
                    />
                  </div>
                </figure>
              </Link>
              <Link to='/shop'>
                <figure className='w-100 text-white shadow'>
                  <figcaption className='bg-info p-3 text-center w-100'>
                    МАГАЗИН
                  </figcaption>
                  <div className='figure__block'>
                    <img src='./shop.jpg'
                      alt='shop'
                      className='img-fluid'
                    />
                  </div>
                </figure>
              </Link>
            </section>
          </div>
          <h1>
            <FiImage size='1.5em'/> Фан-арт
          </h1>
          <Link to='/art'>
            <div className='row mb-4'>
             {artItems}
            </div>
          </Link>
          <h1>
            <FaGlobe size='1.5em'/> В социальных сетях
          </h1>
          <Social />
        </section>
      </main>
    );
  }
}

HomePage.propTypes = {
  fetchArt: PropTypes.func,
  art: PropTypes.array,
};

const mapStateToProps = state => ({
  art: state.art.items,
});

export default connect(mapStateToProps, { fetchArt })(HomePage);

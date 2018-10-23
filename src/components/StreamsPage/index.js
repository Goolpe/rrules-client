import React, { Component } from 'react';
import { FiYoutube } from 'react-icons/fi';

class StreamsPage extends Component {
  componentDidMount () {
    window.scrollTo(0, 0);
  }
  render() {
    return (
      <main>
        <section className='container'>
          <h1 className='text_card'>
            <FiYoutube size='1.5em'/> Стримы
          </h1>
          <div className='row text-white mt-5'>
            <div className='col-12 col-md-6 mt-2'>
              <h2 className='text_card'>
                Youtube
              </h2>
              <iframe width='100%'
                title='video1'
                height='300'
                src='https://www.youtube.com/embed/videoseries?list=UU-Hexiu7bmDvDlE6tA7LECw'
                frameBorder='0'
                allowFullScreen
              ></iframe>
            </div>
            <div className='col-12 col-md-6 mt-2'>
              <h2 className='text_card'>
                Twitch
              </h2>
              <iframe title='twitch'
                src='https://player.twitch.tv/?channel=random_rules'
                height='300'
                width='100%'
                frameBorder='0'
                className='mb-5'
                allowFullScreen>
              </iframe>
            </div>
          </div>
        </section>
      </main>
    );
  }
}
export default StreamsPage;


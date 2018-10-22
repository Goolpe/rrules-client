import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FaAngleLeft } from 'react-icons/fa';
import { createArticle } from '../actions/newsActions';

class ArticleForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      text: '',
      hashtags: '',
      picture: '',
      status: false,
      bgImage: '',
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      this.props.auth.isAuthenticated &&
      (this.props.auth.user.name === 'moderator' || this.props.auth.user.name === 'admin')
    ) {
      this.props.history.push('/article-new');
    }
    else {
      this.props.history.push('/');
    }
  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }
  onSubmit(e) {
    e.preventDefault();
    const article = {
      title: this.state.title,
      text: this.state.text,
      hashtags: this.state.hashtags,
      picture: this.state.picture,
      bgImage: this.state.bgImage,
    };
    this.props.createArticle(article);
    this.setState({
      title: '',
      text: '',
      hashtags: '',
      picture: '',
      bgImage: '',
    });
  }
  render() {
    return (
      <main>
        <section className='container text_card'>
          <Link to='/articles' className='text_card p-0 btn'>
            <FaAngleLeft size='1.5em'/> Выйти
          </Link>
          <form onSubmit={this.onSubmit} className='pt-5'>
            <div className='form-group text-left'>
              <label>Картинка</label>
              <input type='text'
                value={this.state.picture}
                onChange={this.onChange}
                name='picture'
                className='form-control'
                placeholder=''
              />
            </div>
            <div className='form-group text-left'>
              <label>Фон*</label>
              <input type='text'
                value={this.state.bgImage}
                onChange={this.onChange}
                name='bgImage'
                className='form-control'
                placeholder=''
                required
              />
            </div>
            <div className='form-group text-left'>
              <label>Заголовок*</label>
              <input type='text'
                value={this.state.title}
                onChange={this.onChange}
                name='title'
                className='form-control'
                aria-describedby='emailHelp'
                placeholder=''
                required
              />
            </div>
            <div className='form-group text-left'>
              <label>Текст*</label>
              <textarea type='text'
                value={this.state.text}
                onChange={this.onChange}
                rows='15' cols='45'
                name='text'
                className='form-control'
                placeholder=''
                required
              >
              </textarea>
            </div>
            <div className='form-group text-left'>
              <label>Теги</label>
              <input type='text'
                value={this.state.hashtags}
                onChange={this.onChange}
                name='hashtags'
                className='form-control'
                placeholder=''
              />
            </div>
            <button type='submit' className='btn btn-info w-100 p-3'>Опубликовать</button>
          </form>
        </section>
      </main>
    );
  }
}

ArticleForm.propTypes = {
  createArticle: PropTypes.func,
  auth: PropTypes.object,
};

const mapStateToProps = state => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { createArticle })(withRouter(ArticleForm));
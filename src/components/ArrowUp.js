import React, { Component } from 'react';
import { animateScroll as scroll } from 'react-scroll';
import { FaAngleUp } from 'react-icons/fa';

class ArrowUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrowUp: false,
    };
    this.onScroll = this.onScroll.bind(this);
  }

  onScroll() {
    if (window.pageYOffset > 100) {
      this.setState({ arrowUp: true });
    }
    else {
      this.setState({ arrowUp: false });
    }
  }
  componentDidMount() {
    window.addEventListener('scroll', this.onScroll);
  }
  scrollToTop() {
    scroll.scrollToTop();
  }
  render() {
    return (
      <React.Fragment>
        {this.state.arrowUp
        &&
        <div id='arrowUp' className='arrow-up' onClick={this.scrollToTop} >
          <FaAngleUp size='3em'/>
        </div>
        }
      </React.Fragment>
    );
  }
}

export default ArrowUp;
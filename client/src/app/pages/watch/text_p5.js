import React from 'react';
import P5Wrapper from 'react-p5-wrapper';
import { connect } from 'react-redux';
import axios from 'axios';

import FrameButton from '../../components/frameButton';
import Sketch from './sketches/text4class';
import 'eventsource-polyfill';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

class visualiseText extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource('http://localhost:5000/settings/sse');
    }
    this.goFullscreen = this.goFullscreen.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.state = {
      apiHello: '/watch/visualise',
      liveList: [],
      textScrollers: 1,
      componentWidth: undefined,
    };
  }

  refreshList() {
    /* load  story from database into state */
    const { room } = this.props;
    axios.get(this.state.apiHello, {
      params: {
        room,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw Error(res.message);
      } else {
        // console.log(res);
        this.setState({
          liveList: res.data.liveList,
          textScrollers: res.data.textScrollers,
        });
      }
    }).catch((err) => console.log(err));
  }

  goFullscreen() {
    document.activeElement.blur();
    console.log('fullscreen entered');
    const i = this.container;
    if (i.requestFullscreen) {
      i.requestFullscreen();
    } else if (i.webkitRequestFullscreen) {
      i.webkitRequestFullscreen();
    } else if (i.mozRequestFullScreen) {
      i.mozRequestFullScreen();
    } else if (i.msRequestFullscreen) {
      i.msRequestFullscreen();
    }
  }

  componentDidMount() {
    const { room } = this.props;
    console.log(room);
    /* pass in the rendered componentWidth to state */
    console.log(this.refs.parent.offsetWidth);
    this.setState({
      componentWidth: this.refs.parent.offsetWidth,
    });
    /* load  story from database into state */
    axios.get(this.state.apiHello, {
      params: {
        room,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw Error(res.message);
      } else {
        // console.log(res);
        this.setState({
          liveList: res.data.liveList,
          textScrollers: res.data.textScrollers,
        });
      }
    }).catch((err) => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('activelistChange', (e) => {
      console.log('A change triggered a refresh of the activelist');
      const data = JSON.parse(e.data);
      if (data.room === this.props.room) {
        this.refreshList();
      }
    });
    // Catches errors
    this.eventSource.onerror = (e) => {
      console.log('--- SSE EVENTSOURCE ERROR: ', e);
    };
  }

  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }

  render() {
    return (
      <div ref="parent">
        <FrameButton
          buttonLabel="Fullscreen"
          onClick={this.goFullscreen.bind(this.container)}
        />
        <hr />
        <div ref={(container) => { this.container = container; }}>
          <P5Wrapper
            sketch={Sketch}
            liveList={this.state.liveList}
            textScrollers={this.state.textScrollers}
            componentWidth={this.state.componentWidth}
          />
        </div>
      </div>
    );
  }
}
export default connect(mapStateToProps)(visualiseText);

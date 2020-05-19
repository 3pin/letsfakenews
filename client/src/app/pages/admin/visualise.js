import React from 'react';
import {
  connect
} from 'react-redux';
import axios from 'axios';
import 'eventsource-polyfill';
import {
  Table,
} from 'react-bootstrap';
import FrameBanner from '../../components/frameBanner';

// which props do we want to inject, given the global store state?
const mapStateToProps = (state) => ({
  room: state.roomReducer.room,
});

class Visualise extends React.Component {
  constructor(props) {
    super(props);
    if (process.env.NODE_ENV === 'production') {
      this.eventSource = new EventSource('/settings/sse');
    } else {
      this.eventSource = new EventSource('http://localhost:5000/settings/sse');
    }
    //
    this.handleVisualsLength = this.handleVisualsLength.bind(this);
    this.handleDurationChange = this.handleDurationChange.bind(this);
    this.handleScrollerChange = this.handleScrollerChange.bind(this);
    //
    this.state = {
      activelistLength: 0,
      visualiseNum: 1,
      imageDuration: 2,
      textScrollers: 1,
    };
  }

  handleVisualsLength(e) {
    // console.log(`onInput fired with value: '${e.currentTarget.value}'`);
    const data = {
      visualiseNum: e.currentTarget.value,
    };
    // update db then with 'res' update this component
    const {
      room,
    } = this.props;
    axios.put(this.props.apiVisualiseNum, {
      data,
    }, {
      params: {
        room,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw Error(res.message);
      } else {
        // console.log(res);
        this.setState({
          visualiseNum: res.data.visualiseNum,
        });
      }
    }).catch((err) => console.log(err));
  }

  handleDurationChange(e) {
    // console.log(`onInput fired with value: '${e.currentTarget.value}'`);
    const data = {
      imageDuration: e.currentTarget.value,
    };
    // update db then with 'res' update this component
    const {
      room
    } = this.props;
    axios.put(this.props.apiDurationChange, {
      data
    }, {
      params: {
        room,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw Error(res.message);
      } else {
        // console.log(res);
        this.setState({
          imageDuration: res.data.imageDuration,
        });
      }
    }).catch((err) => console.log(err));
  }

  handleScrollerChange(e) {
    console.log(`onInput fired with value: '${e.currentTarget.value}'`);
    const data = {
      textScrollers: e.currentTarget.value,
    };
    // update db then with 'res' update this component
    const {
      room
    } = this.props;
    axios.put(this.props.apiScrollerChange, {
      data
    }, {
      params: {
        room,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw Error(res.message);
      } else {
        // console.log(res);
        this.setState({
          textScrollers: res.data.textScrollers,
        });
      }
    }).catch((err) => console.log(err));
  }

  componentDidMount() {
    /* load autolive-status & stories from Db */
    const {
      room
    } = this.props;
    axios.get(this.props.apiHello, {
      params: {
        room,
      },
    }).then((res) => {
      if (res.status !== 200) {
        throw Error(res.message);
      } else {
        // console.log(res);
        this.setState({
          activelistLength: res.data.activelistLength,
          visualiseNum: res.data.visualiseNum,
          textScrollers: res.data.textScrollers,
          imageDuration: res.data.imageDuration,
        });
      }
    }).catch((err) => console.log(err));
    /* open sse listener */
    this.eventSource.addEventListener('activelistChange', (e) => {
      console.log('A change triggered a refresh of the activelist');
      console.log(e);
      const data = JSON.parse(e.data);
      console.log(data);
      if (data.room === room) {
        if (data.update < this.state.visualiseNum) {
          this.setState({
            activelistLength: data.update,
            visualiseNum: data.update,
          });
        } else {
          this.setState({
            activelistLength: data.update,
          });
        }
      }
    });
    /* Catches errors */
    this.eventSource.onerror = (e) => {
      console.log('--- SSE EVENTSOURCE ERROR: ', e);
    };
  }

  componentWillUnmount() {
    /* close sse listener */
    this.eventSource.close();
  }

  render() {
    console.log(this.state);
    const tableStyle = {
      backgroundColor: 'white',
    };
    return (
      <div>
        <FrameBanner desc={this.props.desc} title={this.props.title} />
        <hr />
        <Table bordered style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th style={{ width: '95%' }}>LiveList Control</th>
              <th>Num</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Number of stories in Activelist</td>
              <td>{this.state.activelistLength}</td>
            </tr>
            <tr>
              <td>Max number of stories to visualise</td>
              <td>
                <input type="number" min="0" max={this.state.activelistLength} value={this.state.visualiseNum} onChange={this.handleVisualsLength} />
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <Table bordered style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th style={{ width: '95%' }}>Slide-Show Control</th>
              <th>Num</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Image Display Duration (in seconds)</td>
              <td>
                <input type="number" min="1" max="10" value={this.state.imageDuration} onChange={this.handleDurationChange} />
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
        <Table bordered style={tableStyle}>
          <thead className="thead-dark">
            <tr>
              <th style={{ width: '95%' }}>Text-Scroller Control</th>
              <th>Num</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Num of Lines of Text (max 5)</td>
              <td>
                <input type="number" min="1" max="5" value={this.state.textScrollers} onChange={this.handleScrollerChange} />
              </td>
            </tr>
          </tbody>
        </Table>
        <hr />
      </div>
    );
  }
}
export default connect(mapStateToProps)(Visualise);

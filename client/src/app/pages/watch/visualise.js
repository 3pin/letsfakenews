import React from 'react';
import FrameBanner from '../../../app/components/frameBanner';

export default class Visualise extends React.Component {
  constructor(props) {
    super(props);
    this.apiGet = this.apiGet.bind(this);
    this.apiPost = this.apiPost.bind(this);
    this.state = {
      activelist: [],
      visualise: 0,
      livelist: []
    };
  }
  apiGet = async (endpoint) => {
    const response = await fetch(endpoint);
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  }
  apiPost = async (endpoint, data) => {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const body = await response.json();
    if (response.status !== 200)
      throw Error(body.message);
    return body;
  };
  componentWillMount() {
    /* load database into this.state */
    this.apiGet(this.props.apiHello).then(res => this.setState({
      activelist: res.activelist,
      visualise: res.visualise
    })).catch(err => console.log(err));
  }
  componentDidMount() {
    console.log(this.state.visualise)
    console.log(this.state.activelist.length);
    let livelist = [];
    if (this.state.visualise < this.state.activelist.length) {
      console.log('bingo');
      livelist = this.state.activelist.slice(this.state.activelist.length - this.state.visualise, this.state.activelist.length)
      this.setState({
        livelist: livelist,
      })
    } else {
      console.log('pongo')
      this.setState({
        livelist: this.state.activelist,
      })
    }
  }
  render() {
    console.log(this.state.visualise)
    console.log(this.state.activelist.length);
    let livelist = [];
    if (this.state.visualise < this.state.activelist.length) {
      console.log('bingo');
      livelist = this.state.activelist.slice(this.state.activelist.length - this.state.visualise, this.state.activelist.length)
      this.setState({
        livelist: livelist,
      })
    } else {
      console.log('pongo')
      this.setState({
        livelist: this.state.activelist,
      })
    }
    return (<div>
        <section>
          <FrameBanner title={this.props.title} desc={this.props.desc}/>
          <hr/>
        </section>
      </div>)
  }
}

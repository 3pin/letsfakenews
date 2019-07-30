import React from 'react'
import {
  Button
} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import {
  Link
} from 'react-router-dom';
import withSizes from 'react-sizes';

const mapSizesToProps = ({ width }) => ({
  isMobile: width < 480,
})

class Intro extends React.Component {
  state = {
    playing: false,
    volume: 0,
    muted: true
  }
  onReady = () => {
    this.setState({
      playing: true
    });
    console.log(this.state)
  }
  onEnded = () => {
    this.props.history.push("/landing")
  }
  render() {
    let url=this.props.isMobile ? 'https://res.cloudinary.com/hi58qepi6/video/upload/v1564526516/Screengrab_Video_Snipped_Web-iPhone.mp4' : 'https://res.cloudinary.com/hi58qepi6/video/upload/v1564506559/Screengrab_Video_Snipped_Web-desktop.mp4'
    console.log(url)
    return (<div>
      <div id="introContainer">
        <ReactPlayer
          className='introContent react-player'
          id="introVideoPlayer"
          url={url}
          playsinline
          playing={this.state.playing}
          volume={this.state.volume}
          muted={this.state.muted}
          width='100%'
          height='100%'
          ref={player => { this.player=player }}
          onReady={this.onReady}
          onEnded={this.onEnded}
        />
      <div>
        <Link to="/landing">
          <Button id='introButton' size="lg" variant='outline-secondary'>ENTER</Button>
        </Link>
      </div>
    </div>
  </div>)
  }
}
export default withSizes(mapSizesToProps)(Intro)

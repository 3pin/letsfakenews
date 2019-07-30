import React from 'react'
import {
  Button
} from 'react-bootstrap';
import ReactPlayer from 'react-player';
import {
  Link
} from 'react-router-dom';

class Intro extends React.Component {
  onEnded = () => {
    this.props.history.push("/landing")
  }
  render() {
    return (<div>
      <div id="introContainer">
        <ReactPlayer
          url='https://res.cloudinary.com/hi58qepi6/video/upload/v1564506559/Screengrab_Video_Snipped_Web-desktop.mp4'
          className='introContent react-player'
          id="introVideoPlayer"
          autoPlay={true}
          playing={true}
          volume={1}
          width='100%'
          height='100%'
          ref={player => { this.player=player }}
          onEnded={this.onEnded}
        />
      <div>
        <Link to="/landing">
          <Button id='introButton' size="lg" variant='outline-primary'>LetsFakeNews</Button>
        </Link>
      </div>
    </div>
  </div>)
  }
}
export default Intro

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
      <div className="introContainer">
        <ReactPlayer
          url='https://res.cloudinary.com/hi58qepi6/video/upload/v1564406783/TEI_Beers.mov'
          className='introContent react-player'
          id="videoPlayer"
          autoPlay={true}
          playing={true}
          volume={0}
          width='100%'
          height='100%'
          onEnded={this.onEnded}
        />
      <div>
        <Link to="/landing">
          <Button className='introButton' variant='secondary'>ENTER</Button>
        </Link>
      </div>
    </div>
  </div>)
  }
}
export default Intro

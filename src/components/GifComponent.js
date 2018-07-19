import React from 'react';
/*

Takes 1 prop:
  Data: GifObj { gif: URL(gif), static: URL(img)}
    -URL of Gif to be displayed

*/
class GifComponent extends React.Component {
  constructor(props){
    super()
    this.state = { playing: true }
  }

  screenWidth = window.screen.availWidth * 0.75;

  render() {
    return <div>
        <img src = { this.props.data } width = { this.screenWidth } height = {'auto'}/>
      </div>
  }
}

export default GifComponent;
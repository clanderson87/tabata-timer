import React from 'react';
/*

Takes 1 prop:
  Data: GifObj { gif: URL(gif), still: URL(img)}
    -URL of Gif to be displayed

*/
class GifComponent extends React.Component {
  constructor(props){
    super();
  }

  screenWidth = window.screen.availWidth * 0.75;
  render() {
    return <div>
        <img src = { this.props.playing ? this.props.data.gif : this.props.data.still } width = { this.screenWidth } height = {'auto'}/>
      </div>
  }
}

export default GifComponent;
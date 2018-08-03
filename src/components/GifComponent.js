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

  render() {
    return <div>
        <img src = { this.props.playing ? this.props.data.gif : this.props.data.still } style = {styles.gifStyle} />
      </div>
  }
}

const styles = {
  gifStyle: {
    width: window.innerWidth * 0.75,
    height: 'auto'
  }
}

export default GifComponent;
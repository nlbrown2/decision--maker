import React, { Component } from 'react';

class PressableIcon extends Component {
  render() {
    if(this.props.invisible) return (<div></div>)
    return (
      <div onClick={this.props.onClick}>
        {this.props.children}
      </div>
    )
  }
}
export default PressableIcon;

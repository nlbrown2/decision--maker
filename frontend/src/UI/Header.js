import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClipboard } from '@fortawesome/free-solid-svg-icons';
const Header = (props) => (
  <div
    style={{
      textAlign: 'center',
    }}
  >
    <header
      style={{
        backgroundColor: props.theme.palette.accent1Color,
        height: 150,
        padding: 20,
        color: 'white'
      }}
        >
      <FontAwesomeIcon icon={faClipboard} size="3x" />
      <h1
        className="App-title"
      >Decision Maker!</h1>
    </header>
    <h1
      style={{color: props.theme.palette.primary1Color}}
    > {props.header} </h1>
  </div>
);

export default Header;

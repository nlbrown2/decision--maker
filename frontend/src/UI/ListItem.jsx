import React, { Component } from 'react';
import styled from 'styled-components';

const ListItem = styled.li`
  list-style-type: none;
  justify-content: center;
  align-self: center;
  align-items: center;
`;

export const ListHeader = styled.ul`
  display: table;
  margin: 0;
  auto;
`;

export class ListItemTwo extends Component {
  render() {
    return (
      <div
        style={{
          justifyContent: 'space-between'
        }}
      >
        {this.props.left || <div></div>}
        {this.props.children}
        {this.props.right || <div></div>}
      </div>
    )
  }
};

export default ListItem;

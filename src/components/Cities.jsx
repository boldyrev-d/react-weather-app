/* eslint-disable react/prefer-stateless-function */

import React, { Component } from 'react';
import styled from 'styled-components';

const Sidebar = styled.aside`
  padding: 20px;
  background-color: #3a7ca5;
  border-right: 2px solid #fff;
`;

const List = styled.ul`
  margin: 30px 0;
  padding: 0;
  list-style-type: none;
`;

const RemoveButton = styled.i`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  opacity: 0;
  cursor: pointer;

  &:before,
  &:after {
    position: absolute;
    left: 50%;
    content: ' ';
    height: 16px;
    width: 2px;
    background-color: #fff;
  }

  &:before {
    transform: rotate(45deg);
  }

  &:after {
    transform: rotate(-45deg);
  }
`;

const Item = styled.li`
  position: relative;
  font-weight: ${props => (props.active ? 'bold' : 'normal')};
  cursor: pointer;

  &:not(:last-child) {
    margin-bottom: 10px;
  }

  &:hover {
    font-weight: bold;
  }

  &:hover ${RemoveButton} {
    opacity: 1;
  }
`;

const Form = styled.form``;

const Input = styled.input`
  display: block;
  margin: 0 auto 10px;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  font-family: 'Oswald', sand-serif;
  color: #fff;
  border: 1px solid #fff;
  background-color: transparent;
`;

const Button = styled.button`
  display: block;
  margin: 0 auto 10px;
  padding: 5px 12px;
  background-color: #233884;
  font-family: 'Oswald', sand-serif;
  color: #fff;
  border: none;
  cursor: pointer;
`;

class Cities extends Component {
  render() {
    return (
      <Sidebar>
        <List>
          <Item>
            Current location<RemoveButton />
          </Item>
          <Item active>
            Moscow<RemoveButton />
          </Item>
          <Item>
            Saint-P<RemoveButton />
          </Item>
        </List>

        <Form onSubmit={e => e.preventDefault()}>
          <Input type="text" />
          <Button>Add city</Button>
        </Form>
      </Sidebar>
    );
  }
}

export default Cities;

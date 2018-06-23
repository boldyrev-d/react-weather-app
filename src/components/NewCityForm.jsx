import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { loadWeather } from '../AC';

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

const SubmitButton = styled.button`
  display: block;
  margin: 0 auto 10px;
  padding: 5px 12px;
  background-color: #233884;
  font-family: 'Oswald', sand-serif;
  color: #fff;
  border: none;
  cursor: pointer;
`;

class NewCityForm extends Component {
  static propTypes = {
    // from connect
    loadWeather: PropTypes.func.isRequired,
  };

  state = {
    text: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const { text } = this.state;
    // eslint-disable-next-line no-shadow
    const { loadWeather } = this.props;

    if (text) {
      loadWeather(text);

      this.setState({
        text: '',
      });
    }
  };

  handleChange = e => this.setState({
    text: e.target.value,
  });

  render() {
    const { text } = this.state;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Input type="text" value={text} onChange={this.handleChange} />
        <SubmitButton>
Add city
        </SubmitButton>
      </Form>
    );
  }
}

export default connect(
  null,
  { loadWeather },
)(NewCityForm);

import React, { Component } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default class DatePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: ""
    }
  }

  handleChange(date) {
    this.setState({
      startDate: date
    });
  }
  
  render() { 
    return (
      <DatePicker selected={this.state.startDate} onChange={this.handleChange}/>
    );
  }
}


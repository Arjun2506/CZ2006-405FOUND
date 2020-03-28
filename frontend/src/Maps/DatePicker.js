import React, { Component } from 'react';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';
import { SingleDatePicker, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';


export default class DatePick extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: moment(),
      focused: false
    }
  }

  handleChange(date) {
    this.setState({
      date: date
    });
    this.props.function(date.format('YYYY MM DD'));
  }

  render() {
    return (
      <div>
      <SingleDatePicker
        date={this.state.date}
        onDateChange={date => this.handleChange(date)}
        focused={this.state.focused}
        onFocusChange={({ focused }) => this.setState({ focused })}
        id="PSIDate"
        isOutsideRange={()=>false}
        function={this.props.function}
      />
      </div>
    );
  }
}


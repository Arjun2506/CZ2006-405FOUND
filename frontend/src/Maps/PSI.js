import React, { Component } from 'react';
import SimpleMap from './GoogleMap';
import DatePick from './DatePicker';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import moment from 'moment';
import "./Map.css";


export default class PSI extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment().format("YYYY-MM-DD")
        }
        this.onChangeDate = this.onChangeDate.bind(this);
        this.changeMap = this.changeMap.bind(this);
    }

    onChangeDate(date) {
        this.setState({
            date
        })
    }

    changeMap() {
        axios
            .post(`http://localhost:5000/psi`, {
                date: this.state.date
            })
            .then((res) => {
                const locations = {
                    west: { 'latitude': 1.35735, 'longitude': 103.7 },
                    east: { 'latitude': 1.35735, 'longitude': 103.94 },
                    central: { 'latitude': 1.35735, 'longitude': 103.82 },
                    south: { 'latitude': 1.29587, 'longitude': 103.82 },
                    north: { 'latitude': 1.41803, 'longitude': 103.82 },
                    national: { 'latitude': 0, 'longitude': 0}
                }
                var resData = [];
                Object.keys(res.data).map(key => {
                    resData.push({
                    lat: locations[key]['latitude'],
                    lng: locations[key]['longitude'],
                    weight: res.data[key]
                })})
                this.setState({
                    data: res.data
                });
                this.refs.map.onMap(resData);
            })
    }

    render() {
        return (
            <div>
                <div className="container"><h1>{`PSI National Assessment for ${this.state.date}`}</h1></div>
                <SimpleMap ref="map" />
                <DatePick function={this.onChangeDate} />
                <Button variant="primary" onClick={this.changeMap}>Submit</Button>
                {this.state.data ? <div className="container" id="shadowText">
                    <h1>PSI Values</h1>
                    {Object.keys(this.state.data).map(key => <h2>{`${key.charAt(0).toUpperCase() + key.slice(1)}: ${this.state.data[key]}`}</h2>)}
                </div> : <div></div>
                }
            </div>
        );
    }
}
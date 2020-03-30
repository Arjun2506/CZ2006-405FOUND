import React, { Component } from 'react';
import SimpleMap from './GoogleMap';
import DatePick from './DatePicker';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";


export default class UV extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: ""
        }
        this.onChangeDate = this.onChangeDate.bind(this);
        this.changeMap = this.changeMap.bind(this);
    }

    onChangeDate(newDate) {
        this.setState({
            date: newDate
        })
    }

    changeMap() {
        axios
            .post(`http://localhost:5000/uv`, {
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
                const sectors = ["west", "east", "central", "south", "north", "national"]
                var resData = [{
                    lat: locations["central"]['latitude'],
                    lng: locations["central"]['longitude'],
                    weight: res.data
                }]

                this.setState({
                    data: res.data
                });
                this.refs.map.onMap(resData);
            })
    }

    render() {
        return (
            <div>
                <div className="container"><h1>Ultraviolet Index National Assessment</h1></div>
                <SimpleMap ref="map" />
                <DatePick function={this.onChangeDate} />
                <Button variant="primary" onClick={this.changeMap}>Submit</Button>
                {this.state.data ? <div className="container" id="shadowText">
                    <h1>UV Readings</h1>
                    {<h2>{`National Value: ${this.state.data}`}</h2>}
                </div> : <div></div>
                }
            </div>
        );
    }
}
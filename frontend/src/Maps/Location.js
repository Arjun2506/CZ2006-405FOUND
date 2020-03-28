import React, { Component } from 'react';
import SimpleMap from './GoogleMap';
import DatePick from './DatePicker';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Dropdown from "./Dropdown";
import QueryOption from "./QueryOption";
import "./Map.css";

export default class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            date: "",
            data: ""
        }
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeLocation = this.onChangeLocation.bind(this);
        this.changeMap = this.changeMap.bind(this);
    }

    onChangeDate(newDate) {
        this.setState({
            date: newDate
        })
    }
    
    onChangeLocation(newLocation){
        this.setState({
            location: newLocation
        })
    }
    changeMap() {
        axios
            .post(`http://localhost:5000/${document.getElementById("queryOption").value}`, {
                date: this.state.date,
                location: document.getElementById("location").value
            })
            .then((res) => {
                const locations = {
                    west: { 'latitude': 1.35735, 'longitude': 103.7 },
                    east: { 'latitude': 1.35735, 'longitude': 103.94 },
                    central: { 'latitude': 1.35735, 'longitude': 103.82 },
                    south: { 'latitude': 1.29587, 'longitude': 103.82 },
                    north: { 'latitude': 1.41803, 'longitude': 103.82 },
                    national: { 'latitude': 0, 'longitude': 0 }
                }
                var resData = [];
                Object.keys(res.data).map(key => {
                    resData.push({
                        lat: locations[key]['latitude'],
                        lng: locations[key]['longitude'],
                        weight: res.data[key]
                    })
                })
                this.setState({
                    data: res.data,
                    location: document.getElementById("location").value,
                    queryType: document.getElementById("queryOption").value
                });
                this.refs.map.onMap(resData);
            })
    }

    render() {
        return (
            <div>
                <div className="container"><h1>National Assessment</h1></div>
                <SimpleMap ref="map" />
                <Dropdown />
                <QueryOption />
                <DatePick function={this.onChangeDate} />
                <Button variant="primary" onClick={this.changeMap}>Submit</Button>
                {this.state.data ? <div className="container" id="shadowText">
                <h1>Value of the {this.state.queryType}</h1>
                    {`Your location is in the ${this.state.location}. The value `}
                </div> : <div></div>
                }
            </div>
        );
    }
}
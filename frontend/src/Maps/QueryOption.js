import React, { Component } from 'react';

export default class QueryOption extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{fontSize: "200%", marginTop: "1%", marginBottom: "2%" }}>
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Type of Query</label>
                <select className="custom-select my-1 mr-sm-2" id="queryOption" style={{fontSize: "120%"}}>
                    <option selected>Choose...</option>
                    <option value="psi">PSI</option>
                    <option value="pm">PM2.5</option>
                    <option value="uv">UV Index</option>
                </select>
            </div>
        );
    }
}
import React, { Component } from 'react';

class Dropdown extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div style={{fontSize: "200%", marginTop: "1%", marginBottom: "2%" }}>
            <label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Location</label>
                <select className="custom-select my-1 mr-sm-2" id="location" style={{fontSize: "120%"}}>
                    <option selected>Choose...</option>
                    <option value="west">Jurong East</option>
                    <option value="west">Joo Koon</option>
                    <option value="north">Woodlands</option>
                    <option value="north">Lim Chu Kang</option>
                    <option value="east">Tampines</option>
                    <option value="east">Pasir Ris</option>
                    <option value="center">Bukit Merah</option>
                    <option value="center">Queenstown</option>
                </select>
            </div>
        );
    }
}

export default Dropdown;
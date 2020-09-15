import React, { Component } from 'react';

class Step2 extends Component {
    
    constructor() {
        if (this.props.currentStep !== 2) {
            return null
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                    className="form-control"
                    id="username"
                    name="username"
                    type="text"
                    placeholder="Enter username"
                    value={this.props.username}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

export default Step2;
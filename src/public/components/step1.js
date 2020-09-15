import React, { Component } from 'react';

class Step1 extends Component {
   
    constructor() {
        if (this.props.currentStep !== 1) {
            return null
        }
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter email"
                    value={this.props.email}
                    onChange={this.props.handleChange}
                />
            </div>
        );
    }
}

export default Step1;
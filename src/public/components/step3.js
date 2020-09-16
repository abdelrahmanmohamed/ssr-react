import React, { Component } from 'react';

class Step3 extends Component {

    constructor(props) {
        super(props)
    }
    render() {
        if (this.props.currentStep !== 3) {
            return null
        }
        return (
            <React.Fragment>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                        className="form-control"
                        id="password"
                        name="password"
                        type="password"
                        placeholder="Enter password"
                        value={this.props.password}
                        onChange={this.props.handleChange}
                    />
                </div>
                <button className="btn btn-success btn-block">Sign up</button>
            </React.Fragment>
        );
    }
}
export default Step3;
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {FormInputGroup} from "../shared/FormInputGroup";
import {loginUser} from "../../actions/authActions";


class Login extends Component {
    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            errors: {}
        };
        this.onLogin = this.onLogin.bind(this);
    }


    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }


    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    onLogin(e) {
        e.preventDefault();
        let user = {};
        Object.keys(this.state).map((i) => user[i] = this.state[i]);
        this.props.loginUser(user);
    };


    render() {
        const {errors} = this.state;

        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your StockZ accountt</p>
                            <form onSubmit={this.onLogin}>
                                <FormInputGroup
                                    placeholder="Email Address"
                                    type="email"
                                    error={errors.email}
                                    onChange={this.onChange}
                                    value={this.state.email}
                                    name="email" />

                                <FormInputGroup
                                    placeholder="Password"
                                    type="password"
                                    error={errors.password}
                                    onChange={this.onChange}
                                    value={this.state.password}
                                    name="password" />
                                <input type="submit" className="btn btn-info btn-block mt-4"/>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, {loginUser})(Login);

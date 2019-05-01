import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styled from 'styled-components';
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {logoutUser} from "../../actions/authActions";


const NavBarStyled = styled.nav`
    opacity: 1;
    background-image: linear-gradient(45deg,#2B2D42 0%,#2B2D42 100%);
`;



const LinkStyled = styled(Link)`
    color: #FF2DC3 !important;
`;


class Navbar extends Component {
    onLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        const {isAuthenticated} = this.props.auth;

        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <a href="#" className="nav-link" onClick={this.onLogout.bind(this)}>
                        {' '}Logout
                    </a>
                </li>
            </ul>
        );

        const guestLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
            </ul>
        );

        return (
            <NavBarStyled className="navbar navbar-expand-sm navbar-dark  mb-4">
                <div className="container">
                    <LinkStyled className="navbar-brand" to="/">StockZ</LinkStyled>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                        <span className="navbar-toggler-icon"/>
                    </button>

                    <div className="collapse navbar-collapse" id="mobile-nav">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className="nav-link" to="/dashboard"> Dashboard
                                </Link>
                            </li>
                        </ul>
                        {isAuthenticated ? authLinks : guestLinks}
                    </div>
                </div>
            </NavBarStyled>
        )
    }
}

Navbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});

export default connect(mapStateToProps, {logoutUser})(Navbar);


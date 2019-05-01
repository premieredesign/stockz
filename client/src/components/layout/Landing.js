import React, {Component} from 'react';
import {Link} from "react-router-dom";
import styled, {css} from 'styled-components';
import img from '../../img/stockz-background.jpeg'
import PropTypes from 'prop-types';
import {connect} from "react-redux";



const LandingStyled = styled.div`
  position: relative;
  ${props => props.showcase && css`
    background: url(${img}) no-repeat 40% 10%;
  `}
  height: 100vh;
  margin-top: -24px;
  margin-bottom: -50px;
`;

const LandingInnerStyled = styled.div`
    ${props => props.dark && css`
         opacity: 0.8;
         background-image: linear-gradient(45deg,#2B2D42 0%,#2B2D42 100%);
         position: absolute;
         top: 0;
         left: 0;
         width: 100%;
         height: 100%;
    `}
   
    ${props => props.landing && css`
        padding-top: 80px;
    `}
    
    ${props => props.light && css`
        color: #f8f9fa !important;
    `}
`;


const LinkedLoginStyled = styled(Link)`
     color: white;
     border: none;
    background-color: #6500FF !important;
    &:hover {
        color: yellow;
    }
`;




class Landing extends Component {
    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <LandingStyled showcase>
                <LandingInnerStyled dark landing light>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">Stockz
                                </h1>
                                <p className="lead">"Where we sell shoes, clues, and everything news"</p>
                                <hr/>
                                <LinkedLoginStyled to="/login" className="btn btn-lg btn-light">Login</LinkedLoginStyled>
                            </div>
                        </div>
                    </div>
                </LandingInnerStyled>
            </LandingStyled>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth
});


export default connect(mapStateToProps)(Landing)

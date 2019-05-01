import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from "react-redux";
import { Card,CardImg, CardSubtitle, CardText, CardBody} from 'reactstrap';
import {getStockzInventory} from "../../actions/inventoryActions";
import {Button} from "react-bootstrap";
import CardHeader from "reactstrap/es/CardHeader";
import {FormModalInputGroup} from "../shared/FormModalInputGroup";
import {showModal} from "../../actions/modalActions";


const CardStyled = styled(Card)`
    opacity: 1;
     overflow: hidden;
    border-radius: 20px;
    border: none !important;
    color: white !important;
    transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0s !important;
    margin-bottom: 20px !important;
 
    &:hover {
      cursor: pointer;
      opacity: 1;
      transform: scale(1.1);
    }

    &:hover .readMore:before {
      background: linear-gradient(to right, #ffffff 0%,#ffffff 100%);
    }

    &-header {
      padding: 3px;
      padding-right: 7px;
      text-align: right;
      text-transform: uppercase;
      font-weight: 600;
      font-size: 17px;
    }

    &-city {

    }

    &-title {
      font-size: 30px;
      font-weight: 700;
      line-height: 1.1;
      text-transform: uppercase;
      margin-bottom: 10px;
    }

    &-text {
      font-size: 16px;
      font-weight: 500;
      line-height: 1.3;
      text-transform: uppercase;
      margin-bottom: 50px;
    }
`;

const CardImgStyled = styled(CardImg)`
    position: absolute;
    height: 260px;
    border-radius: 20px;
     overflow: hidden;
`;

const CardBodyStyled = styled(CardBody)`
    position: relative;
    opacity: 0;
    overflow: hidden;
    &:hover {
      opacity: 0.7;
       background-image: linear-gradient(to top, #083535, #0d4244, #134f53, #185d64, #1f6b75);
      transition: all 0.5s ease-in-out;
    }
`;

const ButtonStyled = styled(Button)`
  background-color: #FF2DC3;
  border: none;
  position: relative;
  text-align: center;
  &:hover {
    background-color: red;
  }
`;

const ShoeGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 5fr));
    grid-gap: 15px;
    margin-top: 40px;
`;




class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            show: false,
        };
        this.handleShow = this.handleShow.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.showmodal) {
            this.setState({show: nextProps.showmodal})
        }

        if (nextProps.errors) {
            this.setState({errors: nextProps.errors})
        }
    }

    componentDidMount() {
        if (!this.props.auth.isAuthenticated) {
            this.props.history.push('/');
        }
        this.props.getStockzInventory();
        console.log('props', this.props);
        console.log('state', this.state);
    }

    handleClose = () => {
        this.setState({ show: false });
        console.log('Show', this.state.show);
    };

    handleShow = () => {
        this.setState({ show: true });
        this.props.showModal(true);
        console.log('shofjdkfja;fdja;fjd;')
    };



    render() {
        return (
            <div>
                <h1>StockZ Dashboard</h1>
                <ShoeGrid>
                    {this.props.inventory.items.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                <CardStyled className="portfolio-card">
                                    <CardImgStyled top width="100%" src={item.shoeimage} alt="Card image cap" />
                                    <CardBodyStyled>
                                        <CardHeader className="portfolio-card-header">Brand: {item.brand}</CardHeader>
                                        <CardSubtitle className="portfolio-card-title">Style: {item.style}</CardSubtitle>
                                        <CardText className="portfolio-card-text">Size: {item.size}</CardText>
                                        <CardText className="portfolio-card-text">UPC: #{item.upc}</CardText>
                                        <ButtonStyled>Remove</ButtonStyled>
                                    </CardBodyStyled>
                                </CardStyled>
                            </React.Fragment>
                        )
                    })}
                </ShoeGrid>
            </div>
        );
    }
}


Dashboard.propTypes = {
    getStockzInventory: PropTypes.func.isRequired,
    showModal: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    inventory: PropTypes.object,
    errors: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
    auth: state.auth,
    inventory: state.inventory,
    errors: state.errors
});

export default connect(mapStateToProps, {getStockzInventory, showModal})(Dashboard);

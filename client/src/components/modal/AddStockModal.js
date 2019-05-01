import React, {Component} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {connect} from "react-redux";
import {Button} from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import {FormInputGroup} from "../shared/FormInputGroup";
import {addStockzItem} from "../../actions/inventoryActions";

const LaunchButtonStyled = styled(Button)`
  background-color: #FF2DC3;
  border: none;
  position: relative;
  text-align: center;
  width: 100vw;
  &:hover {
    color: #FF2DC3;
    background-color: #2B2D42;
  }
`;


const SubmitButtonStyled = styled(Button)`
  background-color: #FF2DC3;
  border: none;
  position: relative;
  text-align: center;
  &:hover {
    background-color: #083535;
  }
`;

const UploadImageInputStyled = styled.input`
    width: 100vw;
`;


class AddStockModal extends React.Component {
    constructor() {
        super();
        this.state = {
            brand: '',
            style: '',
            size: '',
            upc: '',
            show: false,
            errors: {}
        };
    }

    handleClose = () => {
        this.setState({ show: false });
    };

    handleShow = () => {
        this.setState({ show: true });
    };

    onAddStock = () => {
        this.props.addStockzItem(this.state);
        this.handleClose();
    };

    onImageUpload = (e) => {
        console.log('e', e.target.files[0])
    }

    onChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    };

    render() {
        const {errors} = this.state;
        return (
            <>
                <LaunchButtonStyled variant="primary" onClick={this.handleShow}>
                    Add Stock
                </LaunchButtonStyled>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add Stock</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onAddStock}>
                            <FormInputGroup
                                placeholder="Brand:"
                                type="text"
                                error={errors.brand}
                                onChange={this.onChange}
                                value={this.state.brand}
                                name="brand" />

                            <FormInputGroup
                                placeholder="Style:"
                                type="text"
                                error={errors.style}
                                onChange={this.onChange}
                                value={this.state.style}
                                name="style" />

                            <FormInputGroup
                                placeholder="Size:"
                                type="text"
                                error={errors.size}
                                onChange={this.onChange}
                                value={this.state.size}
                                name="size" />

                            <FormInputGroup
                                placeholder="UPC:"
                                type="text"
                                error={errors.upc}
                                onChange={this.onChange}
                                value={this.state.upc}
                                name="upc" />
                            <UploadImageInputStyled type="file" onChange={this.onImageUpload}/>
                            {' '}
                            <Button variant="secondary" onClick={this.handleClose}>
                                Close
                            </Button>
                            {' '}
                            <SubmitButtonStyled variant="primary" onClick={this.onAddStock}>
                                Submit
                            </SubmitButtonStyled>
                        </form>
                    </Modal.Body>
                </Modal>
            </>
        );
    }
}

AddStockModal.propTypes = {
    addStockzItem: PropTypes.func.isRequired,
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

export default connect(mapStateToProps, {addStockzItem})(AddStockModal)

const isEmpty = require('./is-empty');

const validator = require('validator');

const validateInventoryInput = (data) => {
    let errors = {};

    data.brand = !isEmpty(data.brand) ? data.brand : '';
    data.style = !isEmpty(data.style) ? data.style : '';
    data.size = !isEmpty(data.size) ? data.size : '';
    data.upc_id = !isEmpty(data.upc_id) ? data.upc_id : '';

    // Validate Brand
    if (validator.isEmpty(data.brand)) {
        errors.brand = 'Brand handle is required';
    }

    // // Validate Style
    // if (validator.isEmpty(data.style)) {
    //     errors.style = 'Style field is required';
    // }
    //
    //
    // // Validate Size
    // if (validator.isEmpty(data.size)) {
    //     errors.size = 'Size field is required';
    // }
    //
    // // Validate Upc_id
    // if (!isEmpty(data.upc_id)) {
    //     errors.upc_id = 'UPC ID field is required';
    // }




    return {
        errors,
        isValid: isEmpty(errors)
    }
};

module.exports = validateInventoryInput;

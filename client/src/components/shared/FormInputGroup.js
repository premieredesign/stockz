import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';


export const FormInputGroup = ({
                                   name,
                                   placeholder,
                                   value,
                                   label,
                                   error,
                                   info,
                                   type,
                                   onChange,
                                   disabled
                               }) => {
    return (
        <div className="form-group">
            <input
                type={type}
                className={classnames('form-control form-control-lg', {
                    'is-invalid': error})}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                disabled={disabled}
                name={name}/>
            {info && (<small className="form-text text-muted">{info}</small>)}
            {error && (<div className="invalid-feedback">{error}</div>)}
        </div>
    )
};

FormInputGroup.propTypes = {
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string.isRequired,
    label: PropTypes.string,
    error: PropTypes.string,
    info: PropTypes.string,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    disabled: PropTypes.string,
};

FormInputGroup.defaultProps = {
    type: 'Text'
};

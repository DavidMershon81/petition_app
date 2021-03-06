import { useContext } from 'react';
import { FormContext } from '../contexts/FormContext';

const FormErrorMessage = ({ varName, visibleName, validateErrorMessage }) => {
    const { errors } = useContext(FormContext);
    const errorPresent = errors[varName] != null;
    const requiredError = errorPresent && errors[varName].type === 'required';
    const validateError = errorPresent && errors[varName].type === 'validate';

    if(requiredError || validateError) {
        const errorMessage = validateError ? validateErrorMessage :`${visibleName} required!`;
        return (<span className='form_error_message'>{errorMessage}</span>);
    }
    return (<span></span>);
};

const FormTextInput = ({ varName, visibleName, type, validateFunction=()=> { return true; }, validateErrorMessage }) => {
    const { register } = useContext(FormContext);
    const formParams = { 
        required: true,
        validate: validateFunction
    };

    return (
        <>
            {   
                type === 'textarea' ? 
                <textarea rows='10' className="form_text_area" placeholder={visibleName} {...register(varName, formParams)} /> :
                <input className="form_text_input"  type={type} placeholder={visibleName} {...register(varName, formParams)} />
            }
            <FormErrorMessage varName={varName} visibleName={visibleName} validateErrorMessage={validateErrorMessage}/>
        </>
    );
};

const FormRadioButton = ({ varName, valueName, valueText, onClick }) => {
    const { register } = useContext(FormContext);
    return (
        <label className="form_checkbox_container">
            <input {...register(varName, { required: true })} type="radio" value={valueName} onClick={() => { onClick(valueName);}} />{valueText}
            <span className="checkmark"></span>
        </label>
    );
};

const FormRadioButtonGroup = ({ varName, visibleName, buttonsConfig, onClick }) => {
    return (
        <fieldset className="form_radio_button_set">
        { buttonsConfig.map(({ valueName, valueText}) => (
            <FormRadioButton key={valueName} varName={varName} valueName={valueName} valueText={valueText} onClick={onClick}/>
        )) }
        <FormErrorMessage varName={varName} visibleName={visibleName} />
    </fieldset>
    )
};

const FormHiddenInput = ({ varName, varValue }) => {
    const { register } = useContext(FormContext);
    return (<input type="hidden" value={varValue} {...register(varName)} />);
};

export { FormErrorMessage, FormTextInput, FormRadioButton, FormRadioButtonGroup, FormHiddenInput };
import { useState } from 'react'
import FormTextInput from './FormTextInput'

const TextEntryForm = ({ formFields, submitBtnLabel, submitEvent  }) => {
  const [formData, setFormData] = useState(formFields);
  const [showFormErrors, setShowFormErrors] = useState(false);

  const onTextUpdate = (index, newValue) => {
    const newFormData = [...formData];
    newFormData[index] = formData[index].updateValue(newValue);
    setFormData(newFormData);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubmit running...');

    const invalidEntires = formData.filter(entry => !entry.isValid());
    if(invalidEntires.length > 0){
      setShowFormErrors(true);
      return;
    }

    let submitData = {};
    formData.forEach(fd => submitData[fd.name] = fd.value);
    submitEvent(submitData);
    setFormData(formFields);
    setShowFormErrors(false);
  }

  return (
    <form onSubmit={onSubmit} className='input_form'>
      {formData.map((field, index) => <FormTextInput key={index} index={index} fieldInfo={field} setText={onTextUpdate} showFormErrors={showFormErrors}/>)}
      <input type="submit" value={submitBtnLabel} className="form_submit_btn" />
      {showFormErrors && <p className='form_error_message'>Looks like you forgot to enter something in this form.</p>}
    </form>
  )
}

export default TextEntryForm
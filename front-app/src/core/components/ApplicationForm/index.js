import React, { useRef, useEffect } from 'react';
import { Modal, Form, Input, Message } from 'semantic-ui-react';
import { FormFieldStyled, InputStyled, LabelStyled } from 'core/components/UI/FormAG';
import DatepickerAG from 'core/components/UI/DatepickerAG';

import PropTypes from 'prop-types';

ApplicationForm.propTypes = {
  formError: PropTypes.any,
  inputValues: PropTypes.object.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleDropDownChange: PropTypes.func.isRequired,
  handleDatePickerChange: PropTypes.func.isRequired,
  handleFileInputChange: PropTypes.func.isRequired
};

export default function ApplicationForm({
  formError,
  inputValues,
  handleInputChange,
  handleDatePickerChange,
  handleFileInputChange
}) {
  const firstInputRef = useRef(false);

  useEffect(() => {
    firstInputRef.current.focus();
  }, []);

  return (
    <Modal.Content>
      <Form autoComplete="off" error>
        {formError !== false && (
          <Message
            error
            content={Object.values(formError).map((errorItem, i) => (
              <React.Fragment key={`formErr${i}`}>
                {errorItem}
                <br />
              </React.Fragment>
            ))}
          />
        )}

        <FormFieldStyled required error={formError.title ? true : false}>
          <LabelStyled>Application Title : </LabelStyled>
          <InputStyled
            placeholder="Application Name"
            name="title"
            value={inputValues.title}
            onChange={handleInputChange}
            ref={firstInputRef}
          />
        </FormFieldStyled>

        <FormFieldStyled required error={formError.url ? true : false}>
          <LabelStyled>Application URL : </LabelStyled>
          <InputStyled
            placeholder="Application URL"
            name="url"
            value={inputValues.url}
            onChange={handleInputChange}
          />
        </FormFieldStyled>

        {/* <DividerStyled /> */}
        {/* <FormFieldStyled required error={formError.provider ? true : false}>
          <LabelStyled>Provider : </LabelStyled>
          <DropdownStyled
            placeholder="Select Provider"
            selection
            options={providers}
            name="provider"
            value={inputValues.provider}
            onChange={handleDropDownChange}
          />
        </FormFieldStyled> */}

        <Form.Group style={{ marginTop: '40px' }}>
          <Form.Input
            fluid
            label="Current Version :"
            placeholder="e.g 1.0.2"
            required
            name="currentVersion"
            value={inputValues.currentVersion}
            onChange={handleInputChange}
            error={formError.currentVersion ? true : false}
            style={{ width: '120px' }}
          />

          <DatepickerAG
            label="Current Release :"
            name="releaseDate"
            required
            value={new Date(inputValues.releaseDate)}
            onChange={handleDatePickerChange}
            error={formError.releaseDate ? true : false}
          />

          <Form.Field>
            <label>Image :</label>
            <Input
              type="file"
              accept=".png, .jpg, .jpeg"
              onChange={handleFileInputChange}
              style={{ height: '38px' }}
            />
          </Form.Field>
        </Form.Group>

        {/* <DateWrapper required>
          {/* <DatepickerAG
            label="Next Release :"
            name="nextReleaseDate"
            value={new Date(inputValues.nextReleaseDate)}
            onChange={handleDatePickerChange}
          /> 
        </DateWrapper> */}

        {/* <Form.TextArea
          label="When to use :"
          name="whenToUse"
          value={inputValues.whenToUse}
          onChange={handleInputChange}
        /> */}
      </Form>
    </Modal.Content>
  );
}

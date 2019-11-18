import { Form, Input, Dropdown, Divider } from 'semantic-ui-react';
import styled from 'styled-components';

export const FormFieldStyled = styled(Form.Field)`
  display: flex;
  align-items: center;
`;

export const InputStyled = styled(Input)`
  flex: 1;
`;

export const LabelStyled = styled.label`
  width: 150px !important;
`;

export const DropdownStyled = styled(Dropdown)`
  flex: 1;
`;

export const DividerStyled = styled(Divider)`
  margin: 20px 0 !important;
`;

export const DateWrapper = styled(Form.Group)`
  display: flex;
  justify-content: space-between;
`;

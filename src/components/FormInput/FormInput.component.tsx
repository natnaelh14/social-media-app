import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './FormInput.styles';

type InputProps = {
    label: string
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ handleChange, label}: InputProps, {...props}) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...props} />
    {label ? (
      <FormInputLabel className={props.value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
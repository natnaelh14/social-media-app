import {
  GroupContainer,
  FormInputContainer,
  FormInputLabel
} from './form-input.styles';

type InputProps = {
    name: string,
    label: string,
    type: string,
    value: string,
    autoComplete?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput = ({ onChange, label, name, type, autoComplete, value}: InputProps) => (
  <GroupContainer>
    <FormInputContainer onChange={onChange} name={name} required type={type} autoComplete={autoComplete} />
    {label ? (
      <FormInputLabel className={value.length ? 'shrink' : ''}>
        {label}
      </FormInputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
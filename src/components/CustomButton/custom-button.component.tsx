import { CustomButtonContainer } from './custom-button.styles';

type ButtonProps = {
  children: React.ReactNode,
  type?: 'submit' | 'reset' | 'button',
  inverted?: boolean,
  onClick?: (event: React.ChangeEvent<HTMLInputElement>) => void,
  googleSignin?: boolean
}

const CustomButton = (props: ButtonProps) => (
  <CustomButtonContainer type={props.type} googleSignin={props.googleSignin} onClick={e => props.onClick} inverted={props.inverted} >{props.children}</CustomButtonContainer>
);

export default CustomButton;


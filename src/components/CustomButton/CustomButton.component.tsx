import { CustomButtonContainer } from './CustomButton.styles';

type ButtonProps = {
  children: React.ReactNode;
}

const CustomButton = (props: ButtonProps) => (
  <CustomButtonContainer>{props.children}</CustomButtonContainer>
);

export default CustomButton;
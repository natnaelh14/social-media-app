import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
} from './header.styles';

const Header = () => (
    <HeaderContainer>
        <LogoContainer to='/'>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink to='/signin'>
                <span>SIGN IN</span>
            </OptionLink>
            <OptionLink to='/signout'>
                <span>SIGN OUT</span>
            </OptionLink>
        </OptionsContainer>
    </HeaderContainer>
);


export default Header;

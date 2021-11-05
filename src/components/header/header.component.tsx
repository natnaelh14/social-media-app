import { ReactComponent as Logo } from '../../assets/logo.svg';
import {
    HeaderContainer,
    LogoContainer,
    OptionsContainer,
    OptionLink
} from './header.styles';

const Header = () => (
    <HeaderContainer>
        <LogoContainer>
            <Logo className='logo' />
        </LogoContainer>
        <OptionsContainer>
            <OptionLink>
                <span>PROFILE</span>
            </OptionLink>
            <OptionLink>
                <span>MESSAGE</span>
            </OptionLink>
            <OptionLink>
                <span>SIGN OUT</span>
            </OptionLink>
        </OptionsContainer>
    </HeaderContainer>
);


export default Header;

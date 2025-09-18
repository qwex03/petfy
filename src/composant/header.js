import Logo from "./Logo";
import settings from './img/settings.png';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    let navigate = useNavigate();
    
    return(
        <div className="header">
            <Logo/>
            <img className="settings" src={settings} alt="paramètres" onClick={() => navigate('/param')}></img>
        </div>
    )
}

export default Header;
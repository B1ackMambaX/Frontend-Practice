import './banner.scss';
import avengers from '../../resources/img/avengers.png';
import logo from '../../resources/img/logo.png';

const Banner = () => {
    return (
        <div className="banner">
            <div className="container">
                <div className="banner__wrapper">
                    <div className="banner__info">
                        <img src={avengers} alt="avengers" className="banner__img"/>
                        <h2 className="banner__heading">New comics every week! Stay tuned!</h2>
                    </div>
                    <img src={logo} alt="logo" className="banner__logo"/>
                </div>
            </div>
        </div>
    );
};

export default Banner;
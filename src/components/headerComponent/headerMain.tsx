import './headerMain.css';
import GreetingsComponent from './greetingsComponent/greetingsComponent';

const HeaderMain = (props:{userName: string}) => {
    return (
        <header className="header-main">
            <div className='header-main-logo'>
                <img src="https://placehold.co/36x36" alt="Logo" className="logo" />
                <p className='header-title'>Title</p>
            </div>
            <div className="header-greetings">
                <h2>{GreetingsComponent()}, {props.userName}!</h2>
            </div>
            <div>
                <a href="/login" className='header-login'>
                    Логін
                </a>
            </div>
        </header>
    )
}

export default HeaderMain

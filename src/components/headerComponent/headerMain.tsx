import './headerMain.css';
import GreetingsComponent from './greetingsComponent/greetingsComponent';

const HeaderMain = (props:{userName: string}) => {
    return (
        <header className="headerMain">
            <h2>{GreetingsComponent()}, {props.userName}!</h2>
        </header>
    )
}

export default HeaderMain

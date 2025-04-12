import './loginPage.css'
import LayoutPage from '../../../layoutPage';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';

const LoginPage = () => {
    return (
        <LayoutPage title='login'>
            <form>
               <div>
                 <label htmlFor="email">Введіть ваш email:</label>
                 <InputComponent name="email" id="email" type="email" placeholder='example@gmail.com'/>
               </div>
               <div>
                 <label htmlFor="password">Введіть ваш пароль:</label>
                 <InputComponent name="password" id="password" type="password" minLength={8} maxLength={16}/>
               </div>        
               <SubmitComponent />
            </form>
        </LayoutPage>
    )
}

export default LoginPage

import './loginPage.css'
import LayoutPage from '../../../layoutPage';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { usePersistedState } from '../../../hooks/usepersistedState';
import { UserType } from '../../../types/userTypes';
import React from 'react';
import { useNavigate } from 'react-router-dom';


const LoginPage = () => {
  const navigate = useNavigate()
    const [registeredUser] = usePersistedState<UserType>('registeredUser', {
        id: 0,
        name: '',
        email: '',
        password: '',
        categories: []
    })
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;

      if (email === registeredUser.email && password === registeredUser.password) {
        console.log('Вхід');
        navigate('/transactions');
      } else {
        console.log('Невірний email або пароль');
      }

      if (!email || !password) {
        console.log('Заповніть всі поля');
      }

    }
    return (
        <LayoutPage title='login'>
            <form onSubmit={handleSubmit}>
               <div className='login-page'>
                 <label htmlFor="email">Введіть ваш email:</label>
                 <InputComponent name="email" id="email" type="email" placeholder='example@gmail.com'/>
               </div>
               <div className='login-page'>
                 <label htmlFor="password">Введіть ваш пароль:</label>
                 <InputComponent name="password" id="password" type="password" minLength={8} maxLength={16}/>
               </div>        
               <SubmitComponent type='submit'/>
            </form>
        </LayoutPage>
    )
}

export default LoginPage

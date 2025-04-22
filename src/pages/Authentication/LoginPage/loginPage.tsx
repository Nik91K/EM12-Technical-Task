import './loginPage.css'
import LayoutPage from '../../../layoutPage';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { usePersistedState } from '../../../hooks/usepersistedState';
import { UserType } from '../../../types/userTypes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../../../components/errorComponent/errorComponent';

const LoginPage = () => {
  const [error, setError] = usePersistedState<string | null>('error', null)

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
        setError('Невірний email або пароль')
        return
      }

      if (!email || !password) {
        setError('Заповніть всі поля');
        return
      }
      if (email.length < 5 || email.length > 30, !email.includes('@'), !email.includes('.')) {
        setError('Email повинен бути від 5 до 30 символів, містити @ та .')
        return
      }
      if (password.length < 8 || password.length > 16) {
        setError('Пароль повинен бути від 8 до 16 символів');
        return
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
                {error && <ErrorComponent>{error}</ErrorComponent>}      
               <SubmitComponent type='submit'/>
            </form>
        </LayoutPage>
    )
}

export default LoginPage

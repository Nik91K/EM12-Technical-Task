import './loginPage.css'
import LayoutPage from '../../../layoutPage';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { usePersistedState } from '../../../hooks/usepersistedState';
import { UserType } from '../../../types/userTypes';
import React from 'react';


const LoginPage = () => {
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

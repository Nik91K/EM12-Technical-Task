import './loginPage.css'
import LayoutPage from '../../../layoutPage';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { usePersistedState } from '../../../hooks/usepersistedState';
import { UserType } from '../../../types/userTypes';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../../../components/errorComponent/errorComponent';
import { loginUser } from '../../../api/slices/authSlice';
import { useAppDispatch } from '../../../api/hooks';
import { RiLockPasswordLine } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';

const LoginPage = () => {
  const [textError, setError] = React.useState<string | null>(null);
  const navigate = useNavigate()
    const [registeredUser] = usePersistedState<UserType>('registeredUser', {
        id: 0,
        name: '',
        email: '',
        password: '',
        categories: []
    })

    const dispatch = useAppDispatch();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      const form = event.currentTarget;
      const email = form.email.value;
      const password = form.password.value;


      if (!email || !password) {
        setError('Заповніть всі поля');
        return
      }

      if (email.length < 5 || email.length > 30) {
        setError('Емайл повинен бути менше 5 та більше 30 символів');
        return
      }

      if (!email.includes('@') || !email.includes('.')) {
        setError('Емайл повинен містити @ та .');
        return
      }
      if (password.length < 8 || password.length > 16) {
        setError('Пароль повинен бути від 8 до 16 символів')
        return
      }

      try {
        await dispatch(loginUser({ email, password })).unwrap()
        navigate('/transactions')
      } catch (error) {
        setError
      }

      dispatch(loginUser({ email, password}))
      .unwrap()
      .then((data) => {
        console.log("Успішно зареєстровано", data)
        navigate('/transactions')
      })
      .catch((error) => {
        setError("Помилка реєстації")
      })
      
    }
    return (
        <LayoutPage title='login'>
            <form onSubmit={handleSubmit}>
              <div className='login-page-icon'>
                <MdEmail className='login-icon' />
                <InputComponent name="email" placeholder='Введіть ваш email:'/>
               </div>
               <div className='login-page'>
                <label htmlFor="password" className='login-label'>Password:</label>
                <div className='login-page-icon'>
                  <RiLockPasswordLine className='login-icon' />
                  <InputComponent name="password" type="password" placeholder='Введіть ваш пароль:'/>
                </div>
               </div>  
                {textError && <ErrorComponent>{textError}</ErrorComponent>}      
               <SubmitComponent type='submit'/>
            </form>
            <p>Don't have an account? <a href="/register" className='link'>Register!</a></p>
        </LayoutPage>
    )
}

export default LoginPage

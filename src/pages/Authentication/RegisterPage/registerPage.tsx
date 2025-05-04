import './registerPage.css';
import LayoutPage from '../../../layoutPage';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../../../components/errorComponent/errorComponent';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import { registerUser } from '../../../api/slices/authSlice';
import { getFormInputValueByName } from '../../../utils/getInput';
import React from 'react';

const RegisterPage = () => {
  const [textError, setError] = React.useState<string | null>(null)
  const navigate = useNavigate()
  const {user, loading, error} = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch();
  const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()
      let name = getFormInputValueByName(event.currentTarget, "name")
      let email = getFormInputValueByName(event.currentTarget, "email")
      let password = getFormInputValueByName(event.currentTarget, "password")
      // const { name, email, password } = userData
      
      if (!email || !password || !name) {
        setError('Заповніть всі поля')
        return
      }  
      if (!email.includes("@") || !email.includes(".")) {
        setError("Email повинен мати @ та .")
        return
      } 
      if (email.length < 5 || email.length > 30) {
        setError('Емайл повинен бути менше 5 та більше 30 символів')
        return
      }
      
      if (password.length < 8 || password.length > 16) {
        setError('Пароль повинен бути від 8 до 16 символів')
        return
      }
      dispatch(registerUser({ email, password, name}))
        .unwrap()
        .then((data) => {
          console.log("Успішно зареєстровано", data)
          navigate('/transactions')
        })
        .catch((error) => {
          console.log("Помилка реєстації", error)
        })
    }

    return (
        <LayoutPage title='Register'>
          <p>{loading && "Завантаження"}</p>
          <form onSubmit={handleSubmit} className='register-page'>
             <div className='login-page'>
               <label htmlFor="name">Введіть ім'я користувача:</label>
               <InputComponent name="name" type="text" minLength={2}/>
             </div>
             <div className='login-page'>
               <label htmlFor="email">Введіть ваш email:</label>
               <InputComponent name="email" placeholder='example@gmail.com'/>
             </div>
             <div className='login-page'>
               <label htmlFor="password">Введіть ваш пароль:</label>
               <InputComponent name="password" type="password"/>
             </div>        
              {textError && <ErrorComponent>{textError}</ErrorComponent>}
             <SubmitComponent type='submit' />
          </form>
        </LayoutPage>
    )
}

export default RegisterPage

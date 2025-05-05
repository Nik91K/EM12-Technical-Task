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
import LoaderComponent from '../../../components/loaderComponent/loaderComponent';
import { RiLockPasswordLine } from "react-icons/ri";
import { MdEmail } from "react-icons/md";
import { CiUser } from "react-icons/ci";

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

      if (!email || !password || !name) {
        setError('Заповніть всі поля')
        return
      }  
      
      if (name.length < 2) {
        setError('Username повинен бути більше 2 симовлів')
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
          setError("Помилка реєстації")
        })
    }

    return (
        <LayoutPage title='Register'>
          <div>{loading && <LoaderComponent />}</div>
          <form onSubmit={handleSubmit} className='register-page'>
             <div className='login-page'>
               <label htmlFor="name">Username:</label>
               <div className='login-page-icon'>
                <CiUser className='login-icon' />
                <InputComponent name="name" type="text" placeholder="Введіть ім'я користувача"/>
               </div>             
             </div>
             <div className='login-page'>
               <label htmlFor="email">Email:</label>
               <div className='login-page-icon'>
                <MdEmail className='login-icon' />
                <InputComponent name="email" placeholder='Введіть ваш email:'/>
               </div>
             </div>
             <div className='login-page'>
               <label htmlFor="password">Password:</label>
               <div className='login-page-icon'>
                <RiLockPasswordLine className='login-icon' />
                <InputComponent name="password" type="password" placeholder='Введіть ваш пароль:'/>
               </div>
             </div>        
              {textError && <ErrorComponent>{textError}</ErrorComponent>}
             <SubmitComponent type='submit' />
          </form>
        </LayoutPage>
    )
}

export default RegisterPage

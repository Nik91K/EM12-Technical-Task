import './registerPage.css';
import LayoutPage from '../../../layoutPage';
import { UserType } from '../../../types/userTypes';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { usePersistedState } from '../../../hooks/usepersistedState';
import { useNavigate } from 'react-router-dom';
import ErrorComponent from '../../../components/errorComponent/errorComponent';
import { useAppDispatch, useAppSelector } from '../../../api/hooks';
import { registerUser, User } from '../../../api/slices/authSlice';

const RegisterPage = () => {
    const [error, setError] = usePersistedState<string | null>('error', null)
    const navigate = useNavigate()
    const [userData, setUserData] = usePersistedState<UserType>('registeredUser', {
        id: 0,
        name: '',
        email: '',
        password: '',
        categories: []
    })

    const dispatch = useAppDispatch();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>{
      setUserData({
          ...userData,
          [event.target.name]: event.target.value,
      })
    }

    const handleSubmit = async (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()

        const { name, email, password } = userData
        
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

        try {
            await dispatch(registerUser({ name, email, password })).unwrap()
            navigate('/transactions')
        } catch (err: any) {
            setError(err)
        }
      }

    return (
        <LayoutPage title='Register'>
          <form onSubmit={handleSubmit} className='register-page'>
             <div className='login-page'>
               <label htmlFor="name">Введіть ім'я користувача:</label>
               <InputComponent name="name" id="name" type="text" minLength={2} value={userData.name} onChange={handleChange}/>
             </div>
             <div className='login-page'>
               <label htmlFor="email">Введіть ваш email:</label>
               <InputComponent name="email" id="email" type="text" placeholder='example@gmail.com' value={userData.email} onChange={handleChange}/>
             </div>
             <div className='login-page'>
               <label htmlFor="password">Введіть ваш пароль:</label>
               <InputComponent name="password" id="password" type="password" value={userData.password} onChange={handleChange}/>
             </div>        
              {error && <ErrorComponent>{error}</ErrorComponent>}
             <SubmitComponent type='submit' />
          </form>
        </LayoutPage>
    )
}

export default RegisterPage

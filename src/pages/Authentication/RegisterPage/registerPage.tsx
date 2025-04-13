import './registerPage.css';
import LayoutPage from '../../../layoutPage';
import { UserType } from '../../../types/userTypes';
import { useState } from 'react';
import InputComponent from '../../../components/inputComponent/inputComponent';
import SubmitComponent from '../../../components/submitComponent/submitComponent';
import { usePersistedState } from '../../../hooks/usepersistedState';

export function getFormInputValueByName(form: HTMLFormElement, name: string): string {
    const control = form.elements.namedItem(name) as HTMLInputElement;
    if (!control || control instanceof RadioNodeList || !("value" in control)) {
        throw new Error(`Form control "${name}" not found or was a RadioNodeList`);
    }  
    return control.value;
} 

const RegisterPage = () => {
    const [users, setUsers] = usePersistedState<UserType[]>('registeredUsers', [])
    const [userData, setUserData] = usePersistedState<UserType>('registeredUser', {
        id: 0,
        name: '',
        email: '',
        password: '',
        categories: []
      })

    const handleChange = (event:React.ChangeEvent<HTMLInputElement>) =>{
        setUserData({
          ...userData,
          [event.target.name]: event.target.value
        });
      }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault()
        const userName:string = getFormInputValueByName(event.currentTarget, "name")
        const email:string = getFormInputValueByName(event.currentTarget, "email")
        const password:string = getFormInputValueByName(event.currentTarget, "password")
    
        const newUser: UserType = {
          id: users.length + 1,
          name: userName,
          email: email,
          password: password,
          categories: []
        }
        setUsers([newUser])
        
        console.log(newUser)
      }

    return (
        <LayoutPage title='Register'>
            <form onSubmit={handleSubmit}>
               <div>
                 <label htmlFor="name">Введіть ім'я користувача:</label>
                 <InputComponent name="name" id="name" type="text" minLength={2} onChange={handleChange} value={userData.name} />
               </div>
               <div>
                 <label htmlFor="email">Введіть ваш email:</label>
                 <InputComponent name="email" id="email" type="email" placeholder='example@gmail.com' onChange={handleChange} value={userData.email} />
               </div>
               <div>
                 <label htmlFor="password">Введіть ваш пароль:</label>
                 <InputComponent name="password" id="password" type="password" minLength={8} maxLength={16} onChange={handleChange} value={userData.password}/>
               </div>        
               <SubmitComponent />
            </form>
        </LayoutPage>
    )
}

export default RegisterPage

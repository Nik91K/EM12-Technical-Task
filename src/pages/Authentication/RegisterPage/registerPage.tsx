import './registerPage.css';
import LayoutPage from '../../../layoutPage';
import { UserType } from '../../../types/userTypes';
import { useState } from 'react';

export function getFormInputValueByName(form: HTMLFormElement, name: string): string {
    const control = form.elements.namedItem(name) as HTMLInputElement;
    if (!control || control instanceof RadioNodeList || !("value" in control)) {
        throw new Error(`Form control "${name}" not found or was a RadioNodeList`);
    }  
    return control.value;
} 

const RegisterPage = () => {
    const [users, setUsers] = useState<UserType[]>([])
    const [userData, setUserData] = useState<UserType>({
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
        event.preventDefault();
        const userName:string = getFormInputValueByName(event.currentTarget, "name");
        const email:string = getFormInputValueByName(event.currentTarget, "email");
        const password:string = getFormInputValueByName(event.currentTarget, "password");
    
        const newUser: UserType = {
          id: users.length + 1,
          name: userName,
          email: email,
          password: password,
          categories: []
        }
        setUsers([...users, newUser])
        
        console.log(newUser);
      }

    return (
        <LayoutPage title='Login'>
            <form onSubmit={handleSubmit}>
               <div>
                 <label htmlFor="name">Введіть ім'я користувача:</label>
                 <input name="name" id="name" type="text" minLength={2} onChange={handleChange} value={userData.name}></input>
               </div>
               <div>
                 <label htmlFor="email">Введіть ваш email:</label>
                 <input name="email" id="email" type="email" placeholder='example@gmail.com' onChange={handleChange} value={userData.email}></input>
               </div>
               <div>
                 <label htmlFor="password">Введіть ваш пароль:</label>
                 <input name="password" id="password" type="password" minLength={8} maxLength={16} onChange={handleChange} value={userData.password}></input>
               </div>        
               <button type="submit">Відправити</button>
            </form>
        </LayoutPage>
    )
}

export default RegisterPage

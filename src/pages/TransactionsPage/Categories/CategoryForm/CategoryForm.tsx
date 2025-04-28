import './CategoryForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import { Category } from '../../../../types/categoryTypes'
import { useState } from 'react'
import CategoryList from '../CategoryList/CategoryList'
import ErrorComponent from '../../../../components/errorComponent/errorComponent'
import { useAppDispatch, useAppSelector } from '../../../../api/hooks'
import { fetchCategories } from '../../../../api/slices/categorySlice'
import { categoryReducer } from '../../../../api/slices/categorySlice'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { getFormInputValueByName } from '../../../../utils/getInput'

const CategoryForm = () => {
        const [textError, setError] = usePersistedState<string | null>('error', null)
        const dispatch = useAppDispatch()
        const [text, setText] = useState('')
        const { categories, loading, error } = useAppSelector((state) => state.category)

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    let name = getFormInputValueByName(event.currentTarget, "CategoryName")

    if (!name) {
        setError("Введіть данні")
        return
    }

    dispatch(fetchCategories({ name }))
      .unwrap()
      .then((data) => {
        console.log("Успішно створено", data)
      })
      .catch((error) => {
        console.log("Помилка категорії", error)
      })
}
    return (
        <div className='main-category-form'>
            <h2>New Category</h2>
            <p>{loading && 'Завантаження'}</p>
            <form className='category-form' onSubmit={handleSubmit}>
                <label htmlFor="category-name">Category Name:</label>
                <InputComponent 
                    type='text' 
                    name='CategoryName' 
                    id='CategoryName' 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {textError && <ErrorComponent>{textError}</ErrorComponent>}
                <SubmitComponent type='submit'/>
            </form>
        </div>
    )
}

export default CategoryForm

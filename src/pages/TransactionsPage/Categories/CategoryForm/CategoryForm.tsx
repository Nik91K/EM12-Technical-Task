import './CategoryForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import CategoryList from '../CategoryList/CategoryList'
import ErrorComponent from '../../../../components/errorComponent/errorComponent'
import { useAppDispatch, useAppSelector } from '../../../../api/hooks'
import { createCatagory } from '../../../../api/slices/categorySlice'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { getFormInputValueByName } from '../../../../utils/getInput'
import { useEffect } from 'react'
import { fetchCategories } from '../../../../api/slices/categorySlice'
import LoaderComponent from '../../../../components/loaderComponent/loaderComponent'

const CategoryForm = () => {
        const [textError, setError] = usePersistedState<string | null>('error', null)
        const dispatch = useAppDispatch()
        const { categories, loading, error } = useAppSelector((state) => state.category)

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    let name = getFormInputValueByName(event.currentTarget, "name")

    if (!name) {
        setError("Введіть данні")
        return
    }

    dispatch(createCatagory({name}))
      .unwrap()
      .then((data) => {
        console.log("Успішно створено", data)
      })
      .catch((error) => {
        console.log("Помилка категорії", error)
      })
}


useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      dispatch(fetchCategories())
    }
  }, []);

    return (
        <div className='main-category-form'>
            <h2>New Category</h2>
            <div>{loading && <LoaderComponent />}</div>
            <form className='category-form' onSubmit={handleSubmit}>
                <label htmlFor="category-name">Category Name:</label>
                <InputComponent 
                    type='text' 
                    name='name'
                />
                {textError && <ErrorComponent>{textError}</ErrorComponent>}
                <SubmitComponent type='submit'/>
            </form>
            {categories.length >0 && (
                <CategoryList />
            )}
            
        </div>
    )
}

export default CategoryForm

import './CategoryForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import { Category } from '../../../../types/categoryTypes'
import { useState } from 'react'
import CategoryList from '../CategoryList/CategoryList'
import ErrorComponent from '../../../../components/errorComponent/errorComponent'

type Props = {
    categories: Category[];
    setCategories: React.Dispatch<React.SetStateAction<Category[]>>
}

const CategoryForm = ({ categories, setCategories }: Props) => {
    const [text, setText] = useState("")
    const [error, setError] = useState<string | null>(null)

    const handleClick = () => {
        if (!text) {
            setError('Напишіть назву категорії');
            return
        }

        const newCategory: Category = {
            id: categories.length + 1,
            name: text,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: 1,
        }

        setCategories([...categories, newCategory]);
        setText('')
        setError('')
    }

    return (
        <div className='main-category-form'>
            <h2>New Category</h2>
            <form className='category-form' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="category-name">Category Name:</label>
                <InputComponent 
                    type='text' 
                    name='CategoryName' 
                    id='CategoryName' 
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                />
                {error && <ErrorComponent>{error}</ErrorComponent>}
                <SubmitComponent type='submit' onClick={handleClick}/>
            </form>
            <CategoryList categories={categories} setCategories={setCategories}/>
        </div>
    )
}

export default CategoryForm

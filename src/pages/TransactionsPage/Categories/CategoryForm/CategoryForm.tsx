import './CategoryForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import { Category } from '../../../../types/categoryTypes'
import { useState } from 'react'
import CategoryList from '../CategoryList/CategoryList'

const CategoryForm = () => {
    const [text, setText] = useState("");
    const [categories, setCategories] = useState<Category[]>([])
    const handleClick = () => {
        if (text.trim() === "") return;

        const newCategories: Category = {
            id: categories.length + 1,
            name: text,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            userId: 1,
        };

        setCategories([...categories, newCategories])
        setText("")
    }
    return (
        <div  className='main-category-form'>
            <h2>New Category</h2>
            <form className='category-form' onSubmit={(e) => e.preventDefault()}>
                <label htmlFor="category-name">Category Name:</label>
                <InputComponent type='text' 
                name='CategoryName' 
                id='CategoryName' 
                value={text}
                onChange={(e) => setText(e.target.value)}
                />
                <SubmitComponent type='submit' onClick={handleClick}/>
            </form>
            <CategoryList categories={categories} setCategories={setCategories}/>
        </div>
    )
}

export default CategoryForm

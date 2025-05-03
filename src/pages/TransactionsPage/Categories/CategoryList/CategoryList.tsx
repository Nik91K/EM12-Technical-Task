import './CategoryList.css'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'
import { useEffect } from 'react'
import { fetchCategories } from '../../../../api/slices/categorySlice'
import { useAppSelector, useAppDispatch } from '../../../../api/hooks'


const CategoryList = () => {
    const { categories, loading, error } = useAppSelector((state) => state.category)


    return (
        <div className='category-list-main'>
            <h2>Category List</h2>
            <p>{ loading && 'Завантаження'}</p>
            <p className="error">{error && error}</p>
            <ul className='category-list'>
                {categories.map((category) => (
                    <li key={category.id} className='category-item'>
                        <span>{category.name}</span>
                        <DeleteComponent/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList

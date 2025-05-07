import './CategoryList.css'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'
import { useAppSelector } from '../../../../api/hooks'
import LoaderComponent from '../../../../components/loaderComponent/loaderComponent'
import { deleteCategory, fetchCategories } from '../../../../api/slices/categorySlice'
import { AsyncThunkAction, ThunkDispatch, UnknownAction } from '@reduxjs/toolkit'
import { useAppDispatch } from '../../../../api/hooks'
import { useEffect } from 'react'

const CategoryList = () => {
    const { categories, loading, error } = useAppSelector((state) => state.category)
    const dispatch = useAppDispatch()

    const HandleDelete = (e:React.MouseEvent<HTMLButtonElement>, categoryId: number) => {
        e.preventDefault()
        dispatch(deleteCategory(categoryId)).unwrap().then(() => {
            dispatch(fetchCategories())
        }
        ).catch((error) => {
            console.log("Error deleting category:", error)
        })

    }

    useEffect(() => {
        dispatch(fetchCategories())
    }, [dispatch])

    return (
        <div className='category-list-main'>
            <h2>Category List</h2>
            <p className="error">{error && error}</p>
            <ul className='category-list'>
            <div>{ loading && <LoaderComponent />}</div>
                {categories.map((category) => (
                    <li key={category.id} className='category-item'>
                        <span>{category.name}</span>
                        <DeleteComponent onClick={HandleDelete} id={category.id}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default CategoryList

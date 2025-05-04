import './CategoryList.css'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'
import { useAppSelector } from '../../../../api/hooks'
import LoaderComponent from '../../../../components/loaderComponent/loaderComponent'


const CategoryList = () => {
    const { categories, loading, error } = useAppSelector((state) => state.category)


    return (
        <div className='category-list-main'>
            <h2>Category List</h2>
            <div>{ loading && <LoaderComponent />}</div>
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

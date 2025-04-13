import './CategoryList.css'
import { Category } from '../../../../types/categoryTypes'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'

const CategoryList = ({ categories, setCategories }: {categories: Category[], setCategories: Function}) => {
    function handleDelete(taskId: number) {
        console.log('завдання Ід видалено', taskId)
        setCategories(categories.filter((t) => t.id !== taskId))
    }
    return (
        <div className='category-list-main'>
            <h2>Category List</h2>
            {categories.map((category) => (
                <div className='category-list'>
                    <p>{category.name}</p>
                    <DeleteComponent onClick={() => handleDelete(category.id)}/>
                </div>
            ))}
        </div>
    )
}

export default CategoryList

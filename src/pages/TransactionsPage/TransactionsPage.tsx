import './TransactionsPage.css'
import LayoutPage from '../../layoutPage'
import CategoryForm from './Categories/CategoryForm/CategoryForm'
import TransactionForm from './Transactions/TransactionForm/TransactionForm'
import { usePersistedState } from '../../hooks/usepersistedState'
import { Category } from '../../types/categoryTypes'

const TransactionsPage = () => {
    const [categories, setCategories] = usePersistedState<Category[]>('categories', [])
    return (
        <LayoutPage title="Головна стонка">
            <div className="category-page">
                <CategoryForm categories={categories} setCategories={setCategories} />
                <div className="transaction-page">
                    <TransactionForm categories={categories}/>
                </div>
            </div> 
        </LayoutPage>
    )
}

export default TransactionsPage

import './TransactionsPage.css'
import LayoutPage from '../../layoutPage'
import CategoryForm from './Categories/CategoryForm/CategoryForm'
import TransactionForm from './Transactions/TransactionForm/TransactionForm'
import { usePersistedState } from '../../hooks/usepersistedState'
import { Category } from '../../types/categoryTypes'
import TransactionChart from './Transactions/TransactionChart/TransactionChart'

const TransactionsPage = () => {
    return (
        <LayoutPage title="Головна стонка">
            <div className="category-page">
                <CategoryForm  />
                <div className="transaction-page">
                    <TransactionForm />
                    
                </div>
            </div> 
        </LayoutPage>
    )
}

export default TransactionsPage

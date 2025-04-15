import './TransactionsPage.css'
import LayoutPage from '../../layoutPage'
import CategoryForm from './Categories/CategoryForm/CategoryForm'
import TransactionForm from './Transactions/TransactionForm/TransactionForm'
import TransactionList from './Transactions/TransactionList/TransactionList'
import { usePersistedState } from '../../hooks/usepersistedState'
import { TransactionType } from '../../types/transactionType'

const TransactionsPage = () => {
    return (
        <LayoutPage title="Головна стонка">
            <div className="category-page">
                <CategoryForm />
                <div className="transaction-page">
                    <TransactionForm />
                    <TransactionList />
                </div>
            </div> 
        </LayoutPage>
    )
}

export default TransactionsPage

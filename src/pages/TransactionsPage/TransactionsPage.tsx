import './TransactionsPage.css'
import LayoutPage from '../../layoutPage'
import CategoryForm from './Categories/CategoryForm/CategoryForm'

const TransactionsPage = () => {
    return (
        <LayoutPage title="Головна стонка">
            <div className="transactions-page">
                <CategoryForm />
            </div>
        </LayoutPage>
    )
}

export default TransactionsPage

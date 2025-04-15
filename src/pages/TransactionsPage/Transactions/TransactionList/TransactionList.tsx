import './TransactionList.css'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { TransactionType } from '../../../../types/transactionType'

const TransactionList = () => {
    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>
            <ul>
                <li>
                    <span>.</span>
                </li>
            </ul>
        </div>
    )
}

export default TransactionList

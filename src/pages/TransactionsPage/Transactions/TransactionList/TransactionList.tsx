import './TransactionList.css'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { TransactionType } from '../../../../types/transactionType'

const TransactionList = () => {
    const [transactions] = usePersistedState<TransactionType[]>('transaction', []);

    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.id}>
                        <span>{transaction.category?.name || 'Не має категорії'}</span>
                        <span>{transaction.value}</span>
                        <span>{transaction.date}</span>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList

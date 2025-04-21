import './TransactionList.css'
// import { usePersistedState } from '../../../../hooks/usepersistedState'
import { TransactionType } from '../../../../types/transactionType'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'

const TransactionList = ({transaction, setTransaction}: { transaction: TransactionType[], setTransaction: (t: TransactionType[]) => void }) => {

    function handleDelete (id: number){
        console.log('Транзацкція ІД видалена:', id);
        setTransaction(transaction.filter((t) => t.id !== id))
    }
    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>
            <ul>
                {transaction.map((transaction) => (
                    <li key={transaction.id}>
                        <div>
                            <span>{transaction.category?.name || 'Не має категорії'}</span>
                            <span>{transaction.value}</span>
                            <span>{transaction.date}</span>
                        </div>
                        <DeleteComponent onClick={() => handleDelete(transaction.id)}/>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList

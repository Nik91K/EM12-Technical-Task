import './TransactionList.css'
import { useAppSelector } from '../../../../api/hooks'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'
import LoaderComponent from '../../../../components/loaderComponent/loaderComponent'
const TransactionList = () => {
    const { loading, error, transaction } = useAppSelector((state) => state.transaction)

    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>
            <ul>
                {transaction.map((transaction) => (
                    <li key={transaction.id}>
                        <p>{loading && <LoaderComponent />}</p>
                        <div>
                            <p>{transaction.date}</p>
                            <p>{transaction.value}</p>
                            <p>{transaction.type.name}</p> 
                            <p>{transaction.category.name}</p>       
                        </div>
                        <DeleteComponent />
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList

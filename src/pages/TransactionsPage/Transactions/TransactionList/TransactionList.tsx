import './TransactionList.css'
import { useAppSelector, useAppDispatch } from '../../../../api/hooks'
import DeleteComponent from '../../../../components/deleteComponent/DeleteComponent'
import LoaderComponent from '../../../../components/loaderComponent/loaderComponent'
import { deleteTransaction, fetchTransaction } from '../../../../api/slices/transactionSlice'
const TransactionList = () => {
    const { loading, error, transaction } = useAppSelector((state) => state.transaction)
    const dispatch = useAppDispatch()

    const HandleDelete = (e: React.MouseEvent<HTMLButtonElement>, transactionId: number) => {
        e.preventDefault()
        dispatch(deleteTransaction(transactionId)).unwrap().then(() => {
            dispatch(fetchTransaction())
        }
        ).catch((error) => {
            console.log("Error deleting transaction:", error)
        })
    }
    return (
        <div className="transaction-list">
            <h2>Transaction List</h2>
            <ul>
                {transaction.map((transaction) => (
                    <li key={transaction.id}>
                        {loading && (<div> <LoaderComponent /> </div>)}
                        <div>
                            <p>{transaction.date}</p>
                            <p>{transaction.value}</p>
                            <p>{transaction.type.name}</p> 
                            <p>{transaction.category.name}</p> 
                            <DeleteComponent onClick={HandleDelete} id={transaction.id}/>      
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default TransactionList

import './TransactionForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import SelectComponent from '../../../../components/SelectComponent/SelectComponent'
import { Category } from '../../../../types/categoryTypes'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { TransactionType } from '../../../../types/transactionType'
import InputComponent from '../../../../components/inputComponent/inputComponent'

const TransactionForm = () => {
    const typeSelect = [
        { id: 1, name: 'income' as const },
        { id: 2, name: 'expense' as const }
    ]
    
    const [transaction, setTransaction] = usePersistedState<TransactionType[]>('transaction', [])
    const [categories] = usePersistedState<Category[]>('categories', [])


    const handleClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const form = e.currentTarget
        const type = form['transaction-type'].value
        const categoryName = form['transaction-type'].value
        const value = Number(form['value'].value)
        const date = form['date'].value

        const category = categories.find(cat => cat.name === categoryName)

        if (!category) {
            console.log('Оберіть категорію')
            return
        }

        const newTransaction: TransactionType = {
            id: transaction.length + 1,
            category: category,
            value: value,
            date: date,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            type: {
                id: 0,
                name: 'income'
            }
        }

        setTransaction([...transaction, newTransaction]);
        console.log('усе спрацювало')
        form.reset()
    }

    return (
        <div>
            <form className='transaction-form' onSubmit={handleClick}>
                <h2>New Transaction</h2>
                <div className='transaction-group'>
                    <select name="transaction-type" id="transaction-type" required>
                        <option value="expense"> Оберіть категорію</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                    </select>
                    <SelectComponent typeSelect={typeSelect}/>
                </div>
                <div className='transaction-group'>
                    <InputComponent type="date" id="date" name="date" placeholder='Дата' />
                </div>
                <div className='transaction-group'>
                    <label htmlFor="value">Value</label>
                    <InputComponent type="number" id="value" name="value" />
                </div>
                <SubmitComponent />
            </form>
        </div>
    )
}

export default TransactionForm

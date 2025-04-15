import './TransactionForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import SelectComponent from '../../../../components/SelectComponent/SelectComponent'
import { Category } from '../../../../types/categoryTypes'
import { usePersistedState } from '../../../../hooks/usepersistedState'

const TransactionForm = () => {
    const typeSelect = [
        { id: 1, name: 'income' as const },
        { id: 2, name: 'expense' as const }
    ]
    
    const [categories] = usePersistedState<Category[]>('categories', [])
    return (
        <div>
            <form className='transaction-form'>
                <h2>New Transaction</h2>
                <div className='transaction-group'>
                    <label htmlFor="transaction-type">Type</label>
                    <select name="transaction-type" id="transaction-type" required>
                        <option value="expense"> </option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                    </select>
                </div>
                <div className='transaction-group'>
                    <SelectComponent typeSelect={typeSelect}/>
                </div>
                <div className='transaction-group'>
                    <input type="date" id="date" name="date" placeholder='Дата' required />
                </div>
                <div className='transaction-group'>
                    <label htmlFor="value">Value</label>
                    <input type="number" id="value" name="value" required />
                </div>
                <SubmitComponent />
            </form>
        </div>
    )
}

export default TransactionForm

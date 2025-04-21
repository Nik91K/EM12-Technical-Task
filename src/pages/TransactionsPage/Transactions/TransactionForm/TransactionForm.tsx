import './TransactionForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import SelectComponent from '../../../../components/SelectComponent/SelectComponent'
import { Category } from '../../../../types/categoryTypes'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { TransactionType } from '../../../../types/transactionType'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import TransactionList from '../TransactionList/TransactionList'
import { useState } from 'react'

const TransactionForm = () => {
    const typeSelect = [
        { id: 1, name: 'income' as const },
        { id: 2, name: 'expense' as const }
    ]
    
    const [transaction, setTransaction] = usePersistedState<TransactionType[]>('transaction', [])
    const [categories] = usePersistedState<Category[]>('categories', [])
    const [selectedCategory, setSelectedCategory] = useState("");
    const [selectedType, setSelectedType] = useState<"income" | "expense">("income");
    const [value, setValue] = useState(0);
    const [date, setDate] = useState("");

    const handleClick = () => {
        const category = categories.find(cat => cat.name === selectedCategory);
        const typeObj = typeSelect.find(t => t.name === selectedType);    

        if (!category || !typeObj) {
            console.log('Заповніть всі поля')
            return
        }

        const newForm: TransactionType = {
            id: transaction.length + 1,
            type: typeObj,         
            value: value,
            date: date,
            category: category,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        setTransaction([...transaction, newForm])
        setSelectedCategory("");
        setValue(0);
        setDate("");
        console.log(newForm)
        

    }


    return (
        <div>
            <form className='transaction-form' onSubmit={(e) => e.preventDefault()}>
                <h2>New Transaction</h2>
                <div className='transaction-group'>
                    <select name="transaction-type" id="transaction-type" value={selectedCategory} 
                    onChange={(e) => setSelectedCategory(e.target.value)} required>
                    <option value="expense"> Оберіть категорію</option>
                    {categories.map((category) => (
                        <option key={category.id} value={category.name}>
                            {category.name}
                        </option>
                    ))}
                    </select>
                    <SelectComponent typeSelect={typeSelect} />
                </div>
                <div className='transaction-group'>
                    <InputComponent type="date" id="date" name="date" placeholder='Дата' onChange={(e) => setDate(e.target.value)}/>
                </div>
                <div className='transaction-group'>
                    <label htmlFor="value">Value</label>
                    <InputComponent type="number" id="value" name="value" onChange={(e) => setValue(Number(e.target.value))}/>
                </div>
                <div>
                    {/* {error && <p className='error'>{error}</p>} */}
                </div>
                <SubmitComponent type='submit' onClick={handleClick}/>
            </form>
            <TransactionList transaction={transaction} setTransaction={setTransaction}/>
        </div>
    )
}

export default TransactionForm

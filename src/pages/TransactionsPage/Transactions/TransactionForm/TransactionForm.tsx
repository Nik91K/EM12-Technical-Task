import './TransactionForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import SelectComponent from '../../../../components/SelectComponent/SelectComponent'
import { Category } from '../../../../types/categoryTypes'
import { usePersistedState } from '../../../../hooks/usepersistedState'
import { TransactionType } from '../../../../types/transactionType'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import TransactionList from '../TransactionList/TransactionList'
import { useState } from 'react'
import ErrorComponent from '../../../../components/errorComponent/errorComponent'
import TransactionChart from '../TransactionChart/TransactionChart'

const TransactionForm = ({ categories }: {categories: Category[]}) => {
    console.log("Категорії у формі:", categories);

    const typeSelect = [
        { id: 1, name: 'income' as const },
        { id: 2, name: 'expense' as const }
    ]
    
    const [transaction, setTransaction] = usePersistedState<TransactionType[]>('transaction', [])
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedType, setSelectedType] = useState<"income" | "expense">("income");
    const [value, setValue] = useState(0);
    const [date, setDate] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);

    const handleClick = () => {
        const category = categories.find(cat => cat.name === selectedCategory);
        const typeObj = typeSelect.find(t => t.name === selectedType);    

        if (!category || !typeObj || !value || !date) {
            setError('Заповніть всі поля')
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
        setSelectedCategory('');
        setValue(0);
        setDate('');
        console.log(newForm)
        setError('')

        const updatedTransactions = [...transaction, newForm];
        setTransaction(updatedTransactions);
            
        const totalIncome = updatedTransactions
          .filter(t => t.type.name === 'income')
          .reduce((acc, curr) => acc + curr.value, 0)
            
        const totalExpense = updatedTransactions
          .filter(t => t.type.name === 'expense')
          .reduce((acc, curr) => acc + curr.value, 0)
            
        setTotalIncome(totalIncome)
        setTotalExpense(totalExpense)
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
                    {error && <ErrorComponent>{error}</ErrorComponent>}
                </div>
                <SubmitComponent type='submit' onClick={handleClick}/>
            </form>
            <TransactionList transaction={transaction} setTransaction={setTransaction}/>
            <TransactionChart income={totalIncome} expense={totalExpense} />
        </div>
    )
}

export default TransactionForm

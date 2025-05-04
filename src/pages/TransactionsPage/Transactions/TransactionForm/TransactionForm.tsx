import './TransactionForm.css'
import SubmitComponent from '../../../../components/submitComponent/submitComponent'
import SelectComponent from '../../../../components/SelectComponent/SelectComponent'
import { getFormInputValueByName } from '../../../../utils/getInput'
import InputComponent from '../../../../components/inputComponent/inputComponent'
import ErrorComponent from '../../../../components/errorComponent/errorComponent'
import React, { useEffect } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../api/hooks'
import { fetchCategories } from '../../../../api/slices/categorySlice'
import { createTransaction } from '../../../../api/slices/transactionSlice'

const TransactionForm = () => {
    const [textError, setError] = React.useState<string | null>(null)
    const { categories, loading, error } = useAppSelector((state) => state.category)
    const dispatch = useAppDispatch()

    const typeSelect = [
        { id: 1, name: 'Income' as const },
        { id: 2, name: 'Expense' as const }
    ]   


    const handleSubmit = (event:React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const categoryId = Number(getFormInputValueByName(event.currentTarget, "transaction-type"))
    const typeId = Number(getFormInputValueByName(event.currentTarget, "type"))
    const type = typeSelect.find(t => t.id === typeId)?.name
    const date = getFormInputValueByName(event.currentTarget, 'date')
    const value = Number(getFormInputValueByName(event.currentTarget, 'value'))

    if (!categoryId || !type || !date || !value) {
      setError('Всі поля повинні бути заповнені')
      return
    }

    dispatch(createTransaction({ type, categoryId, date, value }))
      .unwrap()
      .then((data) => {
        console.log("Успішно створено:", data)
        setError(null)
      })
      .catch((error) => {
        console.log("Помилка створення:", error)
        setError("Сталася помилка при створенні транзакції")
      })
    }

    return (
        <div>
            <p>{loading && 'Заавантаження'}</p>
            <form className='transaction-form' onSubmit={handleSubmit}>
                <h2>New Transaction</h2>
                <div className='transaction-group'>
                    <select name="transaction-type"  required>
                        <option value="expense"> Оберіть категорію</option>
                        {categories.map((category) => (
                          <option key={category.id} value={category.id}>
                            {category.name}
                          </option>
                        ))}
                    </select>
                    
                    <SelectComponent typeSelect={typeSelect} name="type" />
                </div>
                <div className='transaction-group'>
                    <InputComponent type="date" name="date" placeholder='Дата'/>
                </div>
                <div className='transaction-group'>
                    <label htmlFor="value">Value</label>
                    <InputComponent type="number" name="value"/>
                </div>
                <div>
                    {textError && <ErrorComponent>{textError}</ErrorComponent>}
                </div>
                <SubmitComponent type='submit' />
            </form>
        </div>
    )
}

export default TransactionForm

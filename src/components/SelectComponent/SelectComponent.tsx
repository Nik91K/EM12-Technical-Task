import './SelectComponent.css';
import { Type } from '../../types/type';
import React from 'react';
import { useState } from 'react';

const SelectComponent = ({typeSelect}: {typeSelect:Type[]}) => {
    const [selectedType, setSelectedType] = useState<Type | null>(null)
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectID = Number(event.target.value)
        const selectF = typeSelect.find(t => t.id == selectID)
        if (selectF) {
            setSelectedType(selectF)
            console.log(selectF)
        }
    }
    return (
        <select onChange={handleChange}>
            <option value=''>Оберіть тип</option>
            {typeSelect.map((t) => (
                <option key={t.id} value={t.id}>
                {t.name === 'income' ? 'Дохід' : 'Витрата'}
                </option>
            ))
            }
        </select>
    )
}

export default SelectComponent

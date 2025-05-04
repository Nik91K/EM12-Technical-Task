import './SelectComponent.css'
import { Type } from '../../types/type'
import React, { useState } from 'react'

const SelectComponent = ({ typeSelect, name }: { typeSelect: Type[], name?: string }) => {
    const [selectedType, setSelectedType] = useState<Type | null>(null)

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectID = Number(event.target.value);
        const selectedType = typeSelect.find(t => t.id === selectID)
        if (selectedType) {
            setSelectedType(selectedType)
        }
    }

    return (
        <select name={name} onChange={handleChange}>
            <option value=''>Оберіть тип</option>
            {typeSelect.map((t) => (
                <option key={t.id} value={t.id}>
                    {t.name === 'Income' ? 'Дохід' : 'Витрата'}
                </option>
            ))}
        </select>
    );
}

export default SelectComponent;

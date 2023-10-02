import React, { useState } from 'react'
import { FormularioAuditorio } from '../../componets/FormularioAuditorio';

const Crear = () => {
    const [isEditMode, setIsEditMode] = useState(false);
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Cliente</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo le permite registrar un nuevo cliente</p>
            <FormularioAuditorio isEditMode = {isEditMode} />
        </div>
    )
}

export default Crear
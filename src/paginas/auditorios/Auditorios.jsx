import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import TablaAuditorio from '../../componets/TablaAuditorio';

const Auditorios = () => {

    return (
        <div>
        <h1 className='font-black text-4xl text-gray-500'>Auditorios</h1>
        <hr className='my-4' />
        <p className='mb-8'>Este módulo le permite listar conferencistas registrados</p>
        <TablaAuditorio/>
    </div>
    )
}

export default Auditorios
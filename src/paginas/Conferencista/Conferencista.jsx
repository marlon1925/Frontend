import React from 'react'
import TablaConferencista from '../../componets/TablaConferencista'

const Conferencista = () => {
    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Conferencistas</h1>
            <hr className='my-4' />
            <p className='mb-8'>Este módulo le permite listar conferencistas registrados</p>
            <TablaConferencista/>
        </div>
    )
}

export default Conferencista
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Mensaje from '../../componets/Alertas/Mensaje';
import axios from 'axios';
import { FormularioAuditorio } from '../../componets/FormularioAuditorio';



const ActualizarAuditorio = () => {
    const { id } = useParams()
    const [auditorio, setAuditorio] = useState({})
    const [mensaje, setMensaje] = useState({})
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        const consultarAuditorio = async () => {
            try {
                const token = localStorage.getItem('token')
                const url = `${import.meta.env.VITE_BACKEND_URL}/auditorio/${id}`
                const options = {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                }
                const respuesta = await axios.get(url, options)
                setAuditorio(respuesta.data);
                setIsEditMode(true); // Establecer el modo de edición en true
            } catch (error) {
                setMensaje({ respuesta: error.response.data.msg, tipo: false })
            }
        }
        consultarAuditorio()
    }, [])


    return (
        <div>
            <h1 className='font-black text-4xl text-gray-500'>Updated Patient</h1>
            <hr className='my-4' />
            <p className='mb-8'>This module allows you to update the data of a registered patient</p>
            {
                Object.keys(auditorio).length != 0 ?
                    (
                        <FormularioAuditorio auditorio={auditorio} isEditMode={isEditMode}/>
                    )
                    :
                    (
                        Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>
                    )
            }
        </div>

    )
}

export default ActualizarAuditorio
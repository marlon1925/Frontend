import { useContext, useState, useEffect } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form';
import AuthContext from "../context/AuthProvider"
import axios from 'axios';
import Mensaje from "./Alertas/Mensaje";
import { da } from "date-fns/locale";

export const FormularioAuditorio = ({ paciente, isEditMode }) => {

    const { auth } = useContext(AuthContext);
    const navigate = useNavigate();
    const { handleSubmit, control, setValue } = useForm();
    const [mensaje, setMensaje] = useState({});
    console.log(isEditMode)

    useEffect(() => {
        console.log(isEditMode)
        if (paciente) {
            Object.keys(paciente).forEach(key => {
                setValue(key, paciente[key]);
            });
        }
    }, [paciente, setValue]);

    const onSubmit = async (data) => {
        try {
            // Elimina espacios al inicio y al final para registrar en el json
            const trimmedData = Object.keys(data).reduce((acc, key) => {
                acc[key] = typeof data[key] === 'string' ? data[key].trim() : data[key];
                return acc;
            }, {});

            // Obtener la lista actual de pacientes
            const token = localStorage.getItem("token");
            const url = `${import.meta.env.VITE_BACKEND_URL}/auditorios`;
            const options = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };
            const response = await axios.get(url, options);
            const pacientesExistente = response.data;


            // validar paciente duplicado
            const duplicado = pacientesExistente.some((pacienteExistente) => {
                if (!isEditMode) {
                    // Aquí, verifica la condición si NO estás en modo de edición

                    return (
                        pacienteExistente.nombre.toLowerCase() === data.nombre.toLowerCase() ||
                        pacienteExistente.codigo.toLowerCase() === data.codigo.toLowerCase());
                }
            });

            if (duplicado) {
                setMensaje({
                    respuesta: "Ya existe un auditorio con el mismo nombre",
                    tipo: false,
                });
                return;
            } 

            // Solicitud al endpoint
            if (paciente?._id) {
                const token = localStorage.getItem("token");
                const url = `${import.meta.env.VITE_BACKEND_URL}/auditorio/actualizar/${paciente._id}`;
                const options = {
                    headers: {
                        method: "PUT",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.put(url, trimmedData, options);
                navigate("/dashboard");
            } else {
                const token = localStorage.getItem("token");
                trimmedData.id = auth._id;
                console.log("soy la dataaaaa", trimmedData)
                const url = `${import.meta.env.VITE_BACKEND_URL}/auditorio/registro`;
                const options = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                };
                await axios.post(url, trimmedData, options);
                navigate("/dashboard");
            }
        } catch (error) {
            setMensaje({ respuesta: error.response.data.msg, tipo: false });
            setTimeout(() => {
                setMensaje({});
            }, 3000);
        }
    };
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {Object.keys(mensaje).length > 0 && <Mensaje tipo={mensaje.tipo}>{mensaje.respuesta}</Mensaje>}
            <div>

                <div className="flex justify-end">
                    <Link to="/dashboard" className="bg-yellow-500 px-4 py-2 text-white rounded">Enlistar auditorios</Link>
                </div>
                <p className='mb-8'>Este módulo le permite registrar un nuevo auditorio</p>

                <label
                    htmlFor='codigo:'
                    className='text-gray-700  font-bold text-sm'>Codigo: </label>
                <Controller
                    name='codigo'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='nombre'
                                maxLength={20}
                                disabled={isEditMode}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='nombre:'
                    className='text-gray-700  font-bold text-sm'>Nombre: </label>
                <Controller
                    name='nombre'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='nombre'
                                maxLength={20}
                                disabled={isEditMode}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>

            <div>
                <label
                    htmlFor='ubicacion:'
                    className='text-gray-700  font-bold text-sm'>Ubicacion: </label>
                <Controller
                    name='ubicacion'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Apellido'
                                disabled={isEditMode}
                                maxLength={20}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='capacidad:'
                    className='text-gray-700  font-bold text-sm'>Capacidad: </label>
                <Controller
                    name='cedula'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            // value: /^[0-9]+$/,
                            // message: 'Ingrese solo números',
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras',
                        },
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='cedula'
                                disabled={isEditMode}
                                maxLength={20}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            {/* <div>
                <label
                    htmlFor='ciudad:'
                    className='text-gray-700  font-bold text-sm'>Ciudad: </label>
                <Controller
                    name='ciudad'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Ciudad'
                                disabled={isEditMode}
                                maxLength={20}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div> */}
            {/* <div>
                <label
                    htmlFor='email:'
                    className='text-gray-700  font-bold text-sm'>Email: </label>
                <Controller
                    name='email'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                            message: 'Correo electrónico no valido',
                        },

                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="email"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Correo electrónico'
                                maxLength={100}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='direccion:'
                    className='text-gray-700  font-bold text-sm'>Dirección: </label>
                <Controller
                    name='direccion'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[A-Za-z\s]+$/,
                            message: 'Ingrese solo letras',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Ciudad'
                                disabled={isEditMode}
                                maxLength={20}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>
            <div>
                <label
                    htmlFor='telefono:'
                    className='text-gray-700  font-bold text-sm'>Telefono: </label>
                <Controller
                    name='celular'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido',
                        pattern: {
                            value: /^[0-9]{10}$/,
                            message: 'Valid phone with 10 digits',
                        }
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <input
                                {...field}
                                type="text"
                                placeholder='Telefono'
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div> */}
            <div>
                <label
                    htmlFor='descripcion:'
                    className='text-gray-700 font-bold text-sm'>Descripcion:</label>
                <Controller
                    name='descripcion'
                    control={control}
                    defaultValue=''
                    rules={{
                        required: 'Campo requerido'
                    }}
                    render={({ field, fieldState }) => (
                        <div>
                            <textarea
                                {...field}
                                className={`border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md mb-5 ${fieldState.invalid ? 'border-red-500' : ''
                                    }`}
                                placeholder='Fecha de nacimiento'
                                maxLength={200}
                            />
                            {fieldState.error && (
                                <p className="text-red-500 text-sm">{fieldState.error.message}</p>
                            )}
                        </div>
                    )}
                />
            </div>



            <input
                type="submit"
                className='bg-gray-600 w-full p-3 text-slate-300  font-bold rounded-lg hover:bg-gray-900 cursor-pointer transition-all'
                value={paciente?._id ? 'Actualizar auditorio' : 'Registrar auditorio'}
            />

        </form>
    )
}

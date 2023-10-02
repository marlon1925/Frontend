import logoDarkMode from '../assets/dark.png'
import logoTortuga from '../assets/Image_extra.png'
import logoConferencia from '../assets/conferencia.jpg'
import logoConferencia1 from '../assets/coferencia1.jpg'
import logoConferencia2 from '../assets/coferencia2.jpg'



import { useState } from 'react'
import { Link } from 'react-router-dom'

export const LandinPage = () => {
    const [darkMode, setdarkMode] = useState(false)
    return (
        <div className={darkMode ? "dark" : ""}>

            <main className='bg-white px-10 md:px-20 lg:px-40 dark:bg-gray-800'>
                <section>

                    <nav className='p-10 mb-12 flex justify-between items-center'>
                        <div className='flex items-center space-x-4'>
                            <h1 className='text-4xl font-extrabold dark:text-white text-teal-500 tracking-wide'>CONFERENCIAS</h1>
                            <img src={logoTortuga} alt="logo-vet" width={60} height={60} className='dark:border-2 border-teal-300 rounded-full ml-4' />
                        </div>
                        <ul className='flex items-center'>
                            <li><img onClick={() => setdarkMode(!darkMode)} className='cursor-pointer' src={logoDarkMode} alt="logo" width={50} height={50} /></li>
                            <li><Link to="/login" className='bg-gray-600 text-slate-400 px-8 py-3 rounded-full ml-8 hover:bg-gray-900 hover:text-white' href="#">Login</Link></li>
                        </ul>
                    </nav>


                    <div className='text-center'>
                        <h2 className='text-5xl py-2 text-teal-600 font-medium md:text-6xl'>"Sistema de gestión de conferencias."</h2>
                   


                        <p className='text-md py-5 leading-8 text-gray-800 md:text-xl max-w-lg mx-auto dark:text-white'>

                            "Bienvenido al sistema de gestión de conferencias, reserva tu conferencia de forma ágil y segura"
                        </p>
                    </div>

                    <div className='grid grid-cols-3 gap-4'>
              
                        <div className='col-span-1 relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                            <img src={logoConferencia} alt="logo-rocket" />
                        </div>
                        
                        <div className='col-span-1 relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                            <img src={logoConferencia1} alt="logo-rocket" />
                        </div>
                        
                        <div className='col-span-1 relative mx-auto bg-gradient-to-b from-indigo-400 rounded-full w-80 h-80 mt-12 overflow-hidden md:w-96 md:h-96 dark:border-4 border-teal-300'>
                            <img src={logoConferencia2} alt="logo-rocket" />
                        </div>
               
                    </div>
        
                </section>
            </main>

        </div>

    )
}
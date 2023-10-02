import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './layout/Auth'
import Login from './paginas/Login'
import { LandinPage } from './paginas/LandinPage'
import { Register } from './paginas/Register'
import { Forgot } from './paginas/usuario/Forgot'
import { NotFound } from './paginas/NotFound'
import Dashboard from './layout/Dashboard'
import Conferencista from './paginas/Conferencista/Conferencista'
import Visualizar from './paginas/usuario/Visualizar'
import Reservas from './paginas/reservas/Reservas'
import ActualizarAuditorio from './paginas/auditorios/Actualizar'
import Cliente from './paginas/auditorios/Auditorios'
import { Confirmar } from './paginas/usuario/Confirmar'
import Restablecer from './paginas/usuario/Restablecer'
import { AuthProvider } from './context/AuthProvider'
import { PrivateRoute } from './routes/PrivateRoute'
import { FormularioAuditorio } from './componets/FormularioAuditorio'
import { useState } from 'react'
import TablaAuditorio from './componets/TablaAuditorio'



function App() {
  const [isEditMode, setIsEditMode] = useState(false);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Routes>

            <Route index element={<LandinPage />} />

            <Route path='/' element={<Auth />}>
              <Route path='login' element={<Login />} />
              <Route path='register' element={<Register />} />
              <Route path='forgot/:id' element={<Forgot />} />
              <Route path='confirmar/:token' element={<Confirmar />} />
              <Route path='recuperar-password/:token' element={<Restablecer />} />
              <Route path='*' element={<NotFound />} />
            </Route>

            <Route path='dashboard/*' element={
              <PrivateRoute>
                <Routes>
                  <Route element={<Dashboard />}>
                    <Route index element={<Cliente />} />
                    <Route path='conferencista' element={<Conferencista />} />
                    <Route path='listarClientes' element={<TablaAuditorio />} />
                    <Route path='visualizar/:id' element={<Visualizar />} />
                    <Route path="formularioAuditorio" element={<FormularioAuditorio isEditMode={isEditMode} />} />
                    <Route path='reservas' element={<Reservas />} />
                    <Route path='actualizar/auditorio/:id' element={<ActualizarAuditorio />} />
                  </Route>
                </Routes>
              </PrivateRoute>
            } />




          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  )
}

export default App

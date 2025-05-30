import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import Registration from './Components/Registration.jsx'
import UserContextApi from './Context/UserContextApi.jsx'

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path='' element={<App />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
    </Route>
  )
)
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserContextApi >
      <RouterProvider router={route} />
    </UserContextApi>
  </StrictMode>,
)

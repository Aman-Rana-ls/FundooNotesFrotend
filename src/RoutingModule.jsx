import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login/Login'
import NotesContainer from './components/NotesContainer/NotesContainer'
import SignUp from './components/SignUp/SignUp'
import Dashboard from './components/Dashboard/Dashboard'
import ArchiveContaier from './components/ArchiveContainer/ArchiveContainer'
import TrashContainer from './components/TrashContainer/TrashContainer'

function RoutingModule() {
    const routes = createBrowserRouter([
        { path: '', element: <Login /> },
        { path: 'signup', element: <SignUp /> },
        {
            path: 'dashboard', element: <Dashboard/>, children: [
                { path: 'notes', element: <NotesContainer /> },
                { path: 'archive', element: <ArchiveContaier /> },
                { path: 'trash', element: <TrashContainer /> }
            ]
        },

    ])
    return (
        <>
            <RouterProvider router={routes} />
        </>
    )
}

export default RoutingModule

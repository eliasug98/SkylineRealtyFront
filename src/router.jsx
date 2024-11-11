import { createBrowserRouter } from 'react-router-dom'
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import Layout from './layouts/Layout'
import Home from './views/Home'
import Properties from './components/Properties'
import Agents from './components/Agents'
import About from './components/About'
import Services from './components/Services'
import News from './components/News'
import Contact from './components/Contact'
import PropertyDetails from './components/PropertyDetails'
import Login from './views/Login'
import Register from './views/Register'
import Listings from './views/Listings'
import Profile from './views/Profile'
import Users from './views/Users'
import Comments from './views/Comments'
import AdminMessages from './views/AdminMessages'
import UserMessages from './views/UserMessages'
import PostProperty from './views/PostProperty'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: (
                    <>
                        <div id="home"><Home /></div>
                        <div id="properties"><Properties /></div>
                        <div id="agents"><Agents /></div>
                        <div id="about"><About /></div>
                        <div id="services"><Services /></div>
                        <div id="news"><News /></div>
                        <div id="contact"><Contact /></div>
                    </>
                )
            },
            {
                path: 'listings',
                element: <Listings />
            },
            {
                path: 'listings/:id',
                element: <PropertyDetails />
            },
            // {
            //     path: 'about',
            //     element: <About />
            // },
            {
                path: 'profile',
                element: <Profile />
            },
            {
                path: 'properties',
                element: <PostProperty />
            },
            {
                path: 'messages',
                element: <UserMessages />
            }
        ]
    },
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ]
    },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            {
                index: true,
                element: <Users />
            },
            {
                path: '/admin/comments',
                element: <Comments />
            },
            {
                path: '/admin/messages',
                element: <AdminMessages />
            },

        ]
    }
])

export default router
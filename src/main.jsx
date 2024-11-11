import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { SkylineProvider } from './context/SkylineProvider';
import router from './router';
import './index.css';
import 'leaflet/dist/leaflet.css';



ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <SkylineProvider>
            <RouterProvider router={router} />
        </SkylineProvider>
    </React.StrictMode>,
);
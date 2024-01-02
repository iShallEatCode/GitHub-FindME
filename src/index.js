import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import About from './components/pages/About';
import App from './App';
import ErrorPage from './components/pages/ErrorPage';
import Home from './components/pages/Home';
import React from 'react';
import ReactDOM from 'react-dom/client';
import User from './components/users/User';

const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: '/about',
				element: <About />,
			},
			{
				path: '/user/:login',
				element: <User />,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById('root')).render(
	<RouterProvider router={router} />
);

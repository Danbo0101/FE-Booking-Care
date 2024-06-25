import App from './App';
import HomePage from './components/HomePage/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';



const NotFound = () => {
    return (
        <div className="container mt-4 alert alert-danger">

            404. NOT FOUND

        </div>
    )
}

const Layout = () => {
    return (
        <Suspense fallback="...is loading">
            <Routes>
                {/* <Route path='/login' element={<Login />} />
                <Route path='/sign-up' element={<Register />} /> */}
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    {/* <Route path='users' element={
                        <PrivateRoute>
                            <ListQuiz />
                        </PrivateRoute>} /> */}
                </Route>

                <Route path='*' element={<NotFound />} />
            </Routes>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Bounce}
            />
            <ToastContainer />
        </Suspense>
    )
}

export default Layout;
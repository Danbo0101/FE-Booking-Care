import App from './App';
// import HomePage from './components/HomePage/HomePage';
import { Route, Routes } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import { Suspense } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import HomePage from './component/HomePage/HomePage';
import ListDoctor from './component/User/Doctor/Doctor';
import ListSpecialties from './component/User/Specialties/Specialties';
import ListClinics from './component/User/Clinic/Clinic';
import ClinicInfo from './component/User/Clinic/ClinicInfo';
import DoctorSpecialties from './component/User/Doctor/DoctorSpecialties';
import DoctorInfo from './component/User/Doctor/DoctorInfo';
import BookingForm from './component/User/Booking/Booking';
import BookingSuccess from './component/User/Booking/BookingSuccess';
import Login from './component/Auth/Login'
import Register from './component/Auth/Register';
import Admin from './component/Admin/Admin';
import Dashboard from './component/Admin/Dashboard';
import Clinic from './component/Admin/Clinic/Clinic';
import Doctor from './component/Admin/Doctor/Doctor';
import Specialties from './component/Admin/Specialties/Specialties';
import ScheduleDoctor from './component/Admin/Doctor/ScheduleDoctor';
import PrivateRoute from './routes/PrivateRoute';
import { useSelector } from 'react-redux';
import ForgotPassword from './component/Auth/ForgotPassword';
import ProfileAdmin from './component/Admin/Profile';



const NotFound = () => {
    return (
        <div className="container mt-4 alert alert-danger">

            404. NOT FOUND

        </div>
    )
}


const Layout = () => {

    const isAuthenticated = useSelector(state => state.user.isAuthenticated);


    return (
        <Suspense fallback="...is loading">
            <Routes>
                <Route path='/login' element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/forgot-password' element={<ForgotPassword />} />
                <Route path='/' element={<App />}>
                    <Route index element={<HomePage />} />
                    <Route path='doctors' element={<ListDoctor />} />
                    <Route path='doctor-info/:id' element={<DoctorInfo />} />
                    <Route path='specialties' element={<ListSpecialties />} />
                    <Route path='clinics' element={<ListClinics />} />
                    <Route path='clinic-info/:id' element={<ClinicInfo />} />
                    <Route path='doctors-specialties/:id' element={<DoctorSpecialties />} />
                    <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
                        <Route path="booking-form/:scheduleId" element={<BookingForm />} />
                        <Route path="booking-success" element={<BookingSuccess />} />
                    </Route>
                </Route>
                <Route element={<PrivateRoute allowedRoles={[2, 3]} />}>
                    <Route path="booking-form" element={<BookingForm />} />
                    <Route path="booking-success" element={<BookingSuccess />} />
                </Route>
                <Route path="admin" element={<PrivateRoute allowedRoles={[1]} />}>
                    <Route element={<Admin />}>
                        <Route index element={<Dashboard />} />
                        <Route path="profile-admin" element={<ProfileAdmin />} />
                        <Route path="clinic" element={<Clinic />} />
                        <Route path="doctor" element={<Doctor />} />
                        <Route path="specialties" element={<Specialties />} />
                        <Route path="schedule-doctor" element={<ScheduleDoctor />} />
                    </Route>
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
        </Suspense>
    )
}

export default Layout;



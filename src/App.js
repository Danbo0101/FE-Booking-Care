import './App.scss';

import { Link, Outlet } from 'react-router-dom';
import PerfectScrollbar from 'react-perfect-scrollbar'
import { useState } from 'react';
import Header from './components/Header/Header';



const App = () => {



  return (

    <div className="app-container">
      <div >
        <Header />
      </div>
      <div className='main-container'>
        <div className='slidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet />
          </PerfectScrollbar>
        </div>
      </div>

    </div>
  );
}

export default App;

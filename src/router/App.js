import React from 'react';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import FirstPage from '../page/FirstPage';
import LoginPage from '../page/Login';
import RegisterPage from '../page/Register';
import Choix from '../page/Choix';
import Animals from '../page/test';
import Bienvenue from '../page/Bienvenue';
import Organisation from '../page/Organisation';
import Ajout from '../page/AjoutAnimal';
import Dashboard from '../page/Dashboard';
import AnimalDetails from '../composant/AnimalDetails';
import UserInfos from '../page/UserInfos';
import UpdateUser from '../page/Profil';
import PremiumPage from '../page/Premium';
import Params from '../page/Parametres';
import Conv from '../page/conv';
import Chat from '../page/Chat';

function App() {
  return (
    <div className='app'>
      <Routes>
        <Route path="/" element={<FirstPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/choix" element={<PrivateRoute><Choix/></PrivateRoute>}/>
        <Route path='/profile' element={<PrivateRoute><UpdateUser/></PrivateRoute>}/>
        <Route path="/animal/:id" element={<PrivateRoute><AnimalDetails /></PrivateRoute>} />
        <Route path="/animals" element={<PrivateRoute><Animals/></PrivateRoute>}/>
        <Route path="/bienvenue" element={<PrivateRoute><Bienvenue/></PrivateRoute>}/>
        <Route path='/organisation' element={<PrivateRoute><Organisation/></PrivateRoute>}/>
        <Route path='/ajout-animal' element={<PrivateRoute><Ajout/></PrivateRoute>}/>
        <Route path='/user-info' element={<PrivateRoute><UserInfos/></PrivateRoute>}/>
        <Route path='/dashboard' element={<PrivateRoute><Dashboard/></PrivateRoute>}/>
        <Route path="/premium" element={<PrivateRoute><PremiumPage /></PrivateRoute>} />
        <Route path="/chat" element={<PrivateRoute><Conv/></PrivateRoute>} />
        <Route path="/chat/:animalId" element={<PrivateRoute><Chat/></PrivateRoute>} />
        <Route path="/param" element={<PrivateRoute><Params/></PrivateRoute>}/>
      </Routes>
    </div>
  );
}

export default App;


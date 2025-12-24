import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { ProjectTodos } from './Pages/ProjectTodos';
import { Home } from './Pages/Home';

import "./Styles/global.css";
import { Register } from './Pages/Register';
import { Profile } from './Pages/Profile';
import Store from './store/store';
import { createContext, useEffect } from 'react';
import { InvitationToProject } from './Components/InvitationToProject';
import { NotificationHandler } from './Components/NotificationHandler';
import { Spinner } from './Components/Spinner';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

interface IStore {
  store: Store
}

const store = new Store();

export const Context = createContext<IStore>({
  store
});

root.render(
  <Context.Provider value={{store}}>
    <NotificationHandler></NotificationHandler>
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/project/:id" element={<ProjectTodos></ProjectTodos>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/share-link/:id" element={<InvitationToProject></InvitationToProject>}></Route> 
        <Route path="/" element={<Login></Login>}></Route>
      </Routes>
    </BrowserRouter>
  </Context.Provider>
);

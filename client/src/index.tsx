import ReactDOM from 'react-dom/client';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login } from './Pages/Login';
import { ProjectTodos } from './Pages/ProjectTodos';
import { Home } from './Pages/Home';
import { NotFound } from './Pages/NotFound';

import "./Styles/global.css";
import { Register } from './Pages/Register';
import { Profile } from './Pages/Profile';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Login/>}/>
      <Route path="/project/:id" element={<ProjectTodos></ProjectTodos>}></Route>
      <Route path="/home" element={<Home></Home>}></Route>
      <Route path="/register" element={<Register></Register>}></Route>
      <Route path="/profile" element={<Profile></Profile>}></Route>
      <Route path="*" element={<NotFound></NotFound>}></Route>
    </Routes>
  </BrowserRouter>
);

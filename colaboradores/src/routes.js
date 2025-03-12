import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Inicio from './App';
import Colaboradores from './colaboradores/colaboradores';
import Dependentes from './dependentes/dependentes.js';

export default function AppRoutes() {
    return (
        <Router>
            <Routes>
                <Route path='/' element={<Inicio />}/>
                <Route path='/colaboradores' element={<Colaboradores />}/>
                <Route path= '/dependentes/:idColaborador' element={<Dependentes/>}/>
            </Routes>
        </Router>
    )
}
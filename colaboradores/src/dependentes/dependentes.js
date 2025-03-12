import FormDepen from "./componentes/formDepen";
import { useParams } from "react-router-dom";
import TabelaDepen from "./componentes/tabelaDepen";

const Dependentes = () => {
    const {idColaborador} = useParams();
    return (
        <div>
            <FormDepen id_colaborador = {idColaborador}/>
            <TabelaDepen idColaborador = {idColaborador}/>
        </div>
    )     
}

export default Dependentes;
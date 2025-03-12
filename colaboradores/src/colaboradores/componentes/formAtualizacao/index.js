import CampoTexto from "../campos/campoTexto";
import CampoData from '../campos/campoData';
import './formAtualizacao.css';

const FormAtualizacao = (props) => {    
    return (
        <div className="FormAtualizacao">
            <form>
                <h1>Editar colaborador</h1>
                <div className="divForm">
                    <CampoTexto label="Nome*" placeholder="Insira seu nome completo"
                        name="nome"
                        value={props.valor.nome}
                        onChange= {props.onChangeTexto} />
                    <CampoTexto label="E-mail"
                        placeholder="Insira um e-mail válido"
                        name= "email"
                        value={props.valor.email}
                        onChange= {props.onChangeTexto} />
                    <CampoTexto label="Usuário"
                        placeholder="Insira seu usuário"
                        name= "usuario"
                        value={props.valor.usuario}
                        onChange= {props.onChangeTexto} />
                    <CampoTexto label="CPF"
                        placeholder="Insira seu CPF (11 dígitos)"
                        name = "cpf"
                        value={props.valor.cpf}
                        onChange= {props.onChangeTexto} />
                     <CampoData label="Data de nascimento"
                        name = "dt_nascimento" 
                        value={props.valor.dt_nascimento}
                        onChange= {props.onChangeData}/> 
                    <CampoData label="Data de admissão"
                        name = "dt_admissao"  
                        value={props.valor.dt_admissao}
                        onChange= {props.onChangeData}/> 
                    <CampoData label="Data de afastamento"  
                        name = "dt_afastamento" 
                        value={props.valor.dt_afastamento}
                        onChange= {props.onChangeData}/> 
                    <CampoTexto label="Motivo do afastamento"
                        name = "ds_motivo_afast"
                        placeholder="Insira o motivo do afastamento"
                        value={props.valor.ds_motivo_afast} 
                        onChange= {props.onChangeTexto}/>               
                </div>
            </form>
            <div className="divBotao">
                <button className = 'botaoAtualizarForm' onClick={props.onClick}>Atualizar</button>
            </div>            
        </div>
    )
}

export default FormAtualizacao;
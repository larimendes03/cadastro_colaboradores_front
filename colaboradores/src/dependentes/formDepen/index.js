import { useState } from "react";
import axios from "axios";
import CampoTexto from "../../../colaboradores/componentes/campos/campoTexto";
import CampoData from "../../../colaboradores/componentes/campos/campoData";
import BotaoCadastrar from "../../../colaboradores/componentes/botoes/botaoCadastrar";
import MsgInvalid from "../../../colaboradores/componentes/mensagens/msgInvalid";
import MsgSucesso from "../../../colaboradores/componentes/mensagens/msgSucesso";

const FormDepen = (props) => {
   
    const [data, setData] = useState({
        nome: '', 
        cpf: '',
        data_nascimento: '', 
        parentesco: '' ,
        id_colaborador: '',
    })

    const [messages, setShowMessage] = useState({
      showMessageSucess: false,
      showMessageInvalid: false,
      messageInvalid: '',
      messageSucess: ''
    })

    const handleChange = (e) => {
      const { name, value } = e.target;
      setData({
          ...data,
          [name]: value
      });
  };

    const handleSubmit = async (e) => {
        e.preventDefault(); // garantir que a pg não atualize

        const formData = {
            nome: data.nome,
            cpf: data.cpf,
            data_nascimento: data.dataNascimento,
            parentesco: data.parentesco,
            id_colaborador: props.id_colaborador
        }
    
        try {
          const response = await axios.post("http://localhost:3001/dependentes", formData);
    
          if (response.status === 201) {
            setShowMessage({
              showMessageSucess: true,
              messageSucess: 'Dependente cadastrado com sucesso'});
            resetForm();

            setTimeout(() => {
              setShowMessage(false);
            },3000);
          }        
        } catch (error) {
          setShowMessage({
          showMessageInvalid: true,
          messageInvalid: error.response.data.message})     
          
          setTimeout(() => {
            setShowMessage(false);
          },3000);
        }
        
      };

        const resetForm = () => {
          setData({
            nome: '', 
            cpf: '',
            data_nascimento: '', 
            parentesco: '' ,
            id_colaborador: '',
          })
    }

    return (
        <section className='formulario'>
            <form onSubmit={handleSubmit} >
                <h2 className = 'titulo'>Cadastro de dependentes</h2>
                <CampoTexto label="Nome*" placeholder="Insira seu nome completo" 
                            name = "nome"
                            value={data.nome}
                            onChange={handleChange}/>
                <CampoTexto label="CPF*" 
                            name = "cpf" 
                            placeholder="Insira seu CPF (apenas números)" 
                            value={data.cpf} 
                            onChange={handleChange} />
                <CampoData label="Data de nascimento"
                           name = "dataNascimento" 
                           value={data.dataNascimento}
                           onChange={handleChange}/>
                <CampoTexto label="Parentesco" 
                           name = "parentesco"
                           value={data.dataAdmissao} 
                           onChange={handleChange}/>
                <BotaoCadastrar/>
                {messages.showMessageSucess && <MsgSucesso msg = {messages.messageSucess}/>}
                {messages.showMessageInvalid && <MsgInvalid msg = {messages.messageInvalid}/>}
            </form>            
        </section>
    )
}

export default FormDepen;
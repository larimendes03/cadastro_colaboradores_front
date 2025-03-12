import BotaoCadastrar from '../botoes/botaoCadastrar';
import CampoData from '../campos/campoData';
import CampoTexto from '../campos/campoTexto';
import './formulario.css'
import React, { useState } from 'react';
import axios from 'axios';
import MsgSucesso from '../mensagens/msgSucesso';
import MsgInvalid from '../mensagens/msgInvalid';

const Formulario = () => {
   
    const [data, setData] = useState({
        nome: '',
        email: '',
        usuario: '',
        cpf: '',
        dataNascimento: '',
        dataAdmissao: '',
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
            email: data.email,
            usuario: data.usuario,
            cpf: data.cpf,
            dt_nascimento: data.dataNascimento,
            dt_admissao: data.dataAdmissao,
        }
    
        try {
          const response = await axios.post("http://localhost:3001/colaboradores", formData);
    
          if (response.status === 201) {
            setShowMessage({
              showMessageSucess: true,
              messageSucess: 'Colaborador cadastrado com sucesso'});
            resetForm();
            // precisarei adicionar tratamento para que a lista atualize instantaneamente no
            //momento do cadastro

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
            email: '',
            usuario: '',
            cpf: '',
            dataNascimento: '',
            dataAdmissao: '',
            dataAfastamento: '',
            motivoAfastamento: ''
          })
    }

    return (
        <section className='formulario'>
            <form onSubmit={handleSubmit} >
                <h2 className = 'titulo'>Cadastro de colaboradores</h2>
                <CampoTexto label="Nome*" placeholder="Insira seu nome completo" 
                            name = "nome"
                            value={data.nome}
                            onChange={handleChange}/>
                <CampoTexto label="E-mail*"
                            name = "email"
                            placeholder="Insira um e-mail válido"
                           value={data.email} onChange={handleChange} />
                <CampoTexto label="Usuário*" 
                            name = "usuario" 
                            placeholder="Insira seu usuário" 
                            value={data.usuario} 
                            onChange={handleChange} />
                <CampoTexto label="CPF*" 
                            name = "cpf" 
                            placeholder="Insira seu CPF (apenas números)" 
                            value={data.cpf} 
                            onChange={handleChange} />
                <CampoData label="Data de nascimento"
                           name = "dataNascimento" 
                           value={data.dataNascimento}
                           onChange={handleChange}/>
                <CampoData label="Data de admissão" 
                           name = "dataAdmissao"
                           value={data.dataAdmissao} 
                           onChange={handleChange}/>
                <BotaoCadastrar/>
                {messages.showMessageSucess && <MsgSucesso msg = {messages.messageSucess}/>}
                {messages.showMessageInvalid && <MsgInvalid msg = {messages.messageInvalid}/>}
            </form>            
        </section>
    )
}

export default Formulario;
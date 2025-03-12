import './tabelaColab.css'
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotaoAtualizar from '../botoes/botaoAtualizar';
import BotaoDeletar from '../botoes/botaoDeletar';
import BotaoDepen from '../botoes/botaoDepen';
import MsgInvalid from '../mensagens/msgInvalid';
import MsgSucesso from '../mensagens/msgSucesso';
import FormAtualizacao from '../formAtualizacao';
import {useNavigate} from 'react-router-dom';

const TabelaColab = () => {

    const [colaboradores, setColaboradores] = useState([])
    const [pagina, setPagina] = useState(1);
    const [total, setTotal] = useState(0);
    const [colaboradorEdit, setFormAtualizacao] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const [messages, setShowMessage] = useState({
        showMessageSucess: false,
        showMessageInvalid: false,
        messageInvalid: '',
        messagesSucess: ''
    })

    // tratamento para trazer registros da lista
    useEffect(() => {
        axios.get(`http://localhost:3001/colaboradores?pagina=${pagina}&limite=5`).then(
            response => {
                setColaboradores(response.data.dados.map((colaborador) => ({
                    id: colaborador.id,
                    nome: colaborador.nome,
                    email: colaborador.email,
                    usuario: colaborador.usuario,
                    cpf: colaborador.cpf,
                    dt_nascimento: colaborador.dt_nascimento ? new Date(colaborador.dt_nascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
                    dt_admissao: colaborador.dt_admissao ? new Date(colaborador.dt_admissao).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
                    dt_afastamento: colaborador.dt_afastamento ? new Date(colaborador.dt_afastamento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
                    ds_motivo_afast: colaborador.ds_motivo_afast
                  })))

                setTotal(response.data.total);
            }
        ).catch(error => {
            console.log(error);
        })

    }, [pagina]);

    const handlePaginaNova = (paginaNova) => {
        setPagina(paginaNova);
    }

    // tratamento para deletar itens da lista
    const handleDelete = (idColaborador) => {
         axios.delete(`http://localhost:3001/colaboradores/${idColaborador}`).then(
            response => {
                const NewColaboradores = colaboradores.filter((colaborador) => 
                    colaborador.id !== idColaborador);
                setColaboradores(NewColaboradores);
                setShowMessage({
                    showMessageSucess: true,
                    messagesSucess: "Colaborador deletado com sucesso"
                })
            
                 setTimeout(() => {
                     setShowMessage(false);
                 }, 3000);
            }
        ).catch(error => {
            setShowMessage({
                showMessageInvalid: true,
                messageInvalid: error.response.data.message
            })
            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        })

    }

    // tratamento para atualizar itens da lista
    const handleForm = (colaborador) => {
        setFormAtualizacao(colaborador);
        setIsEditing(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAtualizacao({
            ...colaboradorEdit,
            [name]: value
        });
    };

    const handlDate = (e) => {
       
        let { name, value } = e.target;
        console.log('handlDate:',name, value);
        if (value.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
            const [dia, mes, ano] = value.split('/');
            value = `${ano}-${mes.padStart(2, '0')}-${dia.padStart(2, '0')}`;
          }
        // precisarei atualizar esse método para permitir que as datas sejam setadas
        //corretamente no momento que o formulário de edição é aberto
        setFormAtualizacao({
            ...colaboradorEdit,
            [name]: value
        });

    }

    const handleEdit = (idColaborador) => {
        axios.put(`http://localhost:3001/colaboradores/${idColaborador}`, colaboradorEdit).then(
            response => {
                const updatedColaboradores = [...colaboradores]; // cria uma cópia da lista original
                const index = updatedColaboradores.findIndex(colaborador => colaborador.id === idColaborador);
                if (index !== -1) {
                  updatedColaboradores[index] = response.data; 
                }
                // precisarei mudar tratamento para que a lista atualize instantaneamente após a
                // edição dos registros
                setFormAtualizacao(updatedColaboradores);
                setIsEditing(false);
                alert('Colaborador atualizado');
            }
        ).catch(error => {
            alert(error);
        })
    }

    // chamada tela de dependentes
    const handleDependentes = (idColaborador) => {
        navigate(`/dependentes/${idColaborador}`);
    }

    // componente tabela de colaboradores
     return(
        <section className="tabelaColab">
            <h2 className="titulo">Lista de Colaboradores</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Usuário</th>
                        <th>CPF</th>
                        <th>Data de nascimento</th>
                        <th>Data de admissão</th>
                        <th>Data de afastamento</th>
                        <th>Motivo afastamento</th>
                    </tr>
                </thead>
                <tbody>
                    {colaboradores.map((colaborador) => {
                        return(
                        <tr key={colaborador.id}>
                            <td>{colaborador.nome}</td>
                            <td>{colaborador.email}</td>
                            <td>{colaborador.usuario}</td>
                            <td>{colaborador.cpf}</td>
                            <td>{colaborador.dt_nascimento}</td>
                            <td>{colaborador.dt_admissao}</td>
                            <td>{colaborador.dt_afastamento}</td>
                            <td>{colaborador.ds_motivo_afast}</td>
                             <td>
                                <BotaoAtualizar onClick= {() => handleForm(colaborador)}/>
                                <BotaoDeletar onClick={() => handleDelete(colaborador.id)}/>
                                <BotaoDepen onClick={() => handleDependentes(colaborador.id)}/>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <div>
                <button onClick={() => handlePaginaNova(pagina - 1)}  disabled={pagina <= 1} >Anterior</button>
                <span>Pagina {pagina} de {Math.ceil(total / 5)}</span>
                <button onClick={() => handlePaginaNova(pagina + 1)} disabled={pagina >= Math.ceil(total / 5)}>Próxima</button>
                {messages.showMessageInvalid && <MsgInvalid msg = {messages.messageInvalid}/>}
                {messages.showMessageSucess && <MsgSucesso msg = {messages.messagesSucess}/>}
            </div>
            {isEditing && <FormAtualizacao valor={colaboradorEdit} 
                                onClick = {() => handleEdit(colaboradorEdit.id)}
                                onChangeTexto={handleChange}
                                onChangeData = {handlDate}/>}
        </section>
     )
}

export default TabelaColab;
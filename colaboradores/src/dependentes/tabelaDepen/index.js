import '../../../colaboradores/componentes/tabelaColab/tabelaColab.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BotaoAtualizar from '../../../colaboradores/componentes/botoes/botaoAtualizar';
import BotaoDeletar from '../../../colaboradores/componentes/botoes/botaoDeletar';
import MsgInvalid from '../../../colaboradores/componentes/mensagens/msgInvalid';
import MsgSucesso from '../../../colaboradores/componentes/mensagens/msgSucesso';
import FormAtualizacao from '../../../colaboradores/componentes/formAtualizacao';

const TabelaDepen = (props) => {

    const [dependentes, setDependentes] = useState([])
    const [dependenteEdit, setFormAtualizacao] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [messages, setShowMessage] = useState({
        showMessageSucess: false,
        showMessageInvalid: false,
        messageInvalid: '',
        messagesSucess: ''
    })

    // tratamento para trazer registros da lista
    useEffect(() => {
        axios.get(`http://localhost:3001/dependentes/${props.idColaborador}`).then(
            response => {
                console.log(props.idColaborador, response.data.dados);
            // reponse.data.dados está vindo undefined e por isso os dados da lista não
            // estão sendo carregados. Pelo postamann os dados estão vindo
            // corretamente. Precisarei verificar essa questão
                setDependentes(response.data.dados.map((dependente) => ({
                    id: dependente.id,
                    nome: dependente.nome,
                    cpf: dependente.cpf,
                    data_nascimento: dependente.data_nascimento ? new Date(dependente.dt_nascimento).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) : '',
                    parentesco: dependente.parentesco,
                  })))
            }
        ).catch(error => {
            console.log(error);
        })

    });


    // tratamento para deletar itens da lista
    const handleDelete = (idDependente) => {
         axios.delete(`http://localhost:3001/dependentes/${idDependente}`).then(
            response => {
                const NewDependentes = dependentes.filter((dependente) => 
                    dependente.id !== idDependente);
                setDependentes(NewDependentes);
                setShowMessage({
                    showMessageSucess: true,
                    messagesSucess: "Dependente deletado com sucesso"
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
    const handleForm = (dependente) => {
        setFormAtualizacao(dependente);
        setIsEditing(true);
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormAtualizacao({
            ...dependenteEdit,
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
        setFormAtualizacao({
            ...dependenteEdit,
            [name]: value
        });

    }

    const handleEdit = (idDependente) => {
        axios.put(`http://localhost:3001/colaboradores/${idDependente}`, dependenteEdit).then(
            response => {
                const updatedDependentes = [...dependentes]; // cria uma cópia da lista original
                const index = updatedDependentes.findIndex(dependente => dependente.id === idDependente);
                if (index !== -1) {
                    updatedDependentes[index] = response.data; // atualiza o colaborador na lista
                }
                setFormAtualizacao(updatedDependentes);
                setIsEditing(false);
                alert('Colaborador atualizado');
            }
        ).catch(error => {
            alert(error);
        })
    }

    // componente tabela de dependentes
     return(
        <section className="tabelaColab">
            <h2 className="titulo">Lista de Dependentes</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nome</th>
                        <th>CPF</th>
                        <th>Data de nascimento</th>
                        <th>Parentesco</th>
                    </tr>
                </thead>
                <tbody>
                    {dependentes.map((dependente) => {
                        return(
                        <tr key={dependente.id}>
                            <td>{dependente.nome}</td>
                            <td>{dependente.cpf}</td>
                            <td>{dependente.data_nascimento}</td>
                            <td>{dependente.parentesco}</td>
                             <td>
                                <BotaoAtualizar onClick= {() => handleForm(dependente)}/>
                                <BotaoDeletar onClick={() => handleDelete(dependente.id)}/>
                            </td>
                        </tr>
                    )})}
                </tbody>
            </table>
            <div>
                {messages.showMessageInvalid && <MsgInvalid msg = {messages.messageInvalid}/>}
                {messages.showMessageSucess && <MsgSucesso msg = {messages.messagesSucess}/>}
            </div>
            {isEditing && <FormAtualizacao valor={dependenteEdit} 
                                onClick = {() => handleEdit(dependenteEdit.id)}
                                onChangeTexto={handleChange}
                                onChangeData = {handlDate}/>}
        </section>
     )
}

export default TabelaDepen;
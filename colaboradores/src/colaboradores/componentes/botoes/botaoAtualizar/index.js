import './botaoAtualizar.css';

const BotaoAtualizar = (props) => {
    return(
        <button title='Atualizar' 
                className='botaoAtualizar'
                onClick={props.onClick}>↻</button>
    )
}

export default BotaoAtualizar;
import './botaoDeletar.css';

const BotaoDeletar = (props) => {
    return(
        <button title='Deletar' 
                className='botaoDeletar'
                onClick={props.onClick}>X</button>
    )
}

export default BotaoDeletar;
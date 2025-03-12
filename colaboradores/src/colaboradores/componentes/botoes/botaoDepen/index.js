import './botaoDepen.css';

const BotaoDepen = (props) => {
    return(
        <button title='Ver dependentes' 
                className='botaoDepen'
                onClick={props.onClick}>👥</button>
    )
}

export default BotaoDepen;
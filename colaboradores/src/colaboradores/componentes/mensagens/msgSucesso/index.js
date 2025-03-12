import './msgSucesso.css'

const MsgSucesso = (props) => {
    return (
       <div className='msgSucesso'>
            {props.msg}
       </div>
    )
}

export default MsgSucesso;
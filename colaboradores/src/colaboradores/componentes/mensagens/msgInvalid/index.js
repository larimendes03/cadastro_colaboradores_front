import './msgInvalid.css'

const MsgInvalid= (props) => {
    return (
       <div className='msgInvalid'>
            {props.msg}
       </div>
    )
}

export default MsgInvalid;
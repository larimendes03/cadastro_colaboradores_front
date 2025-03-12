import '../campo.css'

const CampoTexto = (props) => {
    return (
        <div className="campoTexto">
            <label>{props.label}</label>
            <input type="text"
                   name={props.name}
                   placeholder={props.placeholder}
                   value={props.value}
                   onChange={props.onChange} />
        </div>
    )
}

export default CampoTexto;
import '../campo.css'

const CampoData = (props) => {
    return (
        <div className="campoData">
            <label>{props.label}</label>
            <input type='date'
                   name={props.name}
                   value={props.value}
                   onChange={props.onChange} />
        </div>
    )
}

export default CampoData;
import './Button.css'

function Button({ label, double, triple, operator, click }) {
  return (
    <button className={`
    button
    ${double ? 'double' : null}
    ${triple ? 'triple' : null}
    ${operator ? 'operator' : null}
    `}
      onClick={() => click(label)}
    >{label}</button>
  )
}

export default Button
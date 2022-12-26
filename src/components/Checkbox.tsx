interface CheckboxProps{
  onClick?: Function
}

export default function Checkbox({onClick = (elem: HTMLElement) => {}}: CheckboxProps){
  return (
    <div className="checkbox" onClick={event => onClick(event.currentTarget)}><i className="fa-solid fa-check"></i></div>
  )
}
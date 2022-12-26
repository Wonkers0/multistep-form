import {useEffect, useRef} from "react"

interface InputProps{
  title: string,
  placeholder: string,
  value: string,
  storeState: Function
}

export default function Input({title, placeholder, value, storeState}: InputProps){
  const inputError = useRef<HTMLElement>(null)
  const formInput = useRef<HTMLInputElement>(null)

  const containsError = (): Boolean => {
    const emptyField: boolean = formInput.current?.value == ""
    if(emptyField && inputError.current){
      inputError.current.style.display = "block"
      formInput.current?.classList.add("error")
    } 
    else if(inputError.current){
      inputError.current.style.display = "none"
      formInput.current?.classList.remove("error")
    } 

    return emptyField
  }

  const onInput = () => {
    storeState(formInput.current?.value)
    containsError()
  }

  return (
      <div className="formInputWrapper">
          <div className="formHeaders">
            <h1 className="inputTitle">{title}</h1>
            <h1 ref={inputError as React.RefObject<HTMLDivElement>} className="inputError">This field is required</h1>
          </div>
          <input ref={formInput as React.RefObject<HTMLInputElement>} onInput={onInput} className="formInput" type="text" value={value} placeholder={placeholder} />
      </div>
  )
}
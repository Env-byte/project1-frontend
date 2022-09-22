import {ChangeEventHandler} from "react";

interface FilterCheckboxProps {
    found: boolean
    onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
    value: string
    name: string | number
}
const FilterCheckbox = (props: FilterCheckboxProps) => {
    return <div className="form-check">
        <input checked={props.found}
               onChange={props.onChange}
               className="form-check-input"
               type="checkbox"
               value={props.value}
               id={props.value}/>
        <label className="form-check-label" htmlFor={props.value}>
            {props.name}
        </label>
    </div>
}

export default FilterCheckbox;
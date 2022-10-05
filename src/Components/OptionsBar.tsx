import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowAltCircleLeft} from "@fortawesome/free-solid-svg-icons/faArrowAltCircleLeft";
import {findIconDefinition, IconDefinition, library} from '@fortawesome/fontawesome-svg-core'
import {faSave} from "@fortawesome/free-solid-svg-icons/faSave";
import {MouseEvent} from 'react';

library.add(faArrowAltCircleLeft)
library.add(faSave)
const backIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'arrow-alt-circle-left'})
const saveIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'save'})

interface OptionsBarProps {
    showSave?: boolean
    onSave?: (event: MouseEvent<HTMLButtonElement>) => void
    saveText?: string
}

const OptionsBar = (props: OptionsBarProps) => {
    return <div className="floating-row">
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <button className="btn btn-danger" onClick={() => {
                        window.history.go(-1);
                    }}>
                        <FontAwesomeIcon size="lg" icon={backIconDefinition}/> Back
                    </button>
                </div>
                {props.showSave ? (
                    <div className="col text-end">
                        <button onClick={(event) => {
                            if (props.onSave) {
                                props.onSave(event)
                            }
                        }} className="btn btn-success">
                            <FontAwesomeIcon size="lg"
                                             icon={saveIconDefinition}/> {props.saveText ? props.saveText : "Save"}
                        </button>
                    </div>
                ) : <></>}
            </div>
        </div>
    </div>
}
export default OptionsBar;
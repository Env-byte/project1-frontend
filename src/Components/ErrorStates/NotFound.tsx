import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    findIconDefinition,
    library
} from '@fortawesome/fontawesome-svg-core'
import {faWarning} from "@fortawesome/free-solid-svg-icons";
import OptionsBar from "../OptionsBar";

interface NotFoundProps {
    name: string
}

library.add(faWarning)
const warningIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'warning'})
const NotFound = (props: NotFoundProps) => {
    return <>
        <div className="container-fluid">
            <div className="row">
                <div className="col-lg-6 offset-lg-3">
                    <div className="alert alert-danger text-center">
                        <h4>
                            <FontAwesomeIcon icon={warningIconDefinition} size="lg" bounce={true}/> {props.name} Not
                            Found
                        </h4>
                    </div>
                </div>
            </div>
        </div>
        <OptionsBar/>
    </>
}

export default NotFound;
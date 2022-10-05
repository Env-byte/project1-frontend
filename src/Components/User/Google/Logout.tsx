import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    findIconDefinition,
    library
} from '@fortawesome/fontawesome-svg-core'
import {faSignOut} from "@fortawesome/free-solid-svg-icons";

interface PropsLogout {
    name: string,
    onClick: () => void
}
library.add(faSignOut)
const signOutIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'sign-out'})
export default function Logout(props: PropsLogout) {
    return (
        <div>
            <p style={{display: "inline-block", marginBottom: 0}}>Logged in as {props.name}</p>
            <button onClick={props.onClick} style={{display: "inline-block"}} className="btn btn-danger ms-4">
                <FontAwesomeIcon icon={signOutIconDefinition}/> Logout
            </button>
        </div>
    );
}
import "../Css/Loading.css"
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    IconDefinition,
    findIconDefinition,
    SizeProp
} from '@fortawesome/fontawesome-svg-core'
import {library} from '@fortawesome/fontawesome-svg-core'
import {faSync} from "@fortawesome/free-solid-svg-icons";

library.add(faSync)

const syncIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'sync'})

interface LoadingProp {
    size: SizeProp
    screen: boolean
}

const Loading = (props: LoadingProp) => {

    let className = '';
    let size = props.size;
    if (props.screen) {
        className = "screen-loading";
        size = '3x'
    }

    return <div className={className}>
        <FontAwesomeIcon spin={true} size={size} fixedWidth={true} icon={syncIconDefinition}/>
        <br/>
        <div className="loading-text">Loading...</div>
    </div>
}

export default Loading;
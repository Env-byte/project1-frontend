import {useEffect, useState} from "react";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import CSS from 'csstype';
import {ChampionFilter, FilterDispatches} from "../../Hooks/ChampionFilter";


library.add(faTimes)

export interface ActiveFiltersProps {
    filter: ChampionFilter;
    dispatches: FilterDispatches;
}

const xIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'times'})
const badgeStyle: CSS.Properties = {
    cursor: "pointer"
}
const ActiveFilters = (props: ActiveFiltersProps) => {
    const [origins, setOrigins] = useState<JSX.Element[]>([]);
    const [classes, setClasses] = useState<JSX.Element[]>([]);
    const [costs, setCosts] = useState<JSX.Element[]>([]);


    useEffect(() => {
        const handleClick = (type: string, val: number | string) => {
            if (props.dispatches.remove) {
                props.dispatches.remove(type, val);
            }
        }
        setOrigins(props.filter.origin.map(item => {
            return <span key={'origin-' + item} onClick={() => {
                handleClick('origin', item)
            }} style={badgeStyle} className="mx-1 badge badge-pill bg-primary badge-primary">
                <FontAwesomeIcon size={'xs'} icon={xIconDefinition}/> {item}
            </span>
        }))
        setClasses(props.filter.class.map(item => {
            return <span key={'class-' + item} onClick={() => {
                handleClick('class', item)
            }} style={badgeStyle} className="mx-1 badge badge-pill bg-warning  badge-primary">
                <FontAwesomeIcon size={'xs'} icon={xIconDefinition}/> {item}
            </span>
        }));
        setCosts(props.filter.cost.map(item => {
            return <span key={'cost-' + item} onClick={() => {
                handleClick('cost', item)
            }} style={badgeStyle} className="mx-1 badge badge-pill bg-info  badge-primary">
                <FontAwesomeIcon size={'xs'} icon={xIconDefinition}/> {item} Cost
            </span>
        }));
    }, [props]);


    return <>
        <div className="row">
            <div className="col">
                {costs} {classes} {origins}
            </div>
        </div>

    </>
}
export default ActiveFilters;
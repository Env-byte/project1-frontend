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
    allowRemove?: boolean
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
            return <Filter key={'origin-' + item} name={item.toString()} onClick={handleClick} allowRemove={props.allowRemove} bgColour="bg-primary"/>
        }))
        setClasses(props.filter.class.map(item => {
            return <Filter key={'class-' + item} name={item.toString()} onClick={handleClick} allowRemove={props.allowRemove} bgColour="bg-warning"/>
        }));
        setCosts(props.filter.cost.map(item => {
            return <Filter key={'cost-' + item} name={item.toString()} onClick={handleClick} allowRemove={props.allowRemove} bgColour="bg-info"/>
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

interface FilterProps {
    allowRemove?: boolean
    name: string
    onClick: (type: string, val: number | string) => void
    bgColour: string
}

const Filter = (props: FilterProps) => {

    return <span
        onClick={() => {
            if (props.allowRemove !== false) {
                props.onClick('cost', props.name)
            }
        }}
        style={props.allowRemove !== false ? badgeStyle : {}}
        className={"mx-1 badge badge-pill " + props.bgColour + " badge-primary"}>
               {props.allowRemove !== false ? <FontAwesomeIcon size={'xs'} icon={xIconDefinition}/> : <></>} {props.name} Cost
            </span>
}
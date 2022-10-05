import {CSSProperties, useEffect, useState} from "react";
import {FilterDispatches, FilterResponse} from "../../Hooks/ChampionFilter";
import {ChampionPortrait} from "./ChampionPortrait";
import ActiveFilters from "./ActiveFilters";

interface ChampionGridProps {
    filterRes: FilterResponse
    dispatches: FilterDispatches
    tftSet: string
    style?: CSSProperties,
    children?: JSX.Element,
    showActiveFilters?: boolean
    useDrag?: boolean
}

const ChampionGrid = (props: ChampionGridProps) => {
    const [championPortraits, setChampionPortraits] = useState<JSX.Element[]>([]);

    useEffect(() => {
        setChampionPortraits(
            props.filterRes.champions
                .map((item) => <ChampionPortrait useDrag={props.useDrag} tftSet={props.tftSet}
                                                 key={"portrait-" + item.championId}
                                                 characterId={item.championId}/>
                ));
    }, [props.filterRes.champions, props.tftSet, props.useDrag]);

    return <div style={props.style} className="card">
        <div className="card-body">
            {props.children}
            {(props.showActiveFilters !== false) ?
                <ActiveFilters allowRemove={!props.filterRes.filter.isSearch} filter={props.filterRes.filter} dispatches={props.dispatches}/> : <></>}
            <div className="flex-container champion-grid">
                {(championPortraits.length === 0) ? <p>No Champions found. Try Adjusting search</p> : championPortraits}
            </div>
        </div>
    </div>
}
export default ChampionGrid;

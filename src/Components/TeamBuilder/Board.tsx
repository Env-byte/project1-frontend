import "../../Css/TeamBuilder/Board.css"
import Hex from "./Hex";
import {useEffect, useMemo, useState} from "react";
import {Team} from "../../Types/Team";
import {TeamDispatches} from "../../Hooks/TeamComp";
import {Champion} from "../../Types/Api/Champion";

interface BoardProps {
    team: Team
    dispatches: TeamDispatches
}

const Board = (props: BoardProps) => {
    const [hexes, setHexes] = useState<JSX.Element[]>([])

    const hexRecord = useMemo(() => {
        let map: Record<number, Champion> = {};
        props.team.hexes.forEach((item, index) => {
            map[item.hex] = item.champion
        });
        return map;
    }, [props.team.hexes])

    useEffect(() => {
        const temp = [];

        for (let i = 0, iL = 28; i < iL; i++) {
            temp.push(<Hex champion={hexRecord.hasOwnProperty(i) ? hexRecord[i] : undefined} key={"hex" + i} position={i}
                           add={props.dispatches.add} remove={props.dispatches.remove} setId={props.team.setId}/>)
        }
        setHexes(temp);
    }, [hexRecord, props.dispatches.add, props.dispatches.remove, props.team.setId])

    return <div className="board four-row">
        {hexes}
    </div>
}

export default Board;
import "../../Css/TeamBuilder/Board.css"
import Hex from "./Hex";
import {useEffect, useState} from "react";
import {Team} from "../../Types/Team";
import {TeamDispatches} from "../../Hooks/TeamBuilder";
import {Champion} from "../../Types/Api/Champion";

interface BoardProps {
    team: Team
    dispatches: TeamDispatches
}

const Board = (props: BoardProps) => {
    const [hexes, setHexes] = useState<JSX.Element[]>([])

    useEffect(() => {
        const temp = [];
        let hexRecord: Record<number, Champion> = {};
        props.team.hexes.forEach((item, index) => {
            hexRecord[item.position] = item.champion
        });

        for (let i = 0, iL = 28; i < iL; i++) {
            temp.push(<Hex champion={hexRecord.hasOwnProperty(i) ? hexRecord[i] : undefined} key={"hex" + i} position={i}
                           add={props.dispatches.add} remove={props.dispatches.remove} setId={props.team.setId}/>)
        }
        setHexes(temp);
    }, [props.team.hexes, props.dispatches.add, props.dispatches.remove, props.team.setId])

    return <div className="board four-row">
        {hexes}
    </div>
}

export default Board;
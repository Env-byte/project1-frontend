import "../../Css/TeamBuilder/Board.css"
import Hex from "./Hex";
import {useEffect, useState} from "react";

const Board = () => {
    const [hexes, setHexes] = useState<JSX.Element[]>([])

    useEffect(() => {
        const temp = [];
        for (let i = 0, iL = 28; i < iL; i++) {
            temp.push(<Hex key={"hex" + i} position={i}/>)
        }
        setHexes(temp);
    }, [])


    return <div className="board four-row">
        {hexes}
    </div>
}

export default Board;
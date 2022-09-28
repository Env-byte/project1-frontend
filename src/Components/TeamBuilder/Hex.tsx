import {useDrop} from "react-dnd";
import {DropResult} from "../../Types/DragDrop";
import {teamAdd, teamRemove} from "../../Hooks/TeamComp";
import {Champion} from "../../Types/Api/Champion";
import StaticHelpers from "../../Classes/StaticHelpers";

interface HexProps {
    position: number,
    add: teamAdd,
    remove: teamRemove,
    champion?: Champion
    setId: string
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
    if (isActive) {
        return 'darkgreen'
    } else if (canDrop) {
        return 'darkkhaki'
    } else {
        return '#222222'
    }
}

const Hex = (props: HexProps) => {
    const [{canDrop, isOver}, drop] = useDrop(
        () => ({
            accept: 'champion',
            drop: (item) => {
                const champion = item as Champion;
                champion.items = []
                props.add(champion, props.position)
                return {name: `Hex ${props.position}`} as DropResult
            },
            collect: (monitor: any) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
            canDrop: () => {
                return !props.champion;
            },
        }),
        [props.champion],
    );

    const isActive = canDrop && isOver
    const backgroundColor = selectBackgroundColor(isActive, canDrop)
    const image = props.champion && props.champion.name ?
        'url("' + StaticHelpers.championImage(props.setId, props.champion.name) + '")'
        : undefined;

    return <div ref={drop} style={{backgroundColor: backgroundColor, backgroundImage: image}} className="hex">
        <div className="hex-top"></div>
        <div className="hex-bottom"></div>
    </div>
}

export default Hex;
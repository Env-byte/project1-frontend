import {useDrop} from "react-dnd";
import {DropResult, ItemTypes} from "../../Types/DragDrop";

interface HexProps {
    position: number,
    allowedDrop: boolean
}

function selectBackgroundColor(isActive: boolean, canDrop: boolean) {
    if (isActive) {
        return 'darkgreen'
    } else if (canDrop) {
        return 'darkkhaki'
    } else {
        return '#222'
    }
}

const Hex = (props: HexProps) => {

    const [{canDrop, isOver}, drop] = useDrop(
        () => ({
            accept: 'champion',
            drop: (item, monitor) => {
                console.log('drop', item);
                return {name: `Hex ${props.position}`} as DropResult
            },
            collect: (monitor: any) => ({
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            }),
            canDrop: () => {
                if (props.allowedDrop) {
                    console.log('can drop')
                } else {
                    console.log('cannot drop')
                }
                return props.allowedDrop;
            },
        }),
        [props.allowedDrop],
    );

    const isActive = canDrop && isOver
    const backgroundColor = selectBackgroundColor(isActive, canDrop)


    return <div ref={drop} className="hex">
        <div className="hex-top"></div>
        <div className="hex-bottom"></div>
    </div>
}

export default Hex;
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ReactNode} from "react";

interface DragComponentProps<TItem, TDropResult> {
    type: string
    item: TItem
    onEnd?: (item: TItem, monitor: DragSourceMonitor<TItem, TDropResult>) => void
    children?: ReactNode
    className: string
}

function DragComponent<TItem, TDropResult>(props: DragComponentProps<TItem, TDropResult>) {
    const [{opacity}, drag] = useDrag(
        () => ({
            type: props.type,
            item: props.item as TItem,
            options: {
                dropEffect: 'copy'
            },
            end(item, monitor) {
                if (props.onEnd) {
                    props.onEnd(item as TItem, monitor as DragSourceMonitor<TItem, TDropResult>);
                }
            },
            collect: (monitor: DragSourceMonitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            })
        }),
        [],
    )
    return <div className={props.className + " draggable"} ref={drag} style={{opacity}}>
        {props.children}
    </div>
}

export default DragComponent;
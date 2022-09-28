import {useStaticDataSet} from "../../Contexts/StaticDataContext";
import {ContentClient} from "../../api/FetchWrapper";
import {useId, useMemo} from "react";
import {ItemPortrait} from "../Items/ItemPortrait";
import "../../Css/Champions/Portrait.css"
import {DragSourceMonitor, useDrag} from "react-dnd";
import StaticHelpers from "../../Classes/StaticHelpers";

export interface ChampionPortraitProps {
    characterId: string
    items?: number[]
    tftSet: string
    useDrag?: boolean
}

export const ChampionPortrait = (props: ChampionPortraitProps) => {
    const id = useId();
    const setData = useStaticDataSet(props.tftSet)
    const champion = useMemo(() => {
        return setData.getChampion(props.characterId);
    }, [props.characterId, setData]);

    const [{opacity}, drag] = useDrag(
        () => ({
            type: 'champion',
            item: champion,
            options: {
                dropEffect: 'copy'
            },
            end(item, monitor) {
                // const dropResult = monitor.getDropResult() as DropResult
            },
            collect: (monitor: DragSourceMonitor) => ({
                opacity: monitor.isDragging() ? 0.4 : 1,
            }),
            canDrag: () => {
                return props.useDrag === true;
            }
        }),
        [],
    )

    let items: JSX.Element[] = useMemo(() => {
        let temp = [];
        if (props.items && setData) {
            for (let i = 0; i < props.items.length; i++) {
                const item = setData.getItem(props.items[i])
                if (!item) {
                    console.error('item not found: ', props.items[i])
                }
                temp.push(<ItemPortrait key={id + '-' + i} tftSet={props.tftSet} item={item}/>)
            }
        }
        return temp;
    }, [id, props.items, props.tftSet, setData]);
    if (!champion) {
        return <div className="champion-portrait"><p>Champion Id not found: {props.characterId}</p></div>
    }
    return <div className="champion-portrait" ref={drag} style={{opacity}}>
        <img alt={champion.name}
             src={StaticHelpers.championImage(props.tftSet, champion.name)}/>
        <div className="flex-container item-row">
            {items}
        </div>
    </div>;
}
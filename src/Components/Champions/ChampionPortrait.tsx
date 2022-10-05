import {useStaticDataSet} from "../../Contexts/StaticDataContext";
import {useId, useMemo} from "react";
import {ItemPortrait} from "../Items/ItemPortrait";
import "../../Css/Champions/Portrait.css"
import StaticHelpers from "../../Classes/StaticHelpers";
import DragComponent from "../DragComponent";
import {Champion} from "../../Types/Api/Champion";
import {HexDropResult} from "../TeamBuilder/Hex";

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

    const champPortrait = <>
        <img alt={champion.name}
             src={StaticHelpers.championImage(props.tftSet, champion.name)}/>
        <div className="flex-container item-row">
            {items}
        </div>
    </>;

    if (props.useDrag) {
        return <DragComponent<Champion, HexDropResult>
            className="champion-portrait"
            type={"champion"}
            item={champion}>
            {champPortrait}
        </DragComponent>
    }
    return <div className="champion-portrait">{champPortrait}</div>;
}
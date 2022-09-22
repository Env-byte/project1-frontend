import {useStaticDataSet} from "../../Contexts/StaticDataContext";
import {ContentClient} from "../../api/FetchWrapper";
import {useId, useMemo} from "react";
import {ItemPortrait} from "../Items/ItemPortrait";
import "../../Css/Champions/Portrait.css"

export interface ChampionPortraitProps {
    characterId: string
    items?: number[]
    tftSet: string
}

export const ChampionPortrait = (props: ChampionPortraitProps) => {
    const id = useId();

    const setData = useStaticDataSet(props.tftSet)
    const champion = useMemo(() => {
        if (setData) {
            return setData.getChampion(props.characterId);
        }
        return false;
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
    return <div className="champion-portrait">
        <img alt={champion.name}
             src={ContentClient.ApiPrefix + "/" + props.tftSet + "/champions/" + encodeURIComponent(champion.name.replace('\'', '')) + ".png"}/>
        <div className="flex-container item-row">
            {items}
        </div>
    </div>;
}
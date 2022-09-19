import {ContentClient} from "../../api/FetchWrapper";
import {Item} from "../../Types/Api/Item";
import "../../Css/Items/Portrait.css"

export interface ItemPortraitProps {
    item: Item | false
    tftSet: string
}

export const ItemPortrait = (props: ItemPortraitProps) => {
    if (props.item === false) {
        return <div className="item-holder empty"></div>;
    }

    return <div className="item-holder">
        <img alt={props.item?.name}
             src={ContentClient.ApiPrefix + "/" + props.tftSet + "/items/" + props.item?.id + ".png"}/>
    </div>;
}

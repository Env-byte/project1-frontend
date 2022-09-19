import {Summoner} from "../../Types/Api/Summoner";
import Loading from "../Loading";
import {ContentClient} from "../../api/FetchWrapper";
import "../../Css/Summoner/RankedIcon.css"
import {League} from "../../Types/Api/League";
import {useMemo} from "react";

export interface RankedIconProps {
    summoner: Summoner;
    rankedOnly: boolean;
    leagues: League[] | null;
}

const RankedIcon = (props: RankedIconProps) => {
    let leagues = useMemo(() => {
        if (!props.leagues) {
            return [];
        }
        if (props.rankedOnly) {
            return props.leagues.filter(league => league.queueType === 'RANKED_TFT')
        } else {
            return props.leagues;
        }
    }, [props.leagues, props.rankedOnly])

    if (leagues.length === 0) {
        return <div key="unranked" className={"col-lg-12"}>
            <p className="text-center">Unranked</p>
            <p className="text-center">No games played this season</p>
        </div>
    }

    const length = leagues.length;
    let images = leagues.map<JSX.Element>((league) => {
        let imageName: string;
        let imageText: string;
        if (league.queueType === 'RANKED_TFT') {
            imageName = league.queueType + "-" + league.tier + '.png';
            imageText = league.tier + ' - ' + league.rank;

        } else {
            imageName = league.queueType + "-" + league.ratedTier + '.png';
            imageText = league.ratedTier + ' - ' + league.ratedRating;
        }

        return <div key={league.queueType} className={"col-lg-" + 12 / length}>
            <img key={league.queueType} className="ranked-icon" alt=""
                 src={ContentClient.ApiPrefix + "/ranked_icons/" + imageName}/>
            <p className="text-center">{imageText}</p>
        </div>
    });

    images = images.length === 0 ? [<Loading key="loadingProfile" screen={false} size={"2x"}/>] : images
    return (<div className="row">{images}</div>);
};

export default RankedIcon;
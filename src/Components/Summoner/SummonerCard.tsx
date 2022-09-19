import "../../Css/Summoner/SummonerCard.css"
import {useNavigate} from "react-router-dom";
import {useSummoner} from "../../Hooks/Summoner";
import Loading from "../Loading";
import RankedIcon from "./RankedIcon";
import {useLeagues} from "../../Hooks/Leagues";

interface SummonerCardProps {
    name: string
    region: string
}

const SummonerCard = (props: SummonerCardProps) => {
    let navigate = useNavigate();
    const {summoner} = useSummoner(props.name, props.region);
    const {leagues} = useLeagues((summoner?.id) ?? "", props.region)

    const clickHandle = () => {
        navigate("/summoner/" + props.region + "/" + encodeURIComponent(props.name));
    }
    if (!summoner) {
        return <Loading size={'1x'} screen={false}/>
    }
    return <div onClick={clickHandle} className="card summoner-card">
        <div className="card-header bg-success">
            <h5 className="text-white">{summoner.name}</h5>
        </div>
        <div className="card-body">
            <RankedIcon summoner={summoner} rankedOnly={true} leagues={leagues}/>
        </div>
        <div className="footer">
            <span className="px-2 text-muted">Click to view profile</span>
        </div>
    </div>
}

export default SummonerCard;
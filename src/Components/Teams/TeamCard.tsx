import {Team} from "../../Types/Team";
import {ChampionPortrait} from "../Champions/ChampionPortrait";
import {useNavigate} from "react-router-dom";
import TeamPublicBadge from "./TeamPublicBadge";

interface TeamCardProps {
    team: Team
}

const TeamCard = (props: TeamCardProps) => {
    let navigate = useNavigate();

    let unitPortraits: JSX.Element[] = props.team.hexes.map<JSX.Element>((hex, index) => {
        return <ChampionPortrait tftSet={props.team.setId} key={"portrait" + index}
                                 characterId={hex.champion.championId} items={hex.champion.items}/>;
    }) ?? [];
    const onClickHandle = () => {
        navigate('/teams/builder/' + props.team.guuid)
    }
    return <li onClick={onClickHandle} className="list-group-item">
        <div className="row">
            <div className="col-lg-12">
                <h4>{props.team.name} <TeamPublicBadge isPublic={props.team.isPublic}/></h4>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-12">
                <div className="flex-container">
                    {unitPortraits}
                </div>
            </div>
        </div>
    </li>
}
export default TeamCard;
import {Team} from "../../Types/Team";
import {ChampionPortrait} from "../Champions/ChampionPortrait";
import {useNavigate} from "react-router-dom";
import TeamPublicBadge from "./TeamPublicBadge";
import {useState} from "react";
import {Collapse} from "react-bootstrap";
import Board from "../TeamBuilder/Board";

interface TeamCardProps {
    team: Team
    canEdit: boolean
}

const TeamCard = (props: TeamCardProps) => {
    let navigate = useNavigate();
    const [collapse, setCollpase] = useState(false);


    let unitPortraits: JSX.Element[] = props.team.hexes.map<JSX.Element>((hex, index) => {
        return <ChampionPortrait tftSet={props.team.setId} key={"portrait" + index}
                                 characterId={hex.champion.championId} items={hex.champion.items}/>;
    }) ?? [];

    const onClickHandle = () => {
        if (props.canEdit) {
            navigate('/teams/builder/' + props.team.guuid)
        } else {
            setCollpase(!collapse)
        }
    }

    const collapseNode = <Collapse className="mt-3" in={collapse}>
        <div id="example-collapse-text">
            <div className="row">
                <div className="col-lg-6"></div>
                <div className="col-lg-6">
                    <Board team={props.team}/>
                </div>
            </div>
        </div>
    </Collapse>;

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
        {props.canEdit ? <></> : collapseNode}
    </li>
}
export default TeamCard;
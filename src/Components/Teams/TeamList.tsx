import {Team} from "../../Types/Team";
import {useMemo} from "react";
import TeamCard from "./TeamCard";

interface TeamListProps {
    teams: Team[]
    canEdit: boolean
}

const TeamList = (props: TeamListProps) => {
    const teamCards = useMemo(() => {
        return props.teams.map((team) => <TeamCard canEdit={props.canEdit} key={team.guuid} team={team}/>)
    }, [props.teams,props.canEdit]);

    if (props.teams.length === 0) {
        return <div className="alert alert-danger">No Teams Found</div>
    }

    return <ul className="list-group">{teamCards}</ul>
}

export default TeamList;
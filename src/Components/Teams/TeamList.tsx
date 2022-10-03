import {Team} from "../../Types/Team";
import {useMemo} from "react";
import TeamCard from "./TeamCard";

interface TeamListProps {
    teams: Team[]
}

const TeamList = (props: TeamListProps) => {
    const teamCards = useMemo(() => {
        return props.teams.map((team) => <TeamCard key={team.guuid} team={team}/>)
    }, [props.teams]);

    if (props.teams.length === 0) {
        return <div className="alert alert-danger">No Teams Found</div>
    }

    return <ul className="list-group">{teamCards}</ul>
}

export default TeamList;
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTFTSet} from "../../Contexts/TFTSetContext";
import {useTeam} from "../../Hooks/TeamComp";
import Loading from "../Loading";
import BuilderOptions from "../TeamBuilder/BuilderOptions";
import BuilderBody from "../TeamBuilder/BuilderBody";

const Builder = () => {
    const urlParam = useParams();
    const [teamId, setTeamId] = useState<string>('');
    const {tftSet} = useTFTSet();
    const [team, teamHookState, teamDispatches] = useTeam(tftSet.id, teamId);
    useEffect(() => {
        setTeamId(urlParam.id as string);
    }, [urlParam])

    return <>
        {teamHookState.loading ? <Loading size={'1x'} screen={true}/> : <></>}
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <BuilderOptions
                        name={team.name}
                        isPublic={team.isPublic}
                        guuid={team.guuid}
                        canSave={teamHookState.canSave}
                        saveDispatch={teamDispatches.save}
                        saveOptionsDispatch={teamDispatches.saveOptions}/>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <BuilderBody setId={tftSet.id} team={team} teamDispatches={teamDispatches}/>
                </div>
            </div>
        </div>
    </>;
}

export default Builder;
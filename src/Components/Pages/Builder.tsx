import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {useTFTSet} from "../../Contexts/TFTSetContext";
import {useChampionFilter} from "../../Hooks/ChampionFilter";
import ActiveTraits from "../TeamBuilder/ActiveTraits";
import Board from "../TeamBuilder/Board";
import EquippedItems from "../TeamBuilder/EquippedItems";
import OptionsBar from "../OptionsBar";
import ChampionGrid from "../Champions/ChampionGrid";
import ChampionSearch from "../Champions/ChampionSearch";
import {useTeam} from "../../Hooks/TeamComp";
import Loading from "../Loading";

const Builder = () => {
    const urlParam = useParams();
    const [teamId, setTeamId] = useState<string>('');
    const {tftSet} = useTFTSet();
    const [filterRes, filterDispatches] = useChampionFilter(tftSet.id);
    const [team, loading, teamDispatches] = useTeam(tftSet.id);
    useEffect(() => {
        setTeamId(urlParam.id as string);
    }, [urlParam])

    console.log(team)

    return <>
        {loading ? <Loading size={'1x'} screen={true}/> : <></>}
        <div className="container-fluid">
            <div className="row">
                <div className="col">
                    <h4>TFT Team Builder</h4>
                </div>
            </div>
            <div className="row">
                <div className="col">
                    <div className="row">
                        <div key="card-active-traits" className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <ActiveTraits/>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-6">
                            <Board team={team} dispatches={teamDispatches}/>
                            <br/>
                            <ChampionGrid useDrag={true} filterRes={filterRes} dispatches={filterDispatches} tftSet={tftSet.id}>
                                <ChampionSearch filter={filterRes.filter} onSearch={filterDispatches.search}
                                                tftSet={tftSet.id}/>
                            </ChampionGrid>
                        </div>
                        <div key="card-equipped-items" className="col-lg-3">
                            <div className="card">
                                <div className="card-body">
                                    <EquippedItems/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <OptionsBar showSave={true} saveText={teamId === 'new' ? 'Create' : undefined}/>
    </>;
}

export default Builder;
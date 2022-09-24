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

const Builder = () => {
    const urlParam = useParams();
    const [teamId, setTeamId] = useState<string>('');
    useEffect(() => {
        setTeamId(urlParam.id as string);
    }, [urlParam])
    const {tftSet} = useTFTSet();
    const [filterRes, dispatches] = useChampionFilter(tftSet.id);
    return <>
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
                            <Board/>
                            <br/>
                            <ChampionGrid filterRes={filterRes} dispatches={dispatches} tftSet={tftSet.id}>
                                <ChampionSearch filter={filterRes.filter} onSearch={dispatches.search}
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
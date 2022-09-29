import ActiveTraits from "./ActiveTraits";
import Board from "./Board";
import ChampionGrid from "../Champions/ChampionGrid";
import ChampionSearch from "../Champions/ChampionSearch";
import EquippedItems from "./EquippedItems";
import {useChampionFilter} from "../../Hooks/ChampionFilter";
import {Team} from "../../Types/Team";
import {TeamDispatches} from "../../Hooks/TeamComp";

interface BuilderBodyProps {
    setId: string
    team: Team
    teamDispatches: TeamDispatches
}

const BuilderBody = (props: BuilderBodyProps) => {
    const [filterRes, filterDispatches] = useChampionFilter(props.setId);
    return <div className="row">
        <div key="card-active-traits" className="col-lg-3">
            <div className="card">
                <div className="card-body">
                    <ActiveTraits/>
                </div>
            </div>
        </div>
        <div className="col-lg-6">
            <Board team={props.team} dispatches={props.teamDispatches}/>
            <br/>
            <ChampionGrid useDrag={true} filterRes={filterRes} dispatches={filterDispatches} tftSet={props.setId}>
                <ChampionSearch filter={filterRes.filter} onSearch={filterDispatches.search}
                                tftSet={props.setId}/>
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
}

export default BuilderBody;
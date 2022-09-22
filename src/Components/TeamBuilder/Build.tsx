import ActiveTraits from "./ActiveTraits";
import EquippedItems from "./EquippedItems";
import Board from "./Board";
import ChampionGrid from "../Champions/ChampionGrid";

const Build = () => {

    return <>
        <div className="row">
            <div key="card-active-traits" className="col-3">
                <div className="card">
                    <div className="card-body">
                        <ActiveTraits/>
                    </div>
                </div>
            </div>
            <div className="col-6">
                <Board/>
                <br/>
                <ChampionGrid style={{}}
                              filters={filterState}
                              set={tftSet.id}>
                    <ChampionSearch filters={filterState} onFilterChange={onFilterChange} set={tftSet.id}/>
                </ChampionGrid>
            </div>
            <div key="card-equipped-items" className="col-3">
                <div className="card">
                    <div className="card-body">
                        <EquippedItems/>
                    </div>
                </div>
            </div>
        </div>
    </>
}
export default Build;
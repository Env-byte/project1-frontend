import {useChampionFilter} from "../../Hooks/ChampionFilter";
import {useTFTSet} from "../../Contexts/TFTSetContext";
import ChampionFilters from "../Champions/ChampionFilters";
import ChampionGrid from "../Champions/ChampionGrid";

const Champions = () => {
    const {tftSet} = useTFTSet();
    const [filterRes, dispatches] = useChampionFilter(tftSet.id);
    return <div className="container-fluid">
        <div className="row">
            <div className="col-lg-12">
                <h3>Champions</h3>
            </div>
        </div>
        <div className="row">
            <div key="filters" className="col-md-3">
                <div className="card mb-2">
                    <div className="card-body">
                        <ChampionFilters tftSet={tftSet.id} filter={filterRes.filter} dispatches={dispatches}/>
                    </div>
                </div>
            </div>
            <div key="grid" className="col-md-9">
                <ChampionGrid tftSet={tftSet.id} filterRes={filterRes} dispatches={dispatches}/>
            </div>
        </div>
    </div>
}

export default Champions;
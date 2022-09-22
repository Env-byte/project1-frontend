import SummonerCard from "../Summoner/SummonerCard";
import {useMemo} from "react";

interface Accounts {
    region: string;
    name: string
}

const summonerCards: Accounts[] = [
    {region: 'EUW1', name: 'IreIiasuck'},
    {region: 'EUW1', name: 'ntenvious'},
    {region: 'EUW1', name: 'funkybenzo'},
    {region: 'EUW1', name: 'ntpandaz'},
    {region: 'NA1', name: 'scarra'},
    {region: 'NA1', name: 'milkguy'}
]
const Index = () => {
    const cards = useMemo(() => {
        return summonerCards.map((item) => <div className="col-lg-2 col-sm-6 mb-4">
            <SummonerCard region={item.region} name={item.name} key={"summoner" + item.name}/>
        </div>)
    }, []);
    return <div className="index">
        <div className="row mb-2">
            <div className="col-lg-10 offset-lg-2">
                <h4>Example profiles: </h4>
            </div>
        </div>
        <div className="row">
            {cards}
        </div>
    </div>;
}
export default Index;
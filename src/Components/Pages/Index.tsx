import SummonerCard from "../Summoner/SummonerCard";

const Index = () => {
    return <div className="index">
        <div className="row mb-2">
            <div className="col-lg-10 offset-lg-2">
                <h4>Example profiles: </h4>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-2 mb-4">
                <SummonerCard region="EUW1" name="I reIia suck" key="summoner1"/>
            </div>
            <div className="col-lg-2 mb-4">
                <SummonerCard region="EUW1" name="ntenvious" key="summoner1"/>
            </div>
            <div className="col-lg-2 mb-4">
                <SummonerCard region="EUW1" name="funkybenzo" key="summoner3"/>
            </div>
            <div className="col-lg-2 mb-4">
                <SummonerCard region="EUW1" name="ntpandaz" key="summoner4"/>
            </div>
            <div className="col-lg-2 mb-4">
                <SummonerCard region="NA1" name="scarra" key="summoner4"/>
            </div>
            <div className="col-lg-2 mb-4">
                <SummonerCard region="NA1" name="milkguy" key="summoner4"/>
            </div>
        </div>
    </div>;
}

export default Index;
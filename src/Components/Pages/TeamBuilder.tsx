import Build from "../TeamBuilder/Build";

const TeamBuilder = () => {
    return <>
        <div className="row">
            <div className="col">
                <h4>TFT Team Builder</h4>
            </div>
        </div>
        <div className="row">
            <div className="col">
                <Build/>
            </div>
        </div>
    </>;
}

export default TeamBuilder;
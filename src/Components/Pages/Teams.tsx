import {Link} from "react-router-dom";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";

library.add(faPlus)

const plusIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'plus'})

const Teams = () => {
    return <div className="container-fluid">
        <div className="row">
            <div className="col">
                <h4>TFT Teams</h4>
            </div>
            <div className="col text-end">
                <Link className="btn btn-success" to="/teams/builder/new">
                    <FontAwesomeIcon size="lg" icon={plusIconDefinition}/> Add New</Link>
            </div>
        </div>
        <div className="row">
            <div className="col">
            </div>
        </div>
    </div>;
}

export default Teams;
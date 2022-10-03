import {Link} from "react-router-dom";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React, {useState} from "react";
import {faPlus} from "@fortawesome/free-solid-svg-icons/faPlus";
import {Tab, Tabs} from "react-bootstrap";
import {useUser} from "../../Contexts/UserContext";
import {usePublicTeams, useUserTeams} from "../../Hooks/Teams";
import TeamList from "../Teams/TeamList";
import useUrlState from "@ahooksjs/use-url-state";

library.add(faPlus)

const plusIconDefinition: IconDefinition = findIconDefinition({prefix: 'fas', iconName: 'plus'})

const Teams = () => {
    const {user} = useUser();
    const [state, setState] = useUrlState({ tab: 'public' });
    const userTeams = useUserTeams(user?.accessToken);
    const publicTeams = usePublicTeams();

    return <div className="container-fluid">
        <div className="row mb-2">
            <div className="col">
                <h4>TFT Teams</h4>
            </div>
            <div className="col text-end">
                <Link className="btn btn-success" to="/teams/builder/new">
                    <FontAwesomeIcon size="lg" icon={plusIconDefinition}/> Add New</Link>
            </div>
        </div>

                {(user && user.accessToken !== '') ? (
                    <Tabs
                        id="team-tabs"
                        activeKey={state.tab}
                        onSelect={(k) => {
                            if (!k) {
                                k = 'public'
                            }
                            setState({tab: k})
                        }}
                        className="mb-3">
                        <Tab eventKey="public" title="Public Teams">
                            <TeamList teams={publicTeams}/>
                        </Tab>
                        <Tab eventKey="user" title="My Teams">
                            <TeamList teams={userTeams}/>
                        </Tab>
                    </Tabs>
                ) : <></>}

    </div>;
}

export default Teams;
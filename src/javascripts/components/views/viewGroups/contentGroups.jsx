/* IMPORT MODULES */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

/* IMPORT COMPONENTS */
import { GroupDetails } from './viewGroups-components/groupDetails.jsx';
import { GroupDelete } from './viewGroups-components/groupDelete.jsx';
import { GroupForm } from './viewGroups-components/groupForm.jsx';
import { GroupGeneric } from './viewGroups-components/groupGeneric.jsx';
import { List } from '../../lists/list.jsx';
import { Title } from '../../tags/title.jsx';

/* COMPONENTS */
export const ContentGroups = ({ groups, ...other }) => {
  return(
    <div className="col contenido">
      <div className="row">
        <div className="col">
          <div className="titulo mb-4 text-right">
            <h1>GRUPOS</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      <div className="ventana">
        <div className="row">
          <div className="col">
            <Title total={groups.count} categoria='groups'/>
          </div>
        </div>
        <div className="row mb-3">
          <div className="col-4">
            <List categoria='groups' contenido={groups.data}/>
          </div>
          <div className="col-8">
            <div className="row mb-3">
              <Switch>
                <Route path="/groups/add" render={() => <GroupForm {...other} groups={groups}/>}/>
                <Route path="/groups/delete/:groupId" render={({ match }) => (<GroupDelete {...other} group={groups.data.find(g => g.id == match.params.groupId)}/>)}/>
                <Route path="/groups/edit/:groupId" render={({ match }) => (<GroupForm {...other} groups={groups} group={groups.data.find(g => g.id == match.params.groupId)}/>)}/>
                <Route path="/groups/:groupId" render={({ match }) => (<GroupDetails {...other} group={groups.data.find(g => g.id == match.params.groupId)}/>)}/>
              </Switch>
              <Route exact path="/groups" render={() => (<GroupGeneric/>)}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

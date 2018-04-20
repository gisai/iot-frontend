/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { Panel } from '../lists/panel.jsx';

/* COMPONENTS */
export const Overview = ({ displays, images, groups, user, devices, gateways, filterValue, filterFound, filterFoundValue }) => {
  return(
    <div className="overview">
      <div className="row">
        <div className="col">
          <div className="mb-4 text-right">
            <h1>VISTA GENERAL</h1>
          </div>
          <hr></hr>
        </div>
      </div>
      { !user.admin &&
        <div className="row row-panel">
          <Panel filterValue={filterValue} content={displays} category="displays" appearance="card title-displays" icon="television" size="small"/>
          <Panel filterValue={filterValue} content={images} category="images" appearance="card title-images" icon="picture-o" size="small"/>
          <Panel filterValue={filterValue} content={groups} category="groups" appearance="card title-groups" icon="list" size="small"/>
        </div>
      }
      { user.admin &&
        <div className="row row-panel">
          <Panel filterValue={filterValue} content={devices} filterFound={filterFound} filterFoundValue={filterFoundValue} category="devices" appearance="card title-devices" icon="tablet" size="big"/>
          <Panel filterValue={filterValue} content={gateways} category="gateways" appearance="card title-gateways" icon="sitemap" size="big"/>
        </div>
      }
    </div>
  );
};

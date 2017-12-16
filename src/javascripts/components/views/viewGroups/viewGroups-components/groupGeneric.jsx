/* IMPORT MODULES */
import React from 'react';

/* IMPORT COMPONENTS */
import { AddButton } from '../../../buttons/addButton.jsx';

/* COMPONENTS */
export const GroupGeneric = () => {
  return(
  <div className="col">
    <div className="card detalles bg-transparent border-gray">
      <div className="card-header border-gray">
        <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
          <li className="nav-item mr-auto">
            <h2 className="detalles-titulo text-center"><i className='fa-picture-o' aria-hidden="true"></i>Detalles</h2>
          </li>
        </ul>
      </div>
      <div className="card-body">
        <div className="text-center">
          <h1><i className="fa fa-arrow-left mr-3"></i>Seleccione un grupo</h1>
          <hr></hr>
          <p>O añada uno nuevo</p>
          <AddButton categoria='groups'/>
        </div>
      </div>
    </div>
  </div>
  );
};
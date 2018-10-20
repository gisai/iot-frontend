/* IMPORT MODULES */
import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import Location from '../../../lists/lists-components/location';

/* COMPONENTS */
class ManageLocations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: false,
      isLoaded: false,
      error: null,
      edit: false,
      elementId: '',
      // form
      name: '',
      description: '',
    };
  }

  componentDidMount() {
    const { data: { locations } } = this.props;
	  this.setState({ isLoaded: true, locations });
  }

  componentWillReceiveProps(nextProps) {
	  this.setState({ isLoaded: true, locations: nextProps.data.locations });
  }


		// Handle changes
		handleInputChange = (event) => {
		  const { target: { name, value } } = event.target;
		  this.setState({
		    [name]: value,
		  });
		}

	edit = (elementId) => {
	  const { locations } = this.state;
	  const { name, description } = locations.find(l => l._id === elementId);
	  this.setState({
	    name,
	    description,
	    elementId,
	    edit: true,
	  });
	}

	cancel = () => {
	  this.setState({
	    name: '',
	    description: '',
	    elementId: '',
	    edit: false,
	  });
	}

	/* HANDLE SUBMIT */
	handleSubmit = (method) => {
	  // FORM DATA
	  const {
	    name, description, edit, elementId,
	  } = this.state;
	  const { token, notify, update } = this.props;
	  const form = { name };
	  if (description !== '') { form.description = description; }
	  // HTTP request
	  axios({
	    method,
	    url: edit ? `http://localhost:4000/locations/${elementId}` : 'http://localhost:4000/locations',
	    data: form,
	    headers: { Accept: 'application/json', 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
	  })
	    .then((res) => {
	      if (res.status === 201 || res.status === 200) {
	        switch (method) {
	          case 'put':
	            notify('Localización modificada con éxito', 'notify-success', 'floppy-o', toast.POSITION.TOP_RIGHT, res.data.notify);
	            update('locations', res.data.resourceId, 'edit', res.data.resource); // update dataset
	            break;
	          case 'post':
	            notify('Localización creada con éxito', 'notify-success', 'upload', toast.POSITION.TOP_RIGHT, res.data.notify);
	            update('locations', res.data.resourceId, 'add', res.data.resource); // update dataset
	            this.edit(res.data.resource._id);
	            break;
	          case 'delete':
	            notify('Localización eliminada con éxito', 'notify-success', 'trash', toast.POSITION.TOP_RIGHT, res.data.notify);
	            this.cancel();
	            update('locations', res.data.resourceId, 'remove', res.data.resource); // update dataset
	            break;
	          default:
	            console.log('Something went wrong');
	        }
	      } else {
	        this.setState({
	          isLoaded: true,
	          error: res.data,
	        });
	      }
	    })
	    .catch(() => notify('Error al añadir/modificar localización', 'notify-error', 'exclamation-triangle', toast.POSITION.TOP_RIGHT));
	}

	render() {
	  const {
	    locations, error, isLoaded, elementId, edit, name, description,
	  } = this.state;

	  if (error) {
	    return null; // TODO: handle error
	  } if (!isLoaded) {
	    return null; // TODO: handle loading
	  }
	  const list = locations.map((location) => {
	    if (location._id === elementId) {
	      return <Location location={location} key={location._id} edit={this.edit} active />;
	    }
	      return <Location location={location} key={location._id} edit={this.edit} active={false} />;
	  });
	  list.push(
				<div key="0" className="list-group-item-action list-group-item flex-column align-items-start">
          <div className="text-center elemento">
            <h4 className="mb-1">No se han encontrado {locations.length > 0 && 'más'} localizaciones</h4>
            <hr className="card-division" />
            <small>Número de localizaciones: {locations.length}</small>
          </div>
        </div>,
	  );

	  return (
				<div className="card card-settings">
          <div className="card-header">
            <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
              <li className="nav-item mr-auto">
                <h2 className="detalles-titulo"><i className="fa fa-map-marker mr-3" aria-hidden="true" />Localizaciones</h2>
              </li>
            </ul>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-6">
                <h3>{edit ? 'Editar Localización' : 'Añadir Localizacion'}</h3>
                <hr className="card-division" />
                <form>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="name"><i className="fa fa-map-marker mr-2" />Nombre</label>
                      <input type="text" className="form-control" id="name" placeholder="Nombre de la localización" name="name" value={name} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group col">
                      <label htmlFor="description"><i className="fa fa-info-circle mr-2" />Descripción</label>
                      <input type="text" className="form-control" id="description" placeholder="Descripción" name="description" value={description} onChange={this.handleInputChange} />
                    </div>
                  </div>
                  { !edit
                    ? <button onClick={() => this.handleSubmit('post')} type="button" className="btn btn-block btn-small btn-success"><i className="fa fa-plus-circle mr-1" aria-hidden="true" />Añadir</button>
                    : (
<div className="d-flex w-100 justify-content-between">
                      <button onClick={() => this.handleSubmit('put')} type="button" className="btn btn-block btn-small btn-success mr-2"><i className="fa fa-floppy-o mr-1" aria-hidden="true" />Actualizar</button>
                      <button onClick={() => this.handleSubmit('delete')} type="button" className="btn btn-block btn-small btn-danger ml-1 mr-1"><i className="fa fa-trash-o mr-1" aria-hidden="true" />Eliminar</button>
                      <button onClick={() => this.cancel()} type="button" className="btn btn-block btn-small btn-warning ml-2"><i className="fa fa-times mr-1" aria-hidden="true" />Cancelar</button>
                    </div>
                    )
                  }
                </form>
              </div>
              <div className="col-6">
                <h3 className="d-flex w-100 justify-content-between">Localizaciones<span>{locations.length}</span></h3>
                <hr className="card-division" />
                <div className="list settings-list">
                  <div className="list-group mb-3">
                    {list}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
	  );
	}
}

ManageLocations.propTypes = {
  data: PropTypes.shape.isRequired,
  token: PropTypes.string.isRequired,
  notify: PropTypes.shape.isRequired,
  update: PropTypes.shape.isRequired,
};

export default ManageLocations;

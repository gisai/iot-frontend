/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');
import { Redirect } from 'react-router-dom';

/* COMPONENTS */
export class GroupForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      // form data stored in state
      id: '',
      name: '',
      description: '',
      user: '',
      created_at: '',
      updated_at: '',
      tags: [],
      displays: [],
      images: [],
      active_image: '',
      // form options stored in state
      optionsImages: [],
      optionsDisplays: [],
      optionsActiveImage: [],
      // redirect variables
      redirect: '',
      location: '' // Redirect url
    };
  }

  /* INITIAL VALUES FOR FORM INPUTS */
  componentDidMount(){
    const { displays, groups, images, resolutions, locations } = this.props; // Data from database
    const { group } = this.props;
    const { user } = this.props; // User using the app
    // options for select inputs
    const optionsImages = images.data.map((i) => {
      return(<label key={i.id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckImages} type="checkbox" checked={this.state.images.find((c) => c == i._id)} name={i._id} value={i._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{i.name}</span>
      </label>);
    });
    const optionsDisplays = displays.data.map((d) => {
      return(<label key={d.id} className="custom-control custom-checkbox">
        <input onChange={this.handleCheckDisplays} type="checkbox" checked={this.state.displays.find((c) => c == d._id)} name={d._id} value={d._id} className="custom-control-input"></input>
        <span className="custom-control-indicator"></span>
        <span className="custom-control-description">{d.name}</span>
      </label>);
    });
    const optionsActiveImage = images.data.filter((i) => this.state.images.find((c) => c == i._id)).map((i) => <option value={i._id} key={i.id}>{i.name}</option>);
    // if in post mode get first free id value
    if (!group) {
      const ids = groups.data.map((g) => g.id); // get all ids
      var id = 1; // start from 1
      while (ids.indexOf(id) != -1){id++} // stop at first free id value
    }
    // set state with initial values
    this.setState({
      // form data stored in state
      created_at: group ? group.created_at : moment(),
      updated_at: moment(),
      id: group ? group.id : id,
      name: group ? group.name : '',
      description: group ? group.description : '',
      tags: group ? group.tags : [],
      active_image: group ? group.active_image ? group.active_image._id : '' : '',
      images: group ? group.images.map((i) => i._id) : [],
      displays: group ? group.displays.map((d) => d._id) : [],
      user: user,
      // form options stored in state
      optionsDisplays: optionsDisplays,
      optionsImages: optionsImages,
      optionsActiveImage: optionsActiveImage,
      // redirect variables
      redirect: false,
      location: '/groups/' // Redirect url
    });
  }

  /* HANDLE INPUT CHANGE (CONTROLLED FORM) */
  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    if (name === 'tags'){ var value = target.value.split(','); // TODO: better string to array conversion
    } else { var value = target.value; }
    this.setState({[name]:value});
  }

  /* HANDLE MULTIPLE CHECKBOX */
  handleCheckDisplays = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.displays.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.displays;
      prevState.push(value);
      this.setState({displays: prevState});
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.displays;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({displays: prevState});
    }
  }

  handleCheckImages = (event) => {
    // get value from the checkbox
    const target = event.target;
    const value = target.value;
    // check if the checkbox has been selected
    if (!this.state.images.find((c) => c == value)){ // check if value is stored in state
      // if it is NOT stored, save the state, push the new value and save back the new state
      const prevState = this.state.images;
      prevState.push(value);
      this.setState({images: prevState});
    } else {
      // if it IS stored, save the state, splice the old value and save back the new state
      const prevState = this.state.images;
      prevState.splice(prevState.indexOf(value), 1);
      this.setState({images: prevState});
    }
    if (this.state.images.length == 1){
      // set when first image is selected
      this.setState({active_image: this.state.images[0]})
    } else if (this.state.images.length == 0){
      // if there are no images deselect
      this.setState({active_image: ''})
    }
    this.setState({optionsActiveImage: this.props.images.data.filter((i) => this.state.images.find((c) => c == i._id)).map((i) => <option value={i._id} key={i.id}>{i.name}</option>)});
  } // TODO: filter options and hide unselected options for reviewing / Also limit images could be an option

  /* HANDLE SUBMIT */
  handleSubmit = (event) => {
    event.preventDefault();
    const form = {
      'user'        : this.state.user._id,
      'id'          : this.state.id,
      'name'        : this.state.name,
      'description' : this.state.description,
      'displays'    : this.state.displays,
      'images'      : this.state.images,
      'active_image': this.state.active_image,
      'tags'        : this.state.tags
    };
    fetch('http://localhost:4000/groups', {
      method: 'post', // post method
      headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
      body: JSON.stringify(form)
    })
    .then(this.props.update // update dataset
        // TODO: alert with success
        // TODO: throw error and alert with error
    )
    .then(() => this.setState({ redirect: true }))
    .catch((err) => console.log(err)); // TODO: error handling
  }

  render(){
    if(this.state.redirect){
      return( <Redirect to={this.state.location} /> );
    } else {
      return(
        <div className="col detalles">
          <form id='form' onSubmit={this.handleSubmit}>
            <div className="card bg-transparent border-gray">
              <div className="card-header border-gray">
                <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                  <li className="nav-item mr-auto">
                    <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir una nueva Imagen</h2>
                  </li>
                  <li className="nav-item ml-2">
                    <button type="submit" className="btn btn-outline-grupo"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <div className="form-row">
                  <div className="form-group col-md-1">
                    <label htmlFor="groupID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                    <input type="text" className="form-control" id="groupID" placeholder="ID" name="id" value={this.state.id} readOnly></input>
                  </div>
                  <div className="form-group col-md-11">
                    <label htmlFor="name"><i className="fa fa-picture-o mr-2"></i>Nombre</label>
                    <input type="text" className="form-control" id="name" name="name" value={this.state.name} onChange={this.handleInputChange} placeholder="Nombre del grupo"></input>
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="description"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                  <input type="text" className="form-control" id="description" name="description" value={this.state.description} onChange={this.handleInputChange} placeholder="Descripcion del Grupo"></input>
                </div>
                <div className="form-group">
                  <label htmlFor="user"><i className="fa fa-user-o mr-2"></i>Creador</label>
                  <input type="text" className="form-control" id="user" value={this.state.user.name} readOnly></input>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="images"><i className="fa fa-picture-o mr-2"></i>Asociar una o varias imágenes</label>
                    <div className="custom-controls-stacked shadow">
                      {this.state.optionsImages}
                    </div>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar uno o varios displays</label>
                    <div className="custom-controls-stacked shadow">
                      {this.state.optionsDisplays}
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="active_image"><i className="fa fa-picture-o mr-2"></i>Seleccionar la imagen activa</label>
                    <select className="custom-select" id="active_image" name='active_image' value={this.state.active_image} onChange={this.handleInputChange}>
                      <option value={''} key={0}>Sin imagen activa</option>
                      {this.state.optionsActiveImage}
                    </select>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="created"><i className="fa fa-calendar-o mr-2"></i>Fecha</label>
                    <input type="text" className="form-control" id="created" value={moment(this.state.created_at).format('dddd, D [de] MMMM [de] YYYY')} readOnly></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="tags"><i className="fa fa-tags mr-2"></i>Etiquetas</label>
                    <input type="text" className="form-control" name="tags" id="tags" value={this.state.tags} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-grupo btn-tiny" key={i}>{t}</button> : '')}
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div>
            <p>
              {this.state.displays}
            </p>
            <p>
              {this.state.images}
            </p>
            <p>
              {this.state.active_image}
            </p>
          </div>
        </div>
      );
    }
  }
};

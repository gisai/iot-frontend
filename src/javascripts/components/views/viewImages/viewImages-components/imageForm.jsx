/* IMPORT MODULES */
import React, { Component } from 'react';
const moment = require('moment'); moment.locale('es');

/* COMPONENTS */
export class ImageForm extends Component{

  constructor(props){
    super(props);
    this.state = {
      id: '',
      name: '',
      description: '',
      user: '',
      dimensions: '',
      tags: [],
      created_at: '',
      updated_at: '',
      displays: '',
      groups: '',

      opcionesGrupos: [],
      opcionesDisplays: [],
      opcionesResolucion: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  componentDidMount(){
    const { displays, groups, images, image, settings, user } = this.props;
    const created_at = moment().format('dddd, D [de] MMMM [de] YYYY');
    const updated_at = moment().format('dddd, D [de] MMMM [de] YYYY');
    const opcionesDisplays = displays.data.map((d) => <option value={d.id} key={d.id}>{d.name}</option>);
    const opcionesGrupos = groups.data.map((g) => <option value={g.id} key={g.id}>{g.name}</option>);
    const opcionesResolucion = settings.resolutions.map((r, i) => <option value={i} key={i}>{r.name}</option>);
    if (image) {
      fetch(image.url)
        .then((res) => res.json())
        .then((i) => {
          var created_at = i.created_at;
          var id = i.id;
          var user = i.user;
        }
      );
    } else {
      const identificaciones = images.map((i) => i.id);
      var id = 1;
      while (identificaciones.indexOf(id) != -1){id++}
    }
    this.setState({
      created_at: created_at,
      updated_at: updated_at,
      id: id,
      opcionesDisplays: opcionesDisplays,
      opcionesGrupos: opcionesGrupos,
      opcionesResolucion: opcionesResolucion,
      user: user.name
    });
  }

  handleInputChange(event){
    const target = event.target;
    const value = target.name === 'tags' ? target.value.split(',') : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render(){
    return(
      <div className="col detalles">
        <form>
          <div className="card bg-transparent border-gray">
            <div className="card-header border-gray">
              <ul className="nav nav-pills card-header-pills justify-content-end mx-1">
                <li className="nav-item mr-auto">
                  <h2 className="detalles-titulo"><i className="fa fa-plus-circle mr-3" aria-hidden="true"></i>Añadir una nueva imagen</h2>
                </li>
                <li className="nav-item ml-2">
                  <button type="submit" className="btn btn-outline-imagen"><i className="fa fa-plus-circle mr-2" aria-hidden="true"></i>Añadir</button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              <div className="form-row">
                <div className="form-group col-md-2">
                  <label htmlFor="imagenID"><i className="fa fa-hashtag mr-2"></i>ID</label>
                  <input type="text" className="form-control" id="imagenID" placeholder="ID" name='id' value={this.state.id} readOnly></input>
                </div>
                <div className="form-group col-md-10">
                  <label htmlFor="nombre"><i className="fa fa-television mr-2"></i>Nombre</label>
                  <input type="text" className="form-control" id="nombre" placeholder="Nombre de la imagen" name='name' value={this.state.name} onChange={this.handleInputChange}></input>
                </div>
              </div>
                <div className="form-group">
                  <label htmlFor="descripcion"><i className="fa fa-info-circle mr-2"></i>Descripcion</label>
                  <input type="text" className="form-control" id="descripcion" placeholder="Descripcion de la imagen" name='description' value={this.state.description} onChange={this.handleInputChange}></input>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="creador"><i className="fa fa-user-o mr-2"></i>Creador</label>
                    <input type="text" className="form-control" id="creador" value="Pedro Rodriguez Alia" name='user' value={this.state.user} readOnly></input>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="resolucion"><i className="fa fa-file-image-o mr-2"></i>Archivo</label>
                    <div>
                      <label className="custom-file">
                        <input type="file" id="archivo" className="custom-file-input"></input>
                        <span className="custom-file-control"></span>
                      </label>
                    </div>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="resolucion"><i className="fa fa-arrows-alt mr-2"></i>Resolución</label>
                    <div>
                      <select className="custom-select" name='dimensions' value={this.state.dimensions} onChange={this.handleInputChange}>
                        {this.state.opcionesResolucion}
                      </select>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="displays"><i className="fa fa-television mr-2"></i>Asociar a uno o varios displays</label>
                    <select className="custom-select" id="displays" name='displays' value={this.state.displays} onChange={this.handleInputChange}>
                      {this.state.opcionesDisplays}
                    </select>
                  </div>
                  <div className="form-group col">
                    <label htmlFor="grupos"><i className="fa fa-list mr-2"></i>Asociar a uno o varios grupos</label>
                    <select className="custom-select" id="groups" name='groups' value={this.state.groups} onChange={this.handleInputChange}>
                      {this.state.opcionesGrupos}
                    </select>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    <label htmlFor="etiquetas"><i className="fa fa-tags mr-2"></i>Etiquetas</label>
                    <input type="text" className="form-control" name="tags" id="etiquetas" value={this.state.tags} onChange={this.handleInputChange}></input>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col">
                    {this.state.tags.map((t, i) => t.length > 1 ? <button type="button" className="btn mr-1 btn-outline-imagen btn-tiny" key={i}>{t}</button> : '')}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label htmlFor="fechaCreacion"><i className="fa fa-calendar-o mr-2"></i>Fecha de creación</label>
                    <input type="text" className="form-control" id="fechaCreacion" name='created_at ' value={this.state.created_at} readOnly></input>
                  </div>
                  <div className="form-group col-md-6">
                    <label htmlFor="fechaModificacion"><i className="fa fa-calendar-o mr-2"></i>Fecha de modificación</label>
                    <input type="text" className="form-control" id="fechaModificacion" name='updated_at' value={this.state.updated_at} readOnly></input>
                  </div>
                </div>
            </div>
          </div>
        </form>
      </div>
    );
  }
};
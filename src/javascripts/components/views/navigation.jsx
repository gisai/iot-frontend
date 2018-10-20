/* IMPORT MODULES */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

/* IMPORT COMPONENTS */
import NavButton from '../buttons/navButton';
import Icon from '../icons/icon';

/* COMPONENT */
class Navigation extends Component {
	/* HANDLE SEARCH */
	handleSearch = (event) => {
	  const { filterData } = this.props;
	  filterData(event.target.value);
	}

	/* RENDER COMPONENT */
	render() {
	  const {
	    data: {
	      displays, images, groups, devices, gateways,
	    }, user, syncStatus, token, filterValue, sync, syncApi,
	  } = this.props;

	  const navigationUser = [
	    {
	      id: 1, exact: true, linkTo: '', text: 'Vista general', icon: 'eye', count: false, number: '',
	    },
	    {
	      id: 2, exact: false, linkTo: 'displays', text: 'Displays', icon: 'television', count: true, number: displays ? `${displays.length}/${devices.length}` : '...',
	    },
	    {
	      id: 3, exact: false, linkTo: 'images', text: 'Imagenes', icon: 'picture-o', count: true, number: images ? String(images.length) : '...',
	    },
	    {
	      id: 4, exact: false, linkTo: 'groups', text: 'Grupos', icon: 'list', count: true, number: groups ? String(groups.length) : '...',
	    },
	  ];

	  const navigationAdmin = [
	    {
	      id: 1, exact: true, linkTo: '', text: 'Vista general', icon: 'eye', count: false, number: '',
	    },
	    {
	      id: 2, exact: false, linkTo: 'devices', text: 'Dispositivos', icon: 'tablet', count: true, number: devices ? String(devices.length) : '...',
	    },
	    {
	      id: 3, exact: false, linkTo: 'gateways', text: 'Puertas de enlace', icon: 'sitemap', count: true, number: gateways ? String(gateways.length) : '...',
	    },
	  ];

	  const nav = user && user.admin
	    ? navigationAdmin.map(navItem => <NavButton key={navItem.id} exact={navItem.exact} linkTo={navItem.linkTo} text={navItem.text} icon={navItem.icon} count={navItem.count} number={navItem.number} />)
	    : navigationUser.map(navItem => <NavButton key={navItem.id} exact={navItem.exact} linkTo={navItem.linkTo} text={navItem.text} icon={navItem.icon} count={navItem.count} number={navItem.number} />);

	  let syncButton;

	  switch (syncStatus) {
	    // unsynced
	    case 0:
	    {
	      syncButton = (
				  <li>
						<button onClick={() => syncApi(token)} type="button" className="btn btn-nav btn-block mb-1">
							<Icon icon="refresh" mr="2" fw />
							Buscar dispositivos
						</button>
				  </li>
	      );
	      break;
	    }

	    // syncReady
	    case 1:
	    {
	      syncButton = (
				  <li>
				    <button onClick={() => sync()} type="button" className="btn btn-nav btn-block mb-1">
				      <Icon icon="link" mr="2" fw />
								Sincronizar
        		</button>
				  </li>
			  );
	      break;
	    }

	    // synced
	    case 2:
	    {
	      syncButton = (
				  <li>
				    <button type="button" className="btn btn-nav btn-block mb-1">
				      <Icon icon="check" mr="2" fw />
							Sincronizado
        		</button>
				  </li>
	      );
	      break;
	    }

	    // syncing
	    case 3:
	    {
	      syncButton = (
				  <li>
				    <button onClick={() => syncApi(token)} type="button" className="btn btn-nav btn-block mb-1" disabled>
				      <Icon icon="refresh" mr="2" fw spin />
							Sincronizando
				    </button>
				  </li>
	      );
	      break;
	    }
	    default: {
	      syncButton = '';
	    }
	  }

	  return (
  <div className="col-2 navigation">
    <div className="titulo mb-4 text-center">
      <h1>MENU</h1>
    </div>
    <hr />
    <div className="card card-menu menu">
      <div className="button-menu">
        <div className="busqueda mb-3">
          <p>BÚSQUEDA</p>
          <input onChange={this.handleSearch} value={filterValue} type="text" className="form-control input-no-border search" id="busqueda" aria-describedby="campoBusqueda" placeholder="Buscar..." />
        </div>
        <div className="mb-3">
          <p>NAVEGACIÓN</p>
          <ul className="nav-list">
            {nav}
          </ul>
        </div>
        <div className="mb-3">
          <p>AJUSTES</p>
          <ul className="nav-list">
            {syncButton}
            { user && user.admin
                && <NavButton key="settings" linkTo="settings" text="Configuración" icon="cogs" />
              }
            <li>
              <a tabIndex={-1} href="/disconect">
                <button type="button" className="btn btn-nav btn-block mb-1">
                  <Icon icon="sign-out" mr="2" fw />
                  {' '}
									Desconectar
                </button>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr />
      <p className="d-flex justify-content-between">
        <span>v0.1.5</span>
        <span>{user ? user.name : 'Cargando...'}</span>
      </p>
    </div>
  </div>
	  );
	}
}

Navigation.propTypes = {
  data: PropTypes.shape.isRequired,
  user: PropTypes.shape.isRequired,
  syncStatus: PropTypes.number.isRequired,
  token: PropTypes.string.isRequired,
  filterValue: PropTypes.string.isRequired,
  filterData: PropTypes.shape.isRequired,
  sync: PropTypes.shape.isRequired,
  syncApi: PropTypes.shape.isRequired,
};

export default Navigation;

/* IMPORT MODULES */
import React from 'react'
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom'
const cx = require( 'classnames' )

/* COMPONENT */
export const AddButton = ( { category } ) => {
	const claseBoton = cx( 'btn btn-block btn-small', { 'btn-success': category === 'displays' }, { 'btn-info': category === 'images' }, { 'btn-warning': category === 'groups' }, { 'btn-success': category === 'devices' }, { 'btn-outline-primary': category === 'gateways' } )
	const location = {
		pathname: '/' + category + '/add'
	}
	return (
		<Link to={location}>
      { category != 'displays'
         ? <button type='button' className={claseBoton}><i className='fa fa-plus-circle mr-1' aria-hidden='true'></i>Añadir</button>
         : <button type='button' className={claseBoton}><i className='fa fa-wrench mr-1' aria-hidden='true'></i>Configurar</button>
      }
    </Link>
	)
}

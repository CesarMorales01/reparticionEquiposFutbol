import React from 'react'
import '../css/general.css'
import newLogo from '../images/plus.png'
import jugadoresLogo from '../images/jugadores.png'

const Equipos = (params) => {

    return (
        <>
            <div style={{ marginTop: '1em', textAlign: 'center', margin: '0.5em' }} className="row">
                <div onClick={params.newPlayerFromTeams} className="col-lg-6 col-md-6 col-sm-6 col-6"  >
                    <div style={{ textAlign: 'center' }} className="card border border-primary card-flyer pointer">
                        <img style={{ width: '8em', height: '4em', marginTop: '1em' }} src={newLogo} className="card-img-top img-fluid centerImg" alt="" />
                        <h2 style={{ marginTop: '0.2em', whiteSpace: 'nowrap' }} className="card-title titulo">Nuevo jugador</h2>
                    </div>
                </div>
                <div onClick={params.cambiarPantalla} style={{ textAlign: 'center' }} className="col-lg-6 col-md-6 col-sm-6 col-6"  >
                    <div className="card border border-primary card-flyer pointer">
                        <img style={{ width: '5em', height: '4em', marginTop: '1em' }} src={jugadoresLogo} className="card-img-top img-fluid centerImg" alt="" />
                        <h2 style={{ marginTop: '0.2em' }} className="card-title titulo">Jugadores</h2>
                    </div>
                </div>
            </div>
            <div style={{ marginTop: '1em', marginRight: '0.5em', marginLeft: '0.5em' }} className='row justify-content-center'>
                <div className='row col-6 table-responsive '>
                    <div>
                        <h2 style={{ marginTop: '0.2em', color: 'blue' }} className="titulo">Equipo A</h2>
                        <h5 style={{ fontSize: '0.8em' }} className="titulo">Habilidad: {params.totalHabilidad.hab1}%</h5>
                    </div>

                    <table style={{ color: 'blue' }} className="table">
                        <thead>
                            {params.equipo1.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="col">{index + 1}</th>
                                        <th scope="col">{item.nombre}</th>
                                    </tr>
                                )
                            })}
                        </thead>
                    </table>
                </div>
                <div className='row col-6 table-responsive'>
                    <div>
                        <h2 style={{ marginTop: '0.2em', color: 'green' }} className="titulo">Equipo B</h2>
                        <h5 style={{ fontSize: '0.8em' }} className="titulo">Habilidad: {params.totalHabilidad.hab2}%</h5>
                    </div>
                    <table style={{ color: 'green' }} className="table">
                        <thead>
                            {params.equipo2.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <th scope="col">{index + 1}</th>
                                        <th scope="col">{item.nombre}</th>
                                    </tr>
                                )
                            })}
                        </thead>
                    </table>
                </div>
            </div>
        </>


    )
}

export default Equipos
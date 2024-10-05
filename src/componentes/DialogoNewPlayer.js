import React from 'react'
import { useState, useEffect } from 'react';
import Select from 'react-select'
import Swal from 'sweetalert2'

const DialogoNewPlayer = (params) => {
    const [datos, setDatos] = useState({
        nombre: '',
        nivel: { value: '1', label: 1 }
    })
    const options = [
        { value: '1', label: 1 },
        { value: '2', label: 2 },
        { value: '3', label: 3 }
    ]

    function cambioNombre(nom) {
        setDatos((valores) => ({
            ...valores,
            nombre: nom.target.value,
        }))
    }

    function cambioNivel(e) {
        setDatos((valores) => ({
            ...valores,
            nivel: e,
        }))
    }

    function validarVacios() {
        if (datos.nombre != '') {
            document.getElementById('btnIngresar').click()
            setDatos((valores) => ({
                ...valores,
                nombre: '',
                nivel: { value: '1', label: 1 }
            }))
        } else {
            Swal.fire({
                title: "Escribe un nombre!",
                timer: 1500,
                timerProgressBar: true,
                didOpen: () => {
                    Swal.showLoading();
                }
            })
        }
    }

    return (
        <div className="modal fade bd-example-modal-lg" id='dialogoNewPlayer' tabIndex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
            <div className="modal-dialog modal-lg">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 style={{ fontSize: '1.5em', marginLeft: '0.5em' }} className="modal-title">Nuevo jugador</h1>
                    </div>
                    <div className='container' style={{ margin: '0.2em' }}>
                        <div style={{ textAlign: 'left' }} className="form-group">
                            Nombre:
                            <input name='nombre' onChange={cambioNombre} className='form-control' type="text" placeholder='Nombre' value={datos.nombre} />
                            <br />
                            Nivel:
                            <Select onChange={cambioNivel} value={datos.nivel} options={options} />
                        </div>
                        <div className="modal-footer">
                            <button type="button" id='btnCerrarDialogo' className="btn btn-secondary" data-dismiss="modal">Cancelar</button>
                            <button type='button' onClick={validarVacios} style={{ display: 'inline' }} className="btn btn-success">Agregar jugador</button>
                            <button id='btnLoading' style={{ display: 'none', backgroundColor: 'red' }} className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                Loading...
                            </button>
                            <button onClick={() => params.agregarJugador(datos)} id="btnIngresar" style={{ display: 'none' }}></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DialogoNewPlayer
import { useState, useEffect } from 'react';
import Player from './services/InterfacePlayer';
import './css/general.css'
import checklogo from './images/checklogo.png'
import cancellogo from './images/cancellogo.png'
import newLogo from './images/plus.png'
import armar from './images/armar.jpg'
import DialogoNewPlayer from './componentes/DialogoNewPlayer';
import Equipos from './componentes/Equipos';
import GlobalFunctions from './services/GlobalFunctions'
import Swal from 'sweetalert2'

function App() {
  const glob = new GlobalFunctions()
  const [jugadores, setJugadores] = useState([])
  const [id, setId] = useState(0)
  const [equipo1, setEquipo1] = useState([])
  const [equipo2, setEquipo2] = useState([])
  const [pantalla, setPantalla] = useState(1)
  const [totalHabilidad, setTotalhabilidad] = useState({
    hab1: 0,
    hab2: 0
  })
  const [version] = useState(1)

  useEffect(() => {
    // localStorage.clear()
    validarVersionApp()
    const jugadoresGuardados = localStorage.getItem("usuario")
    if (jugadoresGuardados != null) {
      const players = JSON.parse(jugadoresGuardados)
      setJugadores(shuffleArray(players))
      const lastId = getLastId(JSON.parse(jugadoresGuardados))
      setId(lastId)
    } else {
      cargarJugadores()
    }
  }, [])

  function getLastId(array) {
    let id = 0
    array.forEach(element => {
      if (element.id > id) {
        id = element.id
      }
    })
    return id
  }

  function validarVersionApp() {
    if (version != glob.getCookie('versionApp')) {
      glob.setCookie('versionApp', version)
      borrarCache()
    }
  }

  function borrarCache() {
    if ('caches' in window) {
      caches.keys().then((names) => {
        names.forEach(name => {
          caches.delete(name);
        })
      });
      window.location.reload(true);
    }
  }

  function cargarJugadores() {
    const play = new Player()
    const array = []
    play.setPlayer(0, 'Harvy', 3, true)
    array.push(play.getPlayer())
    play.setPlayer(1, 'Julio', 3, true)
    array.push(play.getPlayer())
    play.setPlayer(2, 'Fabio', 3, true)
    array.push(play.getPlayer())
    play.setPlayer(3, 'Mauricio', 3, true)
    array.push(play.getPlayer())
    play.setPlayer(4, 'Cesar', 3, true)
    array.push(play.getPlayer())
    play.setPlayer(5, 'Gabriel', 2, true)
    array.push(play.getPlayer())
    play.setPlayer(6, 'Sergio', 2, true)
    array.push(play.getPlayer())
    play.setPlayer(7, 'Fernando', 2, true)
    array.push(play.getPlayer())
    play.setPlayer(8, 'Javier', 2, true)
    array.push(play.getPlayer())
    play.setPlayer(9, 'Horacio', 1, true)
    array.push(play.getPlayer())
    play.setPlayer(10, 'Arley', 1, true)
    array.push(play.getPlayer())
    play.setPlayer(11, 'Sebas', 1, true)
    array.push(play.getPlayer())
    play.setPlayer(12, 'Emanuel', 1, true)
    array.push(play.getPlayer())
    play.setPlayer(13, 'Genaro', 1, true)
    array.push(play.getPlayer())
    setJugadores(array)
    setJugadores(shuffleArray(array))
    setId(13)
  }

  function cambiarEstado(jugador) {
    const players = jugadores
    players.forEach(element => {
      if (element.id == jugador.id) {
        if (element.estado) {
          element.estado = false
        } else {
          element.estado = true
        }
      }
    });
    setJugadores(players)
    if (jugador.estado) {
      document.getElementById('img' + jugador.id).src = checklogo
    } else {
      document.getElementById('img' + jugador.id).src = cancellogo
    }
    localStorage.setItem("usuario", JSON.stringify(players))
  }

  function abrirDialogoNewPlayer() {
    document.getElementById('btnDialogoNewPlayer').click()
  }

  function agregarJugador(datos) {
    document.getElementById('btnCerrarDialogo').click()
    const play = new Player()
    const array = jugadores
    play.setPlayer(id + 1, datos.nombre, datos.nivel.label, true)
    setId(id + 1)
    array.push(play.getPlayer())
    setJugadores(array)
    localStorage.setItem("usuario", JSON.stringify(array))
  }

  function shuffleArray(inputArray) {
    inputArray.sort(() => Math.random() - 0.5)
    return inputArray
  }

  function dialogoEliminar(player) {
    Swal.fire({
      title: "Eliminar a " + player.nombre + " ?",
      showCancelButton: true,
      confirmButtonColor: "red",
      cancelButtonColor: "blue",
      confirmButtonText: "Eliminar",
      cancelButtonText: `Cancelar`
    }).then((result) => {
      if (result.isConfirmed) {
        eliminarJugador(player)
      }
    });
  }

  function eliminarJugador(player) {
    const array = jugadores
    const players = array.filter(item => item.id != player.id)
    localStorage.clear()
    setJugadores(players)
    localStorage.setItem("usuario", JSON.stringify(players))
  }

  function buscarSiguienteJugador(equipoa, equipob, player) {
    let jugador = null
    equipoa.forEach(element => {
      if (player.id == element.id) {
        jugador = element
      }
    });
    equipob.forEach(element1 => {
      if (player.id == element1.id) {
        jugador = player
      }
    });
    if (jugador != null) {
      return null
    } else {
      return player
    }
  }

  function armarEquipos() {
    const array = []
    jugadores.forEach(element => {
      array.push(element)
    });
    const revolver = shuffleArray(array)
    const equipoa = []
    const equipob = []
    const nivel1 = []
    const nivel2 = []
    const nivel3 = []
    //Clasificar por niveles
    revolver.forEach(element => {
      if (element.estado) {
        if (element.nivel == 3) {
          nivel3.push(element)
        }
        if (element.nivel == 2) {
          nivel2.push(element)
        }
        if (element.nivel == 1) {
          nivel1.push(element)
        }
      }
    });
    let contador = 1
    nivel3.forEach(element => {
      let siguienteJugador = buscarSiguienteJugador(equipoa, equipob, element)
      if (contador % 2) {
        if (siguienteJugador != null) {
          equipoa.push(siguienteJugador)
        }
      } else {
        if (siguienteJugador != null) {
          equipob.push(siguienteJugador)
        }
      }
      contador++
    });
    nivel2.forEach(element => {
      let siguienteJugador = buscarSiguienteJugador(equipoa, equipob, element)
      if (contador % 2) {
        if (siguienteJugador != null) {
          equipoa.push(siguienteJugador)
        }
      } else {
        if (siguienteJugador != null) {
          equipob.push(siguienteJugador)
        }
      }
      contador++
    });
    nivel1.forEach(element => {
      let siguienteJugador = buscarSiguienteJugador(equipoa, equipob, element)
      if (contador % 2) {
        if (siguienteJugador != null) {
          equipoa.push(siguienteJugador)
        }
      } else {
        if (siguienteJugador != null) {
          equipob.push(siguienteJugador)
        }
      }
      contador++
    });
    // El equipo A siempre va a quedar con mas jugadores, si estos son nivel 1 la diferencia sera grande, por tanto
    // le quito un jugador nivel 1 y se lo paso al equipo b para tratar de equilibrar
    if (equipoa.length > equipob.length) {
      let pasarJugador = equipoa[equipoa.length - 1]
      equipoa.pop(equipoa.length - 1)
      equipob.push(pasarJugador)
      const hab = obtenerPorcentajeHabilidad(sumarHabilidad(equipoa), sumarHabilidad(equipob))
      ponerEquiposEnVariablesGLobales(equipoa, equipob, hab)
    } else {
      //Si en un equipo hay mas con nivel 1, cambiar de equipo un nivel 2 por un nivel 3. 
      if (nivel3.length % 2) {
        let pasarJugador = equipoa[3]
        let filter = equipoa.filter(item => item.id != pasarJugador.id)
        let pasarJugador1 = equipob[equipob.length - 1]
        let filter2 = equipob.filter(item => item.id != pasarJugador1.id)
        filter.push(pasarJugador1)
        filter2.push(pasarJugador)
        const hab = obtenerPorcentajeHabilidad(sumarHabilidad(filter), sumarHabilidad(filter2))
        ponerEquiposEnVariablesGLobales(filter, filter2, hab)
      } else {
        // Aqui siempre el equipo a tiene mas probabilidad de ganar entonces aleatoriamente se pondra equipo a o b
        const ramd = Math.floor(Math.random() * 9)
        if (ramd > 5) {
          const hab = obtenerPorcentajeHabilidad(sumarHabilidad(equipoa), sumarHabilidad(equipob))
          ponerEquiposEnVariablesGLobales(equipoa, equipob, hab)
        } else {
          const hab = obtenerPorcentajeHabilidad(sumarHabilidad(equipob), sumarHabilidad(equipoa))
          ponerEquiposEnVariablesGLobales(equipob, equipoa, hab)
        }
      }
    }
    setPantalla(2)
  }

  function ponerEquiposEnVariablesGLobales(equipoa, equipob, hab) {
    setEquipo1(equipoa)
    setEquipo2(equipob)
    setTotalhabilidad((valores) => ({
      ...valores,
      hab1: hab.hab1Porc.toFixed(2),
      hab2: hab.hab2Porc.toFixed(2)
    }))
  }

  function obtenerPorcentajeHabilidad(hab1, hab2) {
    const totalHab = hab1 + hab2
    const hab1PerCent = (hab1 * 100) / totalHab
    const hab2PerCent = (hab2 * 100) / totalHab
    const obj = {
      totalHab: totalHab,
      hab1Porc: hab1PerCent,
      hab2Porc: hab2PerCent
    }
    return obj
  }

  function sumarHabilidad(array) {
    let hab = 0
    array.forEach(element => {
      hab += element.nivel
    })
    return hab
  }

  function cambiarPantalla() {
    setPantalla(1)
  }

  function nuevoJugadorDesdeEquipos() {
    setPantalla(1)
    abrirDialogoNewPlayer()
  }

  return (
    <div style={{ textAlign: 'center' }} >
      <div style={{ display: pantalla == 1 ? 'none' : '' }}>
        <Equipos totalHabilidad={totalHabilidad} equipo1={equipo1} equipo2={equipo2} newPlayerFromTeams={nuevoJugadorDesdeEquipos} cambiarPantalla={cambiarPantalla} ></Equipos>
      </div>
      <div style={{ display: pantalla == 1 ? '' : 'none' }}>
        <div style={{ marginTop: '1em', textAlign: 'center', margin: '0.5em' }} className="row">
          <div onClick={abrirDialogoNewPlayer} className="col-lg-6 col-md-6 col-sm-6 col-6"  >
            <div style={{ textAlign: 'center' }} className="card border border-primary card-flyer pointer">
              <img style={{ width: '8em', height: '4em', marginTop: '1em' }} src={newLogo} className="card-img-top img-fluid centerImg" alt="" />
              <h2 style={{ marginTop: '0.2em', whiteSpace: 'nowrap' }} className="card-title titulo">Nuevo jugador</h2>
            </div>
          </div>
          <div onClick={armarEquipos} style={{ textAlign: 'center' }} className="col-lg-6 col-md-6 col-sm-6 col-6"  >
            <div className="card border border-primary card-flyer pointer">
              <img style={{ width: '6em', height: '4em', marginTop: '1em' }} src={armar} className="card-img-top img-fluid centerImg" alt="" />
              <h2 style={{ marginTop: '0.2em' }} className="card-title titulo">Armar equipos</h2>
            </div>
          </div>
        </div>
        <h1 style={{ marginTop: '0.8em', fontSize: '1.5em' }} id="titulo" className="text-center"> Jugadores</h1>
        <div style={{ textAlign: 'center', padding: '1em', marginTop: '-0.6em' }} className="container">
          <div className="row justify-content-center" >
            {jugadores.map((item, index) => {
              let img = checklogo
              if (item.estado != true) {
                img = cancellogo
              }
              return (
                <div key={index} id={'div' + item.id} style={{ marginBottom: '1em' }} className="col-lg-4 col-md-4 col-sm-6 col-6"  >
                  <div style={{ width: '11em', height: '9em' }} className="card border border-primary card-flyer pointer align-middle">
                    <button onClick={() => dialogoEliminar(item)} id="btnBorrar" style={{ display: '', width: '20%', textAlign: 'right', margin: '0.1em' }} className="btn btn-outline-danger btn-sm" type="button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                        <path fillRule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
                      </svg>
                    </button>
                    <img onClick={() => cambiarEstado(item)} id={'img' + item.id} style={{ width: '3em', height: '3em', marginTop: '1em' }} src={img} className="card-img-top img-fluid centerImg" alt="" />
                    <div onClick={() => cambiarEstado(item)} style={{ textAlign: 'center' }} className="card-body">
                      <h2 className="card-title superTitulo">{item.nombre}</h2>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <DialogoNewPlayer agregarJugador={agregarJugador}></DialogoNewPlayer>
        <button id='btnDialogoNewPlayer' style={{ display: 'none' }} data-toggle="modal" data-target="#dialogoNewPlayer"></button>
      </div>
    </div>
  );
}

export default App;

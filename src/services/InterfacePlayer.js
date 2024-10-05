class Player{
    id;
    nombre;
    nivel;
    estado;

    setPlayer(id, nombre, nivel, estado){
        this.id=id
        this.nombre=nombre
        this.nivel=nivel
        this.estado=estado
    }

    getPlayer(){
        const player={
            id: this.id,
            nombre: this.nombre,
            nivel: this.nivel,
            estado: this.estado
        }
        return player
    }
}

export default Player
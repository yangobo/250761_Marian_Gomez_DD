class Figura {
    constructor(posicionesCursor = {}, color_linea = "black", color_relleno = "black", grozor_linea = 5) {
        this.posicionesCursor = posicionesCursor || {
            iniciales: { x: 0, y: 0 },
            finales: { x: 0, y: 0 }
        }
        this.color_linea = color_linea
        this.color_relleno = color_relleno
        this.grozor_linea = grozor_linea
    }
}

/*  CUADRADO  */
export class Cuadrado extends Figura {
    Dibujar(ctx) {

        const x = Math.min(this.posicionesCursor.iniciales.x, this.posicionesCursor.finales.x)
        const y = Math.min(this.posicionesCursor.iniciales.y, this.posicionesCursor.finales.y)

        const alto = Math.abs(this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y)
        const ancho = Math.abs(this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x)

        ctx.beginPath()
        ctx.fillStyle = this.color_relleno
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        ctx.fillRect(x, y, ancho, alto)
        ctx.strokeRect(x, y, ancho, alto)
    }
}

/*  LINEA (MEJORADA)  */
export class Linea {
    constructor(posicionesCursor = {}, color_linea = "black", grozor_linea = 5) {
        this.posicionesCursor = posicionesCursor
        this.color_linea = color_linea
        this.grozor_linea = grozor_linea
    }

    Dibujar(ctx) {
        ctx.beginPath()
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

       
        ctx.lineCap = "round"
        ctx.lineJoin = "round"

        ctx.moveTo(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y)
        ctx.lineTo(this.posicionesCursor.finales.x, this.posicionesCursor.finales.y)

        ctx.stroke()
    }
}

/*  CIRCULO (ARREGLADO)  */
export class Circulo extends Figura {
    Dibujar(ctx) {
        const dx = this.posicionesCursor.finales.x - this.posicionesCursor.iniciales.x
        const dy = this.posicionesCursor.finales.y - this.posicionesCursor.iniciales.y
        const radio = Math.sqrt(dx * dx + dy * dy)

        ctx.beginPath()
        ctx.fillStyle = this.color_relleno
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        ctx.arc(this.posicionesCursor.iniciales.x, this.posicionesCursor.iniciales.y, radio, 0, Math.PI * 2)

        ctx.fill()   
        ctx.stroke()
    }
}

/*  ESTRELLA (ARREGLADA)  */
export class Estrella extends Figura {
    Dibujar(ctx) {

        const cx = this.posicionesCursor.iniciales.x
        const cy = this.posicionesCursor.iniciales.y

        const dx = this.posicionesCursor.finales.x - cx
        const dy = this.posicionesCursor.finales.y - cy

        const outerRadius = Math.sqrt(dx * dx + dy * dy)
        const innerRadius = outerRadius / 2

        const spikes = 5

        let rot = Math.PI / 2 * 3
        let x = cx
        let y = cy

        ctx.beginPath()
        ctx.moveTo(cx, cy - outerRadius)

        for (let i = 0; i < spikes; i++) {
            x = cx + Math.cos(rot) * outerRadius
            y = cy + Math.sin(rot) * outerRadius
            ctx.lineTo(x, y)
            rot += Math.PI / spikes

            x = cx + Math.cos(rot) * innerRadius
            y = cy + Math.sin(rot) * innerRadius
            ctx.lineTo(x, y)
            rot += Math.PI / spikes
        }

        ctx.closePath()

        ctx.fillStyle = this.color_relleno
        ctx.strokeStyle = this.color_linea
        ctx.lineWidth = this.grozor_linea

        ctx.fill()   
        ctx.stroke()
    }
}

/* STICKER */
export class Sticker {
    constructor(posicionesCursor, urlImagen, tamano = 80) {
        this.posicionesCursor = posicionesCursor;
        this.imagen = new Image();
        this.imagen.src = urlImagen;
        this.tamano = tamano; 
    }

    Dibujar(ctx) {
        ctx.drawImage(
            this.imagen,
            this.posicionesCursor.iniciales.x,
            this.posicionesCursor.iniciales.y,
            this.tamano, 
            this.tamano
        );
    }
}

/* BORRADOR */


export class Borrador {

    constructor(grosor = 20){
        this.puntos = [];
        this.grosor = grosor;
    }

    agregarPunto(x, y){
        this.puntos.push({x, y});
    }

    Dibujar(ctx){

        if(this.puntos.length < 2) return;

        ctx.save();

        /* esto hace que lo dibujado se vuelva transparente */
        ctx.globalCompositeOperation = "destination-out";

        ctx.beginPath();
        ctx.lineWidth = this.grosor;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.moveTo(this.puntos[0].x, this.puntos[0].y);

        for(let i = 1; i < this.puntos.length; i++){
            ctx.lineTo(this.puntos[i].x, this.puntos[i].y);
        }

        ctx.stroke();

        ctx.restore();
    }
}

/*trazo de pincel, guarda todos los puntos por donde pasa el cursor y los dibuja como una línea continua*/ 

export class TrazoPincel {
    constructor(color, grosor){
        this.puntos = [];
        this.color = color;
        this.grosor = grosor;
    }

    agregarPunto(x, y){
        this.puntos.push({x, y});
    }

    Dibujar(ctx){
        if(this.puntos.length < 2) return;

        ctx.beginPath();
        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.grosor;

      
        ctx.lineCap = "round";
        ctx.lineJoin = "round";

        ctx.moveTo(this.puntos[0].x, this.puntos[0].y);

        for(let i = 1; i < this.puntos.length; i++){
            ctx.lineTo(this.puntos[i].x, this.puntos[i].y);
        }

        ctx.stroke();
    }
}
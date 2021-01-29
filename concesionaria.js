const autos = require('./autos');

let concesionaria = {

    autos: autos,
    buscarAuto: function (patente) {
        let existe = null;
        for (i = 0; i < autos.length; i++) {

            if (patente == autos[0].patente) {
                existe = autos[0];
            } else if (patente == autos[1].patente) {
                existe = autos[1];
            }
        }
        return existe;
    },
    venderAuto: function (patente) {
        let vendido = null;

        if (this.buscarAuto(patente) == autos[0]) {
            vendido = autos[0].vendido = true;
        } else if (this.buscarAuto(patente) == autos[1]) {
            vendido = autos[1].vendido = true;
        }
        return vendido;
    },
    autosParaLaVenta: function () {
        let enStock = autos.filter(autos => autos.vendido !== true);
        return enStock;
    },
    autosNuevos: function () {
        let autosVenta = this.autosParaLaVenta();
        let autosCero = autosVenta.filter(autos => autos.km < 100);
        return autosCero;
    },
    listaDeVentas: function () {
        let contador = [];
        for (let i = 0; i < autos.length; i++) {
            if (autos[i].vendido == !false) {
                contador.push(autos[i].precio);
            }
        }
        return contador;
    },
    totalDeVentas: function () {
        let ventasAcumuladas = this.listaDeVentas();
        let totalAcumuladas = ventasAcumuladas.reduce(function (acum, num) {
            return acum + num;
        }, 0);
        return totalAcumuladas;
    },
    puedeComprar: function (auto, persona) {
        if (persona.capacidadDePagoTotal >= auto.precio && persona.capacidadDePagoEnCuotas >= (auto.precio / auto.cuotas)) {
            return true;
        } else {
            return false;
        }
    },
    autosQuePuedeComprar: function (persona) {
        let autosParaVender = this.autosParaLaVenta();
        return autosParaVender.filter(auto => {
            return this.puedeComprar(auto, persona)
        })
    },

}
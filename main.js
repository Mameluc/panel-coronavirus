$( document ).ready(function() {

    // Variable de pais, modificar para cambiar el pais de referencia para obtener las estadisticas y cambiar el titulo en front
    var country = "Argentina"

    // Agregar un punto (.) para formatear el numero de miles (ej: 1450005 > 145.005)
    function formatNumber(num) {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

    // Llamada a la API de RapidAPI
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country="+country,
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com",
            "x-rapidapi-key": "56a97e464fmsh7d9a63a0f10e1eap125abejsnb30b0e557dda"
        }
    }
    
    $.ajax(settings).done(function (response) {

        var infectadosHTML = document.getElementById("infectados");
        var fatalidadesHTML = document.getElementById("fatalidades");
        var recuperadosHTML = document.getElementById("recuperados");
        var ultimaHTML = document.getElementById("actualizacion");
        var countryHTML = document.getElementById("pais")
    
        function update() {
           infectadosHTML.innerText = formatNumber(response.data.covid19Stats[0].confirmed);
           fatalidadesHTML.innerText = formatNumber(response.data.covid19Stats[0].deaths);
           recuperadosHTML.innerText = formatNumber(response.data.covid19Stats[0].recovered);
           ultimaHTML.innerText = "Ultima actualización: " + response.data.covid19Stats[0].lastUpdate;
           countryHTML.innerText = country
        }

        update();
    });

});


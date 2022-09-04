document.addEventListener("DOMContentLoaded", function (e) {

    productid = window.localStorage.getItem('inmueble-id');

    getJSONData(INMUEBLES_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;
            let compare = productsarray.find(ide => ide.id == productid)         
            for( let i = 0 ; i < productsarray.length; i++){
                infoInmueble(compare)
            }   
        }
    });
}); 

function infoInmueble(inmueble) {

    document.getElementById("titulo").innerHTML = `${inmueble.type} `+` en `+`${inmueble.category}`;
    document.getElementById("infoInmueble").innerHTML = "";
    document.getElementById("localidadInmueble").innerHTML = `${inmueble.location}`+`, `+`${inmueble.departament}`;
    document.getElementById("precioInmueble").innerHTML = `${inmueble.currency} `+` ${inmueble.cost}`;
    document.getElementById("iconitos").innerHTML = iconitos;
   
    iconitos = `<div><h6 class="offset-md-6">Características</h6></div><div class="row offset-md-3"><div class="iconis col-3"><span class="material-icons-round">king_bed</span><p>${inmueble.bedrooms}</p></div>
    <div class="iconis col-3"><span class="material-icons-round">bathtub</span><p> ${inmueble.toilets}</p></div>
    <div class="iconis col-3"><span class="material-icons-round">home</span><p> ${inmueble.squareMetersBuilt}m²</p></div>
    <div class="iconis col-3"><span class="material-icons-round">area_chart</span><p> ${inmueble.squareMeters}m²</p></div></div>`


        ininfo =
            `
            <div class="row">
                <div id="carousel" class="col-lg-6 col-md-12 col-sm-12">
                    <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel"> 
                        <div  class="carousel-inner" id="carrusell">
                            <div id="coso"></div>
                        </div>
                    
                
                        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval"
                            data-bs-slide="prev">
                                <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Previous</span>
                        </button>
                        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval"
                            data-bs-slide="next">
                                <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                <span class="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
                <div class="descriptionInmueble col-lg-6 col-md-12 sm-12">
                    <div class="detallesInmueble">Descripción de la propiedad</div>
                        <div id="div1"> 
                        <div class="description"> ${inmueble.description} </div>
                            <div id="lista2"></div>
                        </div>
                        <br>
                        <br>
                        <div class="row">
                            <div class="descriptionInmueble col-lg-12 col-md-12 sm-12">
                                <div class="detallesInmueble"> Detalles de la propiedad </div>
                                    <table class="table table-striped table-sm" id="listaDetalles">
                                        <tbody>
                                            <tr><th></th><td class= "col-6 px-3">Tipo de inmueble:</td><td>${inmueble.type}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Baños:</td><td>${inmueble.toilets}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Dormitorios:</td><td>${inmueble.bedrooms}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Garage:</td><td>${inmueble.garage}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Departamento:</td><td>${inmueble.departament}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Localidad:</td><td>${inmueble.location}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Calles:</td><td>${inmueble.streets}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Gastos comunes:</td><td>$${inmueble.expenses}</td></tr>
                                            <tr><th></th><td class= "col-6 px-3">Garantías:</td><td>${inmueble.guarantee}</td></tr>
                                        </tbody>
                                    </table>   
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br>
                <hr class="dropdown-divider">
                <br>
                <div class="row">
                        
                    <div id="formularioConsulta" class="col-lg-6">

                        <div class="col">
                            <h4>Consulte por esta propiedad </h4>
                            <form>
                                <input type="text" class="form-control" placeholder="Nombre y apellido">
                                <br>
                                <input type="email" class="form-control" placeholder="Email">
                                <br>
                                <input type="text" class="form-control" placeholder="Teléfono">
                                <br>
                                <textarea style="resize: none;" placeholder="Mensaje" class="form-control" rows="5" id="exampleFormControlTextarea1"></textarea>
                                <br>
                                <div class="d-grid gap-2 d-md-flex justify-content-md-end">
                                    <button type="button" class="btn btn-success ">Enviar</button>
                                </div>
                                            
                            </form>
                        </div> 
                    </div>
                    <div class="col-lg-6">
                        <div class="col py-3">
                            <iframe
                                src="${inmueble.map}"
                                width="100%" height="400px" style="border:5px; solid" allowfullscreen="" loading="lazy" class="map"></iframe>
                        </div>
                        <br>
                    </div>
                </div>
                <br>
            </div>
            `
        document.getElementById("infoInmueble").innerHTML += ininfo;

        let htmlContentToAppend = "";

    for (let i = 0; i < inmueble.images.length; i++) {

        let imageSrc = inmueble.images[i];
        let activeClass = i == 0 ? "active" : "";        

        htmlContentToAppend += `
            <div class="carousel-item ${activeClass}" id="imagen${i}">
                <img style="width: 150%; height: 600px;" id="imInmueble" src="` + imageSrc + `" class="d-block w-100 " id="imagesInmueble" alt="">
            </div>
            
        `
        document.getElementById("coso").innerHTML = htmlContentToAppend;
    }

    /* let lista = "";
    let lista2 = "";

    for(let i = 0 ; i < inmueble.description.length; i++){
    
        lista += `<div class="description"> ${inmueble.description} </div>`

        document.getElementById("lista").innerHTML = lista

    } */

   /*  for(let i = 0 ; i < inmueble.AdditionalInformation.length; i++){
    
        //lista2 += `<div class="description"> ${inmueble.AdditionalInformation[i]} </div>`

        document.getElementById("lista2").innerHTML = lista2

    } */
};

// function showImagesGallery(array) {


//     let htmlContentToAppend = "";

//     for (let i = 0; i < array.length; i++) {

//         let imageSrc = inmueble.images[i];
//         let activeClass = i == 0 ? "active" : "";        

//         htmlContentToAppend += `
//             <div class="carousel-item ${activeClass}" id="imagen${i}">
//                 <img src="` + imageSrc + `" class="d-block w-100" alt="">
//             </div>
            
//         `

//         document.getElementById("coso").innerHTML = htmlContentToAppend;
//     }
// }






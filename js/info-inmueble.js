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

    document.getElementById("titulo").innerHTML = "";
    document.getElementById("infoInmueble").innerHTML = "";
    document.getElementById("localidadInmueble").innerHTML = "";
    document.getElementById("precioInmueble").innerHTML = "";
    document.getElementById("iconitos").innerHTML = "";
    
    let titulo = "";
    let locInmueble = "";
    let ininfo = "";
    let precioInmueble = "";
    let iconitos = "";
    
    titulo = `${inmueble.type} `+` en `+`${inmueble.category}`;
    locInmueble = `${inmueble.location}`+`,`+`${inmueble.departament}`
    precioInmueble = `${inmueble.currency} `+` ${inmueble.cost}` 

    iconitos = `<div><h6 style="text-align:center;">Características</h6></div><div class="row"><div class="iconis col-3"><span class="material-icons-round">king_bed</span><p>${inmueble.bedrooms}</p></div>
    <div class="iconis col-3"><span class="material-icons-round">bathtub</span><p> ${inmueble.toilets}</p></div>
    <div class="iconis col-3"><span class="material-icons-round">home</span><p> ${inmueble.squareMetersBuilt}m²</p></div>
    <div class="iconis col-3"><span class="material-icons-round">area_chart</span><p> ${inmueble.squareMeters}</p></div></div>`


    document.getElementById("iconitos").innerHTML +=iconitos;
    document.getElementById("titulo").innerHTML += titulo;
    document.getElementById("localidadInmueble").innerHTML += locInmueble;
    document.getElementById("precioInmueble").innerHTML += precioInmueble;
    
  
    
        ininfo =
            `
        <div class="row">
            <div id="carousel" class="col-lg-6 col-md-12 sm-12">
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
                <br>
                    <div class="col-lg-6 col-md-12 sm-12 py-4" id="descriptionInmueble">
                        <h4 id="descriptionTitulo" >Descripción</h4>
                                    <div id="lista"></div>
                                    <div id="lista2"></div>
                                </br>
                                </br>
                    
                            <h4> Detalles </h4>
                            <ul class="list-group list-group-flush" id="listaDetalles">
                                <li class="list-group-item"> Tipo de inmueble: ${inmueble.type} </li>
                                <li class="list-group-item"> Baños: ${inmueble.toilets}  </li>
                                <li class="list-group-item"> Dormitorios: ${inmueble.bedrooms} </li>
                                <li class="list-group-item"> Garage: ${inmueble.garage} </li>
                                <li class="list-group-item"> Departamento: ${inmueble.departament} </li>
                                <li class="list-group-item"> Localidad: ${inmueble.location} </li>
                                <li class="list-group-item"> Gastos comunes: ${inmueble.expenses}</li>
                                <li class="list-group-item"> Garantías: ${inmueble.guarantee}</li>
                            </ul>   
                        
                    </div>
            </div>

            <div class="row">
            <iframe src="${inmueble.map}"width="250" height="175" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
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

    let lista = "";
    let lista2 = "";

    for(let i = 0 ; i < inmueble.description.length; i++){
    
        lista += `<p class="description"> ${inmueble.description[i]} </p>`

        document.getElementById("lista").innerHTML = lista

    }

    for(let i = 0 ; i < inmueble.AdditionalInformation.length; i++){
    
        lista2 += `<p class="description"> ${inmueble.AdditionalInformation[i]} </p>`

        document.getElementById("lista2").innerHTML = lista2

    }
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






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

    document.getElementById("tituloSubtitulo").innerHTML = "";
    document.getElementById("infoInmueble").innerHTML = "";
    let tituloySubtitulo = "";
    let ininfo = "";
    
    tituloySubtitulo = `${inmueble.name} `+` <br/>  ` + `${inmueble.currency}` + ` ${inmueble.cost}`

    document.getElementById("tituloSubtitulo").innerHTML += tituloySubtitulo;
        ininfo =
            `
            <div class="row">
            
                <div id="carouselExampleInterval" class="carousel slide col-6" data-bs-ride="carousel"> 
                    <div class="carousel-inner">
                        <div id="coso">
                         </div>
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

                    <div class="col">
                    <h4>Detalles de la propiedad </h4>
                        <p class="inputsinmdescription">${inmueble.description}<p>
                        </br>
                        </br>
                        <div class="row">
                        <div class="col-6">
                            <ul class="list-group list-group-flush">
                                <li class="list-group-item"> Tipo de inmueble: ${inmueble.type} </li>
                                <li class="list-group-item"> Baños: ${inmueble.toilets}  </li>
                                <li class="list-group-item"> Dormitorios: ${inmueble.bedrooms} </li>
                                <li class="list-group-item"> Garage: ${inmueble.garage} </li>
                            </ul>
                        </div>
                        <div class="col-6">
                        <ul>
                            <li class="list-group-item"> Departamento: ${inmueble.departament} </li>
                            <li class="list-group-item"> Localidad: ${inmueble.location} </li>
                            <li class="list-group-item"> Gastos comunes: ${inmueble.expenses}</li>
                            <li class="list-group-item"> Garantías: ${inmueble.guarantee}</li>
                        </ul>
                        </div>
                        </div>
                    </div>
            </div>
            `
        document.getElementById("infoInmueble").innerHTML += ininfo;

        let htmlContentToAppend = "";

    for (let i = 0; i < inmueble.images.length; i++) {

        let imageSrc = inmueble.images[i];
        let activeClass = i == 0 ? "active" : "";        

        htmlContentToAppend += `
            <div  class="carousel-item ${activeClass}" id="imagen${i}">
                <img style="width: 150%; height: 600px;" id="imInmueble" src="` + imageSrc + `" class="d-block w-100" id="imagesInmueble" alt="">
            </div>
            
        `

        document.getElementById("coso").innerHTML = htmlContentToAppend;
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






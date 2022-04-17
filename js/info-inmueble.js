document.addEventListener("DOMContentLoaded", function (e) {

    let productid = window.localStorage.getItem('inmueble-id');

    getJSONData(INMUEBLES_INFO + `/` + productid + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;

            infoInmueble(productsarray);
        }

    });
});


function infoInmueble(inmueble) {







    document.getElementById("inmueblenombre").innerHTML = "";
    document.getElementById("infoInmueble").innerHTML = "";
    document.getElementById("subtitulo").innerHTML = "";

    let ininfo = "";
    let inname = "";
    let inprecio = "";
    


    inname = `<p class="inputinmname">${inmueble.name}</p> `

    document.getElementById("inmueblenombre").innerHTML += inname;

    inprecio = ` <p>${inmueble.currency}` + ` ${inmueble.cost}</p>`

    document.getElementById("subtitulo").innerHTML += inprecio;

    
        ininfo =
            `
            <div class="row" >
                    <div class="col-6">
                        <h6 class="inputsinmdescription">${inmueble.description}<h6>
                    </div>

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






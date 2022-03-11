document.addEventListener("DOMContentLoaded", function (e) {

    let productid = window.localStorage.getItem('inmueble-id');

    getJSONData(INMUEBLES_INFO  + `/` + productid + ".json").then(function (resultObj) {
        if (resultObj.status === "ok") {
            productsarray = resultObj.data;

            infoInmueble(productsarray);
        }

    });
});

function infoInmueble(inmueble) {

    document.getElementById("infoInmueble").innerHTML = "";

    let ininfo = "";
    
    ininfo =
        `
            <div class="row" >
                   <div class="col-6">
                     <h1>${inmueble.name}</h1>
                     <h2>${inmueble.description}<h2>
            <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
                <div class="carousel-inner">
                    <div class="carousel-item active" data-bs-interval="1000">
                        <img src="${inmueble.images[1]}" class="d-block w-100">
                    </div>
                    <div class="carousel-item" data-bs-interval="2000">
                        <img src="${inmueble.images[2]}" class="d-block w-100" alt="...">
                    </div>
                    <div class="carousel-item">
                        <img src="${inmueble.images[3]}" class="d-block w-100" alt="...">
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
            </div>`

    document.getElementById("infoInmueble").innerHTML += ininfo;
};

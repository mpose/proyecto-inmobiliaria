const ORDER_ASC_BY_COST = "Menor Precio";
const ORDER_DESC_BY_COST = "Mayor Precio";
const ORDER_BY_PROD_COUNT = "Mas Vendido";
var currentListadoProductos = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var selectType = undefined;
var selectCategory = undefined;
var filterArray = [];
var buscar = undefined;
const apartamentType = "Apartamento";
const houseType = "Casa";
const rentalCategory = "Alquiler";
const saleCategory = "Venta";

function sortProductos(criteria, array) {
  let result = [];
  if (criteria === ORDER_ASC_BY_COST) {
    result = array.sort(function (a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);

      if (aCost < bCost) {
        return -1;
      }
      if (aCost > bCost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_DESC_BY_COST) {
    result = array.sort(function (a, b) {
      let aCost = parseInt(a.cost);
      let bCost = parseInt(b.cost);

      if (aCost > bCost) {
        return -1;
      }
      if (aCost < bCost) {
        return 1;
      }
      return 0;
    });
  } else if (criteria === ORDER_BY_PROD_COUNT) {
    result = array.sort(function (a, b) {
      let aSCount = parseInt(a.soldCount);
      let bSCount = parseInt(b.soldCount);

      if (aSCount > bSCount) {
        return -1;
      }
      if (aSCount < bSCount) {
        return 1;
      }
      return 0;
    });
  }

  return result;
}
function crearNuevoArray (){

if (selectType){
  if (selectType === 1) {
    selectType = apartamentType;
    filterArray.splice(0); //Borro el valor almacenado en la variable por si ya se filtró una vez, se elimina por el indice de la propiedad (indeice 0 = tipo)
    filterArray.push(selectType); //almaceno en la variable el nuevo valor a filtrar
  }
  if (selectType === 2) {
    selectType = houseType;
    filterArray.splice(0);
    filterArray.push(selectType);
  }
}
if (selectCategory){
  if (selectCategory === 1) {
    selectCategory = saleCategory;
    filterArray.splice(1);
    filterArray.push(selectCategory);
  }
  if (selectCategory === 2) {
    selectCategory = rentalCategory;
    filterArray.splice(1);
    filterArray.push(selectCategory);
  }
}
  
}

function mostrarListadoFiltrado() {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentListadoProductos.length; i++) {
    let productF = currentListadoProductos[i];
    let stringDescription = productF.description
    let stringName = productF.name
    
    
// se seleccionan solamente los inmuebles segun los indices almacenados en la variable (opciones seleccionadas en el combo filtro):
    if ((productF.type === selectType) && (productF.category === selectCategory)) {

    if ((minCount == undefined ||
        (minCount != undefined && parseInt(productF.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(productF.cost) <= maxCount))
        
    ){
      if (
        buscar == undefined ||
        productF.name.toLowerCase().indexOf(buscar) != -1
      )
      if (productF.name.length >= 80) {
        productFname = stringName.substring (0,80) + "...";
      }      
      if (productF.description.length >= 80) {
        productF.description = stringDescription.substring (0,75) + "...";
      }{
        htmlContentToAppend += `
                    <div class="col-md-4 col-sm-6 col-lg-3">
                        <div class="card shadow-sm">
                            <img class="bd-placeholder-img card-img-top" width="100%" height="225px" src="` + productF.images[0] + `"</img>

                            <div class="card-body">
                                <h5 class="card-text">`+ productF.name + `</h5>
                                <p class="card-text">` + productF.description + `</p> 
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-info" onclick="verInfo('` + productF.id + `')"
                                        " >Ver Más</button>
                                    </div>
                                    <small class="text-muted">` + productF.currency + productF.cost + `</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        }
      }

      document.getElementById("listado-inmuebles").innerHTML = htmlContentToAppend;
      }
    
  }

<<<<<<< Updated upstream
=======
}
>>>>>>> Stashed changes

function mostrarListadoProductos() {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentListadoProductos.length; i++) {
    let product = currentListadoProductos[i];
    let stringDescription = product.description
    let stringName = product.name
  

    if ((minCount == undefined ||
        (minCount != undefined && parseInt(product.cost) >= minCount)) &&
      (maxCount == undefined ||
        (maxCount != undefined && parseInt(product.cost) <= maxCount))
        
    ){
      if (
        buscar == undefined ||
        product.name.toLowerCase().indexOf(buscar) != -1
      )
      if (product.name.length >= 80) {
        product.name = stringName.substring (0,80) + "...";
      }      
      if (product.description.length >= 80) {
        product.description = stringDescription.substring (0,75) + "...";
      }{
        htmlContentToAppend += `
                    <div class="col-md-4 col-sm-6 col-lg-3">
                        <div class="card shadow-sm">
                            <img class="bd-placeholder-img card-img-top" width="100%" height="225px" src="` + product.images[0] + `"</img>

                            <div class="card-body">
                                <h5 class="card-text">`+ product.name + `</h5>
                                <p class="card-text">` + product.description + `</p> 
                                <div class="d-flex justify-content-between align-items-center">
                                    <div class="btn-group">
                                        <button type="button" class="btn btn-sm btn-info" onclick="verInfo('` + product.id + `')"
                                        " >Ver Más</button>
                                    </div>
                                    <small class="text-muted">` + product.currency + product.cost + `</small>
                                </div>
                            </div>
                        </div>
                    </div>
                    `;
        }
      }

      document.getElementById("listado-inmuebles").innerHTML = htmlContentToAppend;
      
    }

}

function ordenarYMostrarProductos(sortCriteria, listadoProductos) {
  currentSortCriteria = sortCriteria;

  if (listadoProductos != undefined) {
    currentListadoProductos = listadoProductos;
  }

  currentListadoProductos = sortProductos(
    currentSortCriteria,
    currentListadoProductos
  );

  //Muestro las categorías ordenadas
  crearNuevoArray();
  mostrarListadoProductos();
  mostrarListadoFiltrado();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(INMUEBLES_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      ordenarYMostrarProductos(ORDER_ASC_BY_COST, resultObj.data);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    ordenarYMostrarProductos(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    ordenarYMostrarProductos(ORDER_DESC_BY_COST);
  });

  /* document.getElementById("sortByCount").addEventListener("click", function () {
    ordenarYMostrarProductos(ORDER_BY_PROD_COUNT);
  }); */

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("filterMin").value = "";
    document.getElementById("filterMax").value = "";
    document.getElementById("filterCategory").value = "0";
    document.getElementById("filterType").value = "0";
    document.getElementById("filterDepartament").value = "0";
    document.getElementById("filterLocation").value = "0";
    document.getElementById("filterCondition").value = "0";
    document.getElementById("filterCurrency").value = "0";
    document.getElementById("filterBedrooms").value = "0";
    document.getElementById("filterToilets").value = "0";
    // document.getElementById("buscador").value = "";

    minCount = undefined;
    maxCount = undefined;
    selectType = undefined;
    selectCategory = undefined;

    // buscar = undefined;
    crearNuevoArray();
    mostrarListadoProductos();
  });

  document.getElementById("apliFilter").addEventListener("click", function () {
    //Traigo todos los elementos que realizan el filtro para obtener sus valores
    minCount = document.getElementById("filterMin").value;
    maxCount = document.getElementById("filterMax").value;
    selectCategory = document.getElementById("filterCategory").value;
    selectType = document.getElementById("filterType").value;
    selectDepartament = document.getElementById("filterDepartament").value;
    selectLocation = document.getElementById("filterLocation").value;
    selectCondition = document.getElementById("filterCondition").value;
    selectCurrency = document.getElementById("filterCurrency").value;
    selectBedrooms = document.getElementById("filterBedrooms").value;
    selectToilets = document.getElementById("filterToilets").value;

    if (minCount != undefined && minCount != "" && parseInt(minCount) >= 0) {
      minCount = parseInt(minCount);
    } else {
      minCount = undefined;
    }

    if (maxCount != undefined && maxCount != "" && parseInt(maxCount) >= 0) {
      maxCount = parseInt(maxCount);
    } else {
      maxCount = undefined;
    } 
    if (selectType != undefined  && parseInt(selectType) >= 0) {
      selectType = parseInt(selectType);
    } else {
      selectType = undefined;
    } 
    if (selectCategory != undefined  && parseInt(selectCategory) >= 0) {
      selectCategory = parseInt(selectCategory);
    } else {
      selectCategory = undefined;
    }    
    crearNuevoArray();
    mostrarListadoFiltrado();
  });

});

function verInfo(productid) {
  localStorage.setItem('inmueble-id', productid);
  window.location = 'info-inmueble.html';
<<<<<<< Updated upstream
}
=======

}
>>>>>>> Stashed changes

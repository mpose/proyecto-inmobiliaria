const ORDER_ASC_BY_COST = "Menor Precio";
const ORDER_DESC_BY_COST = "Mayor Precio";
var currentListadoProductos = [];
var currentSortCriteria = undefined;
var selectCategory = undefined;
var selectType = undefined;
var selectDepartament = undefined;
var selectLocation = undefined;
var selectBedrooms = undefined;
var selectToilets = undefined;
var minCount = undefined;
var maxCount = undefined;
var buscar = undefined;
var ultimoListado = [];


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

function comboFiltros() {
  seleccionados = {
      category: selectCategory,
      type: selectType,
      departament: selectDepartament,
      location: selectLocation,
      bedrooms: selectBedrooms,
      toilets: selectToilets
  };
}


function mostrarListadoProductos() {

  let htmlContentToAppend = "";
  for (let i = 0; i < currentListadoProductos.length; i++) {
    let productF = currentListadoProductos[i];    
    
    if (
        ((selectCategory == undefined) || (selectCategory != undefined && productF.category === seleccionados.category)) &&
        ((selectType == undefined) || (selectType != undefined && productF.type === seleccionados.type)) &&
        ((selectDepartament == undefined) || (selectDepartament != undefined && productF.departament === seleccionados.departament)) &&
        ((selectLocation == undefined) || (selectLocation != undefined && productF.location === seleccionados.location)) &&
        ((selectBedrooms == undefined) || (selectBedrooms != undefined && productF.bedrooms === seleccionados.bedrooms)) &&
        ((selectToilets == undefined) || (selectToilets != undefined && productF.toilets === seleccionados.toilets)) &&
        ((minCount == undefined) || (minCount != undefined && parseInt(productF.cost) >= minCount)) &&
        ((maxCount == undefined) || (maxCount != undefined && parseInt(productF.cost) <= maxCount))
          ){
           

            
              htmlContentToAppend += `
              <div class="col-md-4 col-sm-6 col-lg-3">
                  <div class="card shadow-sm">
                  <img class="bd-placeholder-img card-img" width="100%" height="150px" src="` + productF.images[0] + `"</img>

                      <div class="card-body">
                          <h7 class="card-text">`+ productF.name + `</h7>
                          <hr class="dropdown-divider">
                          <div class= "d-flex justify-content-between">
                          <p class="card-text d-flex"><span
                          class="material-icons-round">king_bed</span>` + productF.bedrooms + `</p>
                          <small class="text-muted">` + productF.currency + productF.cost + `</small>
                          </div>
                          
                          <div>
                              <div class="d-grid gap-2">
                                  <button type="button" class="btn btn-sm btn-info" onclick="verInfo('` + productF.id + `')"
                                  " >Ver Más</button>
                              </div>
                              
                          </div>
                      </div>
                  </div>
              </div>
              `;
              
            }
      document.getElementById("listado-inmuebles").innerHTML = htmlContentToAppend;
   
  }

}

function localidadSeleccionada() {
  let departamento = document.getElementById("filterDepartament")
  let localidad = document.getElementById("localidadGeneral")

  if (departamento.value === "Colonia") {
    localidad.enabled
    localidad.innerHTML = 
    ` <div class="input-group mb-1">
        <label class="input-group-text" for="inputGroupSelect01"><span
            class="material-icons-round">my_location</span></label>
        <select class="form-select" id="filterLocation">
          <option value="0" selected>Localidad</option>
          <option value="Colonia del Sacramento">Colonia del Sacramento</option>
          <option value="Rosario">Rosario</option>
          <option value="Nueva Helvecia">Nueva Helvecia</option>
        </select>
      </div>`
  }
  if (departamento.value === "Maldonado") {
    localidad.enabled
    localidad.innerHTML = 
    ` <div class="input-group mb-1">
        <label class="input-group-text" for="inputGroupSelect01"><span
            class="material-icons-round">my_location</span></label>
        <select class="form-select" id="filterLocation">
          <option value="0" selected>Localidad</option>
          <option value="Maldonado">Maldonado</option>
          <option value="Piriapolis">Piriapolis</option>
          <option value="Punta del Este">Punta del Este</option>
        </select>
      </div>`
  }
  if (departamento.value === "Montevideo") {
    localidad.enabled
    localidad.innerHTML = 
    ` <div class="input-group mb-1">
        <label class="input-group-text" for="inputGroupSelect01"><span
            class="material-icons-round">my_location</span></label>
        <select class="form-select" id="filterLocation">
          <option value="0" selected>Localidad</option>
          <option value="Jacinto Vera">Jacinto Vera</option>
          <option value="Parque Rodo">Parque Rodó</option>
          <option value="Tres Cruces">Tres Cruces</option>
        </select>
      </div>`
  }
  if (departamento.value === "Paysandú") {
    localidad.enabled
    localidad.innerHTML = 
    ` <div class="input-group mb-1">
        <label class="input-group-text" for="inputGroupSelect01"><span
            class="material-icons-round">my_location</span></label>
        <select class="form-select" id="filterLocation">
          <option value="0" selected>Localidad</option>
          <option value="Paysandu">Paysandú</option>
          <option value="Guichon">Guichón</option>
          <option value="Tambores">Tambores</option>
        </select>
      </div>`
  }
  if (departamento.value == 0) {
    localidad.innerHTML = 
        ` <div class="input-group mb-1">
            <label class="input-group-text" for="inputGroupSelect01"><span
                class="material-icons-round">my_location</span></label>
            <select class="form-select" id="filterLocation" disabled>
              <option value="0" selected>Localidad</option>
              <option value="1">Seleccione Departamento</option>
            </select>
          </div>`
  }

}
    


function ordenarYMostrarProductos(sortCriteria, alquileres) {
  currentSortCriteria = sortCriteria;

  if (alquileres != undefined) {
    arrayAlquileres = alquileres;
  }

  currentListadoProductos = sortProductos(
    currentSortCriteria,
    arrayAlquileres
  );
  
  
  mostrarListadoProductos();
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(INMUEBLES_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      alquileres = resultObj.data;
      ordenarYMostrarProductos(ORDER_ASC_BY_COST, alquileres);
    }
  });

  document.getElementById("sortAsc").addEventListener("click", function () {
    ordenarYMostrarProductos(ORDER_ASC_BY_COST);
  });

  document.getElementById("sortDesc").addEventListener("click", function () {
    ordenarYMostrarProductos(ORDER_DESC_BY_COST);
  });

  document.getElementById("clearRangeFilter").addEventListener("click", function () {
    document.getElementById("filterMin").value = "";
    document.getElementById("filterMax").value = "";
    document.getElementById("filterCategory").value = "0";
    document.getElementById("filterType").value = "0";
    document.getElementById("filterDepartament").value = "0";
    document.getElementById("filterLocation").value = "0";
    document.getElementById("filterBedrooms").value = "0";
    document.getElementById("filterToilets").value = "0";
    // document.getElementById("buscador").value = "";

    minCount = undefined;
    maxCount = undefined;
    selectCategory = undefined;
    selectType = undefined;
    selectDepartament = undefined;
    selectLocation = undefined;
    selectBedrooms = undefined;
    selectToilets = undefined;

    let inhabilitarLocation = document.getElementById("localidadGeneral");
    if (selectDepartament === undefined) {
      inhabilitarLocation.innerHTML = 
        ` <div class="input-group mb-1">
            <label class="input-group-text" for="inputGroupSelect01"><span
                class="material-icons-round">my_location</span></label>
            <select class="form-select" id="filterLocation" disabled>
              <option value="0" selected>Localidad</option>
              <option value="1">Seleccione Departamento</option>
            </select>
          </div>`
    }

    // buscar = undefined;
    mostrarListadoProductos();
  });

  document.getElementById("filterDepartament").addEventListener("change", function () {
   
  localidadSeleccionada();

  });

  document.getElementById("apliFilter").addEventListener("click", function () {

    minCount = document.getElementById("filterMin").value;
    maxCount = document.getElementById("filterMax").value;
    selectCategory = document.getElementById("filterCategory").value;
    selectType = document.getElementById("filterType").value;
    selectDepartament = document.getElementById("filterDepartament").value;
    selectLocation = document.getElementById("filterLocation").value;
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
    if (selectCategory != 0) {
      selectCategory;
    } else {
      selectCategory = undefined;
    } 
    if (selectType != 0) {
      selectType;
    } else {
      selectType = undefined;
    }
    if (selectDepartament != 0) {
      selectDepartament;
    } else {
      selectDepartament = undefined;
    }
    if (selectLocation != 0) {
      selectLocation;
    } else {
      selectLocation = undefined;
    }
    if (selectBedrooms != 0) {
      selectBedrooms = parseInt(selectBedrooms);
    } else {
      selectBedrooms = undefined;
    }
    if (selectToilets != 0) {
      selectToilets = parseInt(selectToilets);
    } else {
      selectToilets = undefined;
    }
    
    comboFiltros();
    mostrarListadoProductos();
  });
});

function verInfo(productid) {

  localStorage.setItem('inmueble-id', productid);
  window.location = 'info-inmueble.html';

}

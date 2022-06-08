const ORDER_ASC_BY_COST = "Menor Precio";
const ORDER_DESC_BY_COST = "Mayor Precio";
const ORDER_BY_PROD_COUNT = "Mas Vendido";
var currentListadoProductos = [];
var currentSortCriteria = undefined;
var minCount = undefined;
var maxCount = undefined;
var selectCurrency = 0;
var buscar = undefined;
const currencyPesos = "UYU";
const currencyDolar = "USD";

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

function verProducto(name) {
  localStorage.setItem("producto", JSON.stringify({ productName: name }));
  window.location = "product-info.html";
}

function mostrarListadoProductos() {
  let htmlContentToAppend = "";
  for (let i = 0; i < currentListadoProductos.length; i++) {
    let product = currentListadoProductos[i];
    let stringDescription = product.description
    let stringName = product.name
    let currencyPesos = "UYU"
    let currencyDolar = "USD"

    if (selectCurrency === 1) {
      selectCurrency = currencyPesos;
    } 
    if (selectCurrency === 2) {
      selectCurrency = currencyDolar;
    }

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
  mostrarListadoProductos();
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
    // buscar = undefined;

    mostrarListadoProductos();
  });

  document.getElementById("apliFilter").addEventListener("click", function () {
    //Obtengo el mínimo y máximo de los intervalos para filtrar por cantidad
    //de productos por categoría.
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
    if (selectCurrency != 0){
      selectCurrency = parseInt(selectCurrency);
    } else {
      selectCurrency = 0;
    }
    

    mostrarListadoProductos();
  });
 /*  document.getElementById("buscador").addEventListener("input", function () {
    buscar = document.getElementById("buscador").value.toLowerCase();

    mostrarListadoProductos();
  }); */
});

function verInfo(productid) {

  localStorage.setItem('inmueble-id', productid);
  window.location = 'info-inmueble.html';

}

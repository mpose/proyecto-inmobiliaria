/*
 * Variables
 */

let filesList = [];
const classDragOver = "drag-over";
const fileInputMulti = document.querySelector("#multi-selector-uniq #files");
// DEMO Preview
const multiSelectorUniqPreview = document.querySelector("#multi-selector-uniq #preview");

/*
 * Functions
 */

/**
 * Returns the index of an Array of Files from its name. If there are multiple files with the same name, the last one will be returned.
 * @param {string} name - Name file.
 * @param {Array<File>} list - List of files.
 * @return number
 */
function getIndexOfFileList(name, list) {
    return list.reduce(
        (position, file, index) => (file.name === name ? index : position),
        -1
    );
}

/**
 * Returns a File in text.
 * @param {File} file
 * @return {Promise<string>}
 */
async function encodeFileToText(file) {
    return file.text().then((text) => {
        return text;
    });
}

/**
 * Returns an Array from the union of 2 Arrays of Files avoiding repetitions.
 * @param {Array<File>} newFiles
 * @param {Array<File>} currentListFiles
 * @return Promise<File[]>
 */
async function getUniqFiles(newFiles, currentListFiles) {
    return new Promise((resolve) => {
        Promise.all(newFiles.map((inputFile) => encodeFileToText(inputFile))).then(
            (inputFilesText) => {
                // Check all the files to save
                Promise.all(
                    currentListFiles.map((savedFile) => encodeFileToText(savedFile))
                ).then((savedFilesText) => {
                    let newFileList = currentListFiles;
                    inputFilesText.forEach((inputFileText, index) => {
                        if (!savedFilesText.includes(inputFileText)) {
                            newFileList = newFileList.concat(newFiles[index]);
                        }
                    });
                    resolve(newFileList);
                });
            }
        );
    });
}

/**
 * Only DEMO. Render preview.
 * @param currentFileList
 * @Only .EMO> param target.
 * @
 */
function renderPreviews(currentFileList, target, inputFile) {
    //
    target.textContent = "";
    currentFileList.forEach((file, index) => {
        const myLi = document.createElement("li");
        myLi.textContent = file.name;
        myLi.setAttribute("draggable", 'true');
        myLi.dataset.key = file.name;
        myLi.addEventListener("drop", eventDrop);
        myLi.addEventListener("dragover", eventDragOver);
        const myButtonRemove = document.createElement("button");
        myButtonRemove.textContent = "X";
        myButtonRemove.className = "btn btn-secondary btn-sm mb-1";
        myButtonRemove.addEventListener("click", () => {
            filesList = deleteArrayElementByIndex(currentFileList, index);
            inputFile.files = arrayFilesToFileList(filesList);
            return renderPreviews(filesList, multiSelectorUniqPreview, inputFile);
        });
        myLi.appendChild(myButtonRemove);
        target.appendChild(myLi);
    });
}

/**
 * Returns a copy of the array by removing one position by index.
 * @param {Array<any>} list
 * @param {number} index
 * @return {Array<any>} list
 */
function deleteArrayElementByIndex(list, index) {
    return list.filter((item, itemIndex) => itemIndex !== index);
}

/**
 * Returns a FileLists from an array containing Files.
 * @param {Array<File>} filesList
 * @return {FileList}
 */
function arrayFilesToFileList(filesList) {
    return filesList.reduce(function (dataTransfer, file) {
        dataTransfer.items.add(file);
        return dataTransfer;
    }, new DataTransfer()).files;
}


/**
 * Returns a copy of the Array by swapping 2 indices.
 * @param {number} firstIndex
 * @param {number} secondIndex
 * @param {Array<any>} list
 */
function arraySwapIndex(firstIndex, secondIndex, list) {
    const tempList = list.slice();
    const tmpFirstPos = tempList[firstIndex];
    tempList[firstIndex] = tempList[secondIndex];
    tempList[secondIndex] = tmpFirstPos;
    return tempList;
}

/*
 * Events
 */

// Input file
fileInputMulti.addEventListener("input", async () => {
    // Get files list from <input>
    const newFilesList = Array.from(fileInputMulti.files);
    // Update list files
    filesList = await getUniqFiles(newFilesList, filesList);
    // Only DEMO. Redraw
    renderPreviews(filesList, multiSelectorUniqPreview, fileInputMulti);
    // Set data to input
    fileInputMulti.files = arrayFilesToFileList(filesList);
});

// Drag and drop

// Drag Start - Moving element.
let myDragElement = undefined;
document.addEventListener("dragstart", (event) => {
    // Saves which element is moving.
    myDragElement = event.target;
});

// Drag over - Element that is below the element that is moving.
function eventDragOver(event) {
    // Remove from all elements the class that will show that it is a drop zone.
    event.preventDefault();
    multiSelectorUniqPreview
        .querySelectorAll("li")
        .forEach((item) => item.classList.remove(classDragOver));

    // On the element above it, the class is added to show that it is a drop zone.
    event.target.classList.add(classDragOver);
}

// Drop - Element on which it is dropped.
function eventDrop(event) {
    // The element that is underneath the element that is moving when it is released is captured.
    const myDropElement = event.target;
    // The positions of the elements in the array are swapped. The dataset key is used as an index.
    filesList = arraySwapIndex(
        getIndexOfFileList(myDragElement.dataset.key, filesList),
        getIndexOfFileList(myDropElement.dataset.key, filesList),
        filesList
    );
    // The content of the input file is updated.
    fileInputMulti.files = arrayFilesToFileList(filesList);
    // Only DEMO. Changes are redrawn.
    renderPreviews(filesList, multiSelectorUniqPreview, fileInputMulti);
}
function localidadSeleccionada() {
    let departamento = document.getElementById("departamentPublic")
    let localidad = document.getElementById("localidadGeneralPublic")
  
    if (departamento.value === "Colonia") {
      localidad.enabled
      localidad.innerHTML = 
      ` <div class="input-group mb-3">
          <select class="form-select" id="locationPublic">
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
      ` <div class="input-group mb-3">
          <select class="form-select" id="locationPublic">
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
      ` <div class="input-group mb-3">
          <select class="form-select" id="locationPublic">
            <option value="0" selected>Localidad</option>
            <option value="Aguada">Aguada</option>
            <option value="Aires Puros">Aires Puros</option>
            <option value="Atahualpa">Atahualpa</option>
            <option value="Bañados De Carrasco">Bañados De Carrasco</option>
            <option value="Barrio Sur">Barrio Sur</option>
            <option value="Belvedere">Belvedere</option>
            <option value="Brazo Oriental">Brazo Oriental</option>
            <option value="Buceo">Buceo</option>
            <option value="Capurro, Bella Vista">Capurro, Bella Vista</option>
            <option value="Carrasco">Carrasco</option>
            <option value="Carrasco Norte">Carrasco Norte</option>
            <option value="Casabo, Pajas Blancas">Casabo, Pajas Blancas</option>
            <option value="Casavalle">Casavalle</option>
            <option value="Castro, P. Castellanos">Castro, P. Castellanos</option>
            <option value="Centro">Centro</option>
            <option value="Cerrito">Cerrito</option>
            <option value="Cerro">Cerro</option>
            <option value="Ciudad Vieja">Ciudad Vieja</option>
            <option value="Colon Centro Y Noroeste">Colon Centro Y Noroeste</option>
            <option value="Colon Sureste, Abayuba">Colon Sureste, Abayuba</option>
            <option value="Conciliacion">Conciliacion</option>
            <option value="Cordon">Cordon</option>
            <option value="Flor De Maroñas">Flor De Maroñas</option>
            <option value="Ituzaingo">Ituzaingo</option>
            <option value="Jacinto Vera">Jacinto Vera</option>
            <option value="Jardines Del Hipodromo">Jardines Del Hipodromo</option>
            <option value="La Blanqueada">La Blanqueada</option>
            <option value="La Comercial">La Comercial</option>
            <option value="La Figurita">La Figurita</option>
            <option value="La Paloma, Tomkinson">La Paloma, Tomkinson</option>
            <option value="La Teja">La Teja</option>
            <option value="Larrañaga">Larrañaga</option>
            <option value="Las Acacias">Las Acacias</option>
            <option value="Las Canteras">Las Canteras</option>
            <option value="Lezica, Melilla">Lezica, Melilla</option>
            <option value="Malvin">Malvin</option>
            <option value="Malvin Norte">Malvin Norte</option>
            <option value="Manga">Manga</option>
            <option value="Manga, Toledo Chico">Manga, Toledo Chico</option>
            <option value="Maroñas, Parque Guarani">Maroñas, Parque Guarani</option>
            <option value="Mercado Modelo, Bolivar">Mercado Modelo, Bolivar</option>
            <option value="Nuevo Paris">Nuevo Paris</option>
            <option value="Palermo">Palermo</option>
            <option value="Parque Rodo">Parque Rodo</option>
            <option value="Paso De La Arena">Paso De La Arena</option>
            <option value="Paso De Las Duranas">Paso De Las Duranas</option>
            <option value="Peñarol, Lavalleja">Peñarol, Lavalleja</option>
            <option value="Piedras Blancas">Piedras Blancas</option>
            <option value="Pocitos">Pocitos</option>
            <option value="Pque. Batlle, V. Dolores">Pque. Batlle, V. Dolores</option>
            <option value="Prado, Nueva Savona">Prado, Nueva Savona</option>
            <option value="Pta. Rieles, Bella Italia">Pta. Rieles, Bella Italia</option>
            <option value="Punta Carretas">Punta Carretas</option>
            <option value="Punta Gorda">Punta Gorda</option>
            <option value="Reducto">Reducto</option>
            <option value="Sayago">Sayago</option>
            <option value="Tres Cruces">Tres Cruces</option>
            <option value="Tres Ombues, Victoria">Tres Ombues, Victoria</option>
            <option value="Union">Union</option>
            <option value="Villa Española">Villa Española</option>
            <option value="Villa Garcia, Manga Rur.">Villa Garcia, Manga Rur.</option>
            <option value="Villa Muñoz, Retiro">Villa Muñoz, Retiro</option>
          </select>
        </div>`
    }
    if (departamento.value === "Paysandú") {
      localidad.enabled
      localidad.innerHTML = 
      ` <div class="input-group mb-3">
          <select class="form-select" id="locationPublic">
            <option value="0" selected>Localidad</option>
            <option value="Paysandu">Paysandú</option>
            <option value="Guichon">Guichón</option>
            <option value="Tambores">Tambores</option>
          </select>
        </div>`
    }
    if (departamento.value == 0) {
      localidad.innerHTML = 
          ` <div class="input-group mb-3">
              <select class="form-select" id="locationPublic" disabled>
                <option value="0" selected>Localidad</option>
                <option value="1">Seleccione Departamento</option>
              </select>
            </div>`
    }
  
  }
document.getElementById("departamentPublic").addEventListener("change", function () {
   
    localidadSeleccionada();
  
    });
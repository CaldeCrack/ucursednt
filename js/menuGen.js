(function() {

    // Función para establecer un dato en LocalStorage
    function setLocalStorageItem(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    // Función para obtener un dato de LocalStorage
    function getLocalStorageItem(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    // Inicializar configuraciones
    function initSettings() {
        const defaultSettings = {
            features: {
                easyCopyGrades: true,
                easyCopyMembers: true,
                muchoTexto: true,
                otrasRealizaciones: true,
                popupGrading: true,
                resizePreviewPDF: true,
                weekCounter: true,
                pendingTasks: true,
                easyCopyCourseDetails: true,
                collapsableMenus: true,
                pendingNotifications: true,
            },
        };

        if (!getLocalStorageItem("settings")) {
            setLocalStorageItem("settings", defaultSettings);
        }
    }

    // Crear el menú de características
    /**
     * Creates a feature menu based on the settings stored in local storage.
     * @returns {HTMLElement} The created feature menu element.
     */
    function createFeatureMenu() {
        const settings = getLocalStorageItem("settings");
        const features = settings.features;

        const menuElement = document.createElement("div");
        menuElement.id = "feature-menu";

        const featuresList = [
            { id: "easyCopyGrades", name: "Copia Fácil de Notas 📋" },
            { id: "easyCopyMembers", name: "Copia Fácil de Miembros 👥" },
            { id: "muchoTexto", name: "Recortar Texto Largo ➕" },
            { id: "otrasRealizaciones", name: "Otras Realizaciones del Curso 🌐" },
            { id: "popupGrading", name: "Ventana Emergente de Calificaciones 🎓" },
            { id: "resizePreviewPDF", name: "Redimensionar Vista Previa de PDF 📑" },
            { id: "weekCounter", name: "Contador de Semanas 📆" },
            { id: "pendingTasks", name: "Insignia Tareas Pendientes 🔔" },
            { id: "easyCopyCourseDetails", name: "Copia Fácil de Detalles del Curso 🏷" },
            { id: "collapsableMenus", name: "Menús Colapsables 💥" },
            { id: "pendingNotifications", name: "Notificaciones Pendientes 🔔" },
        ];

        featuresList.forEach(feature => {
            const featureElement = document.createElement("div");

            const checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = features[feature.id];
            checkbox.id = feature.id;
            checkbox.addEventListener("change", (e) => {
                features[feature.id] = e.target.checked;
                setLocalStorageItem("settings", settings);
            });

            const label = document.createElement("label");
            label.textContent = feature.name;
            label.setAttribute("for", feature.id);

            featureElement.append(checkbox);
            featureElement.append(label);
            menuElement.append(featureElement);
        });

        return menuElement;
    }

    // Inicializar la página
    function initPage() {
        const errorDisplay = document.querySelector("#error");
        errorDisplay.innerHTML = "";

        const menuTitle = document.querySelector("#navbar > li");
        menuTitle.textContent = "U-Cursedn't";

        const bodyBlankPage = document.querySelector("#body")

        // Crea un espacio para espaciar los elementos dentro de la página
        const spacer = document.createElement('div');
        spacer.style.height = '20px';

        const menuElement = createFeatureMenu();

        const clearButton = document.createElement('button');
        clearButton.textContent = 'Borrar Almacenamiento Local';
        clearButton.id = 'clearLocalStorageButton';

        clearButton.addEventListener('click', function() {
            const clearConfirmed = confirm('¿Estás seguro que quieres borrar el almacenamiento interno? Esta acción no puede revertirse.');
        
            if (clearConfirmed) {
              localStorage.clear();
              console.log('Local storage cleared!');
              initSettings();
              console.log('Settings initialized!');
            } else {
              console.log('Local storage clearing cancelled.');
            }
          });

          // Crea un botón que hace alterna el mostrar el local storage
        const showLocalStorageButton = document.createElement('button');
        const localStorageList = document.createElement('ul');
        showLocalStorageButton.textContent = 'Mostrar Almacenamiento Local';
        showLocalStorageButton.id = 'showLocalStorageButton';
        showLocalStorageButton.addEventListener('click', function() {
            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);
                const value = localStorage.getItem(key);
                // Agrega el elemento a la lista solo una vez
                if (!localStorageList.querySelector(`#${key}`)) {
                    const localStorageItem = document.createElement('li');
                    localStorageItem.id = key;
                    localStorageItem.textContent = `${key}: ${value}`;
                    localStorageList.append(localStorageItem);
                }
            }
            // Si todavía no se muestra la lista, la agrega al cuerpo de la página
            if (!bodyBlankPage.contains(localStorageList)) {
                showLocalStorageButton.textContent = 'Ocultar Almacenamiento Local';
                bodyBlankPage.append(localStorageList);
            }
            // Si ya se ha mostrado la lista, la elimina del cuerpo de la página
            else {
                showLocalStorageButton.textContent = 'Mostrar Almacenamiento Local';
                localStorageList.remove();
            }
        });


        bodyBlankPage.append(menuElement);
        bodyBlankPage.append(spacer);
        bodyBlankPage.append(showLocalStorageButton);
        bodyBlankPage.append(clearButton);

        // Create a new spacer element
        const newSpacer = spacer.cloneNode(true);
        bodyBlankPage.append(newSpacer);
    }

    // Ejecutar la inicialización al cargar la página
    initSettings();
    initPage();

    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        console.log(`Key: ${key}, Value: ${value}`);
    }

})();
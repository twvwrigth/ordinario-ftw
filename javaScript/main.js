// Variable para guardar los datos del XML globalmente
let xmlDocGlobal = null;

// Ejecutar de inmediato al entrar a la página
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('tabla-contenedor')) {
        conectarXML();
    }
});

function conectarXML() {
    // Fetch básico para leer el archivo XML
    fetch('../XML/discografia.xml')
        .then(respuesta => respuesta.text())
        .then(datosText => {
            const parser = new DOMParser();
            xmlDocGlobal = parser.parseFromString(datosText, "text/xml");
            // Renderizar todo al principio
            construirTabla(xmlDocGlobal.getElementsByTagName('album'));
        })
        .catch(error => {
            console.error("Error al leer el XML:", error);
            document.getElementById('tabla-contenedor').innerHTML = "<p style='color:red;'>Error al cargar los discos.</p>";
        });
}

function construirTabla(nodosAlbum) {
    const contenedor = document.getElementById('tabla-contenedor');
    let htmlTabla = `
        <table border="1" style="width: 100%; border-collapse: collapse; text-align: left; background: #111; color: #fff;">
            <thead>
                <tr style="background: #222; color: #d4af37;">
                    <th style="padding: 10px;">Álbum / Proyecto</th>
                    <th style="padding: 10px;">Año de Lanzamiento</th>
                    <th style="padding: 10px;">Canciones Destacadas</th>
                    <th style="padding: 10px;">Tipo</th>
                </tr>
            </thead>
            <tbody>
    `;

    // Ciclo FOR simple solicitado por el nivel del curso
    for (let i = 0; i < nodosAlbum.length; i++) {
        const titulo = nodosAlbum[i].getElementsByTagName('titulo')[0].textContent;
        const año = nodosAlbum[i].getElementsByTagName('año')[0].textContent;
        const canciones = nodosAlbum[i].getElementsByTagName('canciones')[0].textContent;
        const tipo = nodosAlbum[i].getElementsByTagName('tipo')[0].textContent;

        htmlTabla += `
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #d4af37;">${titulo}</td>
                <td style="padding: 10px;">${año}</td>
                <td style="padding: 10px; color: #ccc;">${canciones}</td>
                <td style="padding: 10px; font-style: italic;">${tipo}</td>
            </tr>
        `;
    }

    htmlTabla += `
            </tbody>
        </table>
    `;

    // Inyectar en el DOM
    contenedor.innerHTML = htmlTabla;
}

function filtrarDiscos(tipoFiltro) {
    if (!xmlDocGlobal) return;

    const todosLosDiscos = xmlDocGlobal.getElementsByTagName('album');

    if (tipoFiltro === 'TODOS') {
        construirTabla(todosLosDiscos);
    } else {
        const discosFiltrados = [];
        for (let i = 0; i < todosLosDiscos.length; i++) {
            const tipoDoc = todosLosDiscos[i].getElementsByTagName('tipo')[0].textContent;
            if (tipoDoc === tipoFiltro) {
                discosFiltrados.push(todosLosDiscos[i]);
            }
        }
        construirTabla(discosFiltrados);
    }
}
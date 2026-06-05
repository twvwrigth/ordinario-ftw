function cambiarSeccion(seccionDestino) {
    document.getElementById('sec-prepa').style.display = 'none';
    document.getElementById('sec-gimnasio').style.display = 'none';
    document.getElementById('sec-universidad').style.display = 'none';
    document.getElementById('conclusión').style.display = 'none';

    if (seccionDestino === 'prepa') {
        document.getElementById('sec-prepa').style.display = 'block';
    } else if (seccionDestino === 'gimnasio') {
        document.getElementById('sec-gimnasio').style.display = 'block';
    } else if (seccionDestino === 'universidad') {
        document.getElementById('sec-universidad').style.display = 'block';
    } else if (seccionDestino === 'conclusión') {
        document.getElementById('conclusión').style.display = 'block';
    }

    const botones = document.getElementsByClassName('btn-navegacion');
    
    for (let i = 0; i < botones.length; i++) {
        botones[i].style.background = '#222';
        botones[i].style.color = '#fff';
        botones[i].style.border = '1px solid #444';
    }

    event.currentTarget.style.background = '#d4af37';
    event.currentTarget.style.color = '#000';
    event.currentTarget.style.border = 'none';
}
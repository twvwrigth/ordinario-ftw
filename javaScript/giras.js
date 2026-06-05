// Este código maneja exclusivamente la interactividad de la página giras.html
document.addEventListener('DOMContentLoaded', () => {
    
    // Obtener las referencias de los elementos del formulario mediante el DOM
    const selectZona = document.getElementById('zona');
    const inputCantidad = document.getElementById('cantidad');
    const chkDescuento = document.getElementById('descuento-fan');
    const txtTotal = document.getElementById('total-pago');
    const btnComprar = document.getElementById('btn-comprar');

    // Función básica para calcular el precio final en tiempo real
    function calcularTotal() {
        const precioZona = parseFloat(selectZona.value);
        let cantidad = parseInt(inputCantidad.value);

        // Validaciones simples para evitar errores en el input de teclado
        if (isNaN(cantidad) || cantidad < 1) {
            cantidad = 1;
        } else if (cantidad > 5) {
            cantidad = 5;
            inputCantidad.value = 5;
        }

        // Operación matemática básica
        let total = precioZona * cantidad;

        // Aplicar el 10% de descuento si el checkbox está marcado
        if (chkDescuento.checked) {
            total = total * 0.9;
        }

        // Pintar el resultado formateado en la pantalla
        txtTotal.textContent = `$${total.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN`;
    }

    // Eventos interactivos (Escuchan los clics y el teclado del usuario)
    selectZona.addEventListener('change', calcularTotal);
    inputCantidad.addEventListener('input', calcularTotal); 
    chkDescuento.addEventListener('change', calcularTotal);

    // Evento para el botón de confirmación con alerta
    btnComprar.addEventListener('click', () => {
        const cantidad = inputCantidad.value;
        const textoZona = selectZona.options[selectZona.selectedIndex].text.split(' - ')[0];
        
        alert(`¡Apartado exitoso!\nHas reservado ${cantidad} boleto(s) para la zona: ${textoZona}.\nPronto validaremos tus datos.`);
    });
});
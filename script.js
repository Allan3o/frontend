document.addEventListener('DOMContentLoaded', function () {

    function calcularTotal() {

        const checkboxes = document.querySelectorAll('.item-produto');
        const quantidades = document.querySelectorAll('.qtd-produto');

        let total = 0;

        checkboxes.forEach((checkbox, index) => {

            if (checkbox.checked) {

                const preco = parseFloat(checkbox.value);
                const qtd = parseInt(quantidades[index].value) || 0;

                total += preco * qtd;
            }

        });

        const campoTotal = document.getElementById('valor-total');

        campoTotal.textContent = total.toLocaleString('pt-BR', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }

    const elementos = document.querySelectorAll('.item-produto, .qtd-produto');

    elementos.forEach(elemento => {
        elemento.addEventListener('change', calcularTotal);
    });

    calcularTotal();

});
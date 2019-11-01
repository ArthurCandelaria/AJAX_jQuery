$(document).ready(function () {

    $('#enviar').click(cliqueBotao)
    $('.load').hide()
    $('.bg').hide()

})

function cliqueBotao(event) {

    debugger

    $('#retorno').removeClass();

    event.preventDefault();
    var id = $("#id_nota").val();
    var url = 'http://www.deveup.com.br/notas/api/notes/'

    jQuery.ajax({
        type: 'GET',
        dataType: 'json',
        url: url + id,
        success: exibeNota,
        beforeSend: loading,
        error: error
    });
}

function exibeNota(data) {

    if ($.isArray(data)) {

        $('#retorno').html('')

        $.each(data, function (index, value) {
            //prepend irá add elementos acima
            //append irá add elementos abaixo
            $('#retorno').prepend('<div>id: ' + value.id + '<br>título: ' + value.title + '<br>conteudo: ' + value.body + '<br></div>')
            $('#retorno div').addClass('alert alert-primary')

        })

    } else {

        $('#retorno').html('')

        $('#retorno').html('<div>id: ' + data.id + '<br>título: ' + data.title + '<br>conteudo: ' + data.body + '<br></div>')
        $('#retorno div').addClass('alert alert-primary')

    }

}

function loading() {

    $('.load').show()
    $('.bg').show()
    setTimeout(function () {
        $('.load').hide()
        $('.bg').hide()
    }, 1000)

}

function error() {
    var retorno = $('#retorno')
    retorno.addClass('alert alert-danger')
    retorno.html('Ops!<br>Objeto não encontrado.')

}
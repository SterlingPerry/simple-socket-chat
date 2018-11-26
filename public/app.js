$(function () {

    const sendMessage = function (event) {
        event.preventDefault();

        const newMessage = {
            name: $('#name').val(),
            message: $('#message').val()
        }

        $.post('/api/messages', newMessage).then(function (response) {
            render(response);
        });
        console.log(newMessage);
    };
 

    $.get('api/messages')
    .then(function (serverData) {
        for(let i = 0; i < serverData.length; i++){
            render(serverData[i])
        }
    });

    const render = function (message) {
        $('#messages').append(`
            <h4> ${message.name}</h4>
            <p>${message.message}</p><hr>`)
    };

    $('#send').on('click', sendMessage);


});

const socket = io();

   const sendMessage = function (event) {
      event.preventDefault();

      const message = {
         name: $('#name').val(),
         message: $('#message').val()
      };

      console.log(message);

      $.post('/api/messages', message).then(function (response) {
         console.log(response);
      });

      socket.emit('new-message', message);
     
   };

   socket.on('emit-message', function (data) {
      console.log(data)
      render(data)
   });

   $.get('api/messages')
      .then(function (serverData) {
         for (let i = 0; i < serverData.length; i++) {
            render(serverData[i])
         }
      });

   const render = function (message) {
      $('#messages').append(`
            <h4> ${message.name}</h4>
            <p>${message.message}</p><hr>`)
   };

   $('#send').on('click', sendMessage);


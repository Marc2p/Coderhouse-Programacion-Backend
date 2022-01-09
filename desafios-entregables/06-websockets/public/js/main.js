let socket = io.connect();

socket.on('productos', (data) => {
  console.log(data);
});
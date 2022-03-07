const randomNumber = (cant) => {
  let numbers =[];
  for (let i = 0; i < cant; i++) {
    let random = Math.floor((Math.random() * 999) + 1);
    numbers.push(random);
  }
  let repetidos = {};
  numbers.forEach((numero) => {
    repetidos[numero] = (repetidos[numero] || 0) + 1;
  });
  return repetidos;
}

process.on('message', (msg) => {
  console.log(`cantidad: ${msg}`);
  const generar = randomNumber(msg);
  process.send(JSON.stringify(generar));
  process.exit();
});
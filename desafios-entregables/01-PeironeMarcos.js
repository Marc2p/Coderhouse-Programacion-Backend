// Desafío entregable 21-11-2021
/* Consignas:
1) Declarar una clase Usuario
2) Hacer que Usuario cuente con los siguientes atributos:
*nombre: String
*apellido: String
*libros: Object[]
*mascotas: String[]
Los valores de los atributos se deberán cargar a través del constructor, al momento de crear las instancias.
3) Hacer que Usuario cuente con los siguientes métodos:
*getFullName(): String. Retorna el completo del usuario. Utilizar template strings.
*addMascota(String): void. Recibe un nombre de mascota y lo agrega al array de mascotas.
*countMascotas(): Number. Retorna la cantidad de mascotas que tiene el usuario.
*addBook(String, String): void. Recibe un string 'nombre' y un string 'autor' y debe agregar un objeto: { nombre: String, autor: String } al array de libros.
*getBookNames(): String[]. Retorna un array con sólo los nombres del array de libros del usuario.
4) Crear un objeto llamado usuario con valores arbitrarios e invocar todos sus métodos.
*/

class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(nuevaMascota) {
        this.mascotas.push(nuevaMascota);
    }

    countMascotas() {
        return this.mascotas.length;
    }

    addBook(nombre, autor) {
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames() {
        let libros = [];
        for (let i = 0; i < this.libros.length; i++) {
            libros.push(this.libros[i].nombre);
        }
        return libros;
    }
}

// creamos una instancia de la clase y probamos los métodos
let usuario = new Usuario(
    'Marcos',
    'Peirone',
    [
        {
            nombre: 'Apocalipsis',
            autor: 'Stephen King'
        },
        {
            nombre: 'It',
            autor: 'Stephen King'
        },
        {
            nombre: 'Astillas en la Piel',
            autor: 'César Pérez Gellida'
        }
    ],
    [
        'Perro',
        'Gato',
        'Loro'
    ]
    );

console.log(`El nombre completo del usuario es ${usuario.getFullName()}`);
console.log(`El usuario ${usuario.getFullName()} tiene ${usuario.countMascotas()} mascotas`);
usuario.addMascota('tortuga');
console.log(`Ahora ${usuario.nombre} tiene ${usuario.countMascotas()} mascotas`);
usuario.addBook('El Ritual de los Muertos', 'Nagore Suárez');
console.log(`Los libros de ${usuario.getFullName()} son: ${usuario.getBookNames()}`);
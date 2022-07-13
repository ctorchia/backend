
class Usuario {
    constructor(nombre, apellido, libros, mascotas) {
        this.nombre = nombre;       // String
        this.apellido = apellido;   // String
        this.libros = libros;       // Object[]
        this.mascotas = mascotas;   // String[]
    }
    getFullName() {                                     // Return Full Name
        return `${this.nombre} ${this.apellido}`;   
    }
    addMascota(mascota) {                               // Add Mascota to String[]
        this.mascotas.push(mascota);
    }
    countMascotas() {                                   // Return number of Mascotas
        return this.mascotas.length;
    }
    addBook(nombre, autor) {                            // Add book to Object[]
        this.libros.push({
            nombre,
            autor
        });
    }
    getBookNames() {                                    // Return Array only book's names
        return this.libros.map(libro => libro.nombre);
    }
}

const usuario = new Usuario('Cristian', 'Torchia', 
[{nombre:'Steve Jobs',autor:'Walter Isaacson'},{nombre:'Hamlet',autor:'William Shakespeare'}],
['Perro', 'Gato']);

// ******************************************************************************

console.log('Cantidad de Mascotas:', usuario.countMascotas());
console.log('Nombres de libros:',usuario.getBookNames())
console.log('Nombre completo:', usuario.getFullName());

usuario.addBook('El código Da Vinci','DAN Brown');
usuario.addMascota('loro')

console.log('******** Luego de agregar Elementos: **********');
console.log('Cantidad de Mascotas:', usuario.countMascotas());
console.log('Nombres de libros:',usuario.getBookNames())

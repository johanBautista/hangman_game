let words:string [] = ['PERRO', 'PUERTAS', 'EVENTO', 'EMPRESA', 'FIESTA', 'CAJA', 'CONSOLA', 'REVISTA', 'LIBRO', 'RAVIOLI', 'ORDENADOR'];

export function getRandomWords ()  {
    let randomIndex = Math.floor(Math.random() * words.length);

    return  words[randomIndex];
}
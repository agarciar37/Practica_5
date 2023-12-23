export type Client = {
    id: string;
    name: string;
    email: string;
    cards: Array<Card>;
    travels: Array<Omit<Journey, "client">>;
}
  
export type Driver = {
    id: string;
    name: string;
    email: string;
    username: string;
    travels: Array<Omit<Journey, "driver">>;
}
  
export type Journey = {
    id: string;
    client: Omit<Client, "travels">; 
    driver: Omit<Driver, "travels">; 
    money: number; // Debe ser obligatorio y mínimo 5 euros
    distance: number; // Debe ser obligatorio y mínimo 0.01 km
    date: string;
    state: 'started' | 'canceled' | 'finished'; // Debe tener uno de los valores indicados
}
  
export type Card = {
    number: number;  // Debe ser obligatorio y tener 16 caracteres
    cvv: number; // Debe ser obligatorio y tener 3 caracteres
    expirity: string; // Debe ser obligatorio en formato MM/YYYY
    money: number; // Dinero de la tarjeta
}
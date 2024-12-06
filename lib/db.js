import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
  host: 'localhost', // ou o endereço do seu servidor MySQL
  port: 3306,
  user: 'root',
  password: 'Leonardo123321@',
  database: 'app-dw3',
});

export default connection;

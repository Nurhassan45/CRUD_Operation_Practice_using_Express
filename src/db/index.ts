import { Pool } from "pg";
import config from "../config";

export const pool = new Pool({
  connectionString: config.connection_string
});

//Intialize Database 

export const initDB = async () => {
  try {
   //Users Schema 
    await pool.query(
      `
    CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(20),
    email VARCHAR(50) UNIQUE NOT NULL ,
    password VARCHAR(100) NOT NULL,
    role VARCHAR(20) DEFAULT 'user',
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP DEFAULT NOW (),
    updated_at TIMESTAMP DEFAULT NOW ()
    )

    `
    )

    //Admin Schema
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin(
      id SERIAL PRIMARY KEY,
      name VARCHAR(20),
      email VARCHAR(50) UNIQUE NOT NULL,
      password VARCHAR(30) NOT NULL,
      user_id INT UNIQUE REFERENCES users(id) ON DELETE CASCADE 
      )
      `)
    console.log(`connected successfully`);
  } catch (error) {
    console.log('error from db ', error)
  }
}
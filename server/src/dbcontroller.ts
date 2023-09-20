import fs from 'fs';
import { resolve } from 'path';

export enum DBFIELDS {
  CART = 'cart',
  PRODUCTS = 'products'
}

const basePath = resolve();

const fileNames = {
  [DBFIELDS.CART]: resolve(basePath, 'src/db/cart.json'),
  [DBFIELDS.PRODUCTS]: resolve(basePath, 'src/db/products.json')
}

export const readDB = (db: DBFIELDS) => {
  try {
    const data = fs.readFileSync(fileNames[db], 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
    return null;
  }
}

export const writeDB = (db: DBFIELDS, data: any) => {
  try {
    fs.writeFileSync(fileNames[db], JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}
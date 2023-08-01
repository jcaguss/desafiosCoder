import {promises as fs} from 'fs'

class ProductManager {

    constructor(path) {
        this.path = './productos.json'
        this.products = []; //Array vacio de productos
    }

    writeProducts = async (prod) =>{ // Metodo que escribe en el archivo path en formato JSON cualquier tipo de productos
        let products = await fs.writeFile(this.path, JSON.stringify(prod))
        return products
    }

    readProducts = async () => { // Metodo para leer todos los Productos que devuelve un valor u objeto javaScript
        try{
            let read = await fs.readFile(this.path, 'utf-8')
            return await JSON.parse(read);
        }catch{
            return []
        }
    }

    addProducts = async (title, description, price, thumbnail, code, stock) => { // Metodo para añadir
        !title || !description || !price || !thumbnail || !code || !stock 
        ? console.log('The arguments are not defined')
        : this.products.find(prod => prod.code === code )
        ? console.log("The product already exists")
        : this.products.push(new Product(title, description, price, thumbnail, code, stock)); 
        await this.writeProducts(this.products)
    }

    getProducts = async () => {
        let res = await this.readProducts()
        console.log(res)
    }

    getProductById = async (id) =>{ // Metodo para mostrar un producto por su id
        let  res = await this.readProducts()
        const product = res.find(product => product.id === id);
        !product ? console.log("Not found") : console.log(product);
        return product;
    }

    delateProductsById = async (id) =>{
        let  res = await this.readProducts()
        const prod = res.filter(product => product.id !== id)
        !prod ? console.log('Not found')
        :await this.writeProducts(prod)
    }

    updateProducts = async ({id, ...product}) => {
        let productOld = await this.readProducts();
        await this.delateProductsById(id) 
        let updateProduct = [ {...product , id}, ...productOld]
        await this.writeProducts(updateProduct)
    }

} 

class Product {
    static id = 1; // Contador para los id

    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
        this.id = Product.id++; // Incrementamos el id en 1
    }
}

const manager = new ProductManager(); // Creamos una instancia de ProductManager
manager.getProducts(); // Mostramos el array de productos vacio 
// manager.addProducts('Laptop', 'Laptop MSI ...', 1500, 'url/url', 25, 23); // Añadimos un producto
// manager.addProducts('Pelota ', 'Championes Puma ...', 120, 'url/u/url',252 , 123); // Añadimos un segundo producto
// manager.addProducts('Campera ', 'Campera Adidas ...', 234, 'url/ur/url',253 , 113); // Añadimos un tercer producto
// manager.updateProducts({
//     title : 'Auriculares',
//     description :  'Auriculares JBL ...',
//     price :  200,
//     thumbnail : 'url/url/url',
//     code :  222,
//     stock :  23,
//     id : 1
// }); // Modificamos el producto
// manager.getProducts(); // Mostramos los productos añadidos
// manager.getProductById(2);// Mostramos el producto añadido por su id
// manager.delateProductsById(1) //Eliminamos un producto por su id
// manager.getProducts();


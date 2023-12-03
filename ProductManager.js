const fs = require('fs'); 

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(filePath) {
        this.path = filePath; 
        this.products = [];
        this.nextId = 1;
        this.loadProducts(); 
    }

    saveProducts() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data);
            console.log('Productos guardados en el archivo.');
        } catch (error) {
            console.error('Error al guardar los productos:', error);
        }
    }


    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (Array.isArray(this.products)) {
                this.nextId = this.products.reduce((maxId, product) => Math.max(maxId, product.id), 0) + 1;
            }
            console.log('Productos cargados desde el archivo.');
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    }



    updateProduct(productId, updatedProduct) {
        const index = this.products.findIndex(p => p.id === productId);
        if (index !== -1) {
            updatedProduct.id = productId;
            this.products[index] = updatedProduct;
            this.saveProducts(); 
            console.log(`Producto con ID ${productId} actualizado.`);
        } else {
            console.error(`Producto con ID ${productId} no encontrado.`);
        }
    }

    deleteProduct(productId) {
        this.products = this.products.filter(p => p.id !== productId);
        this.saveProducts(); 
        console.log(`Producto con ID ${productId} eliminado.`);
    }
}


const filePath = 'productos.json'; 
let productManager = new ProductManager(filePath);



// Agregar un nuevo producto
let newProduct = new Product('Naranja', 'Fruta', 40, 'thumbnail4.jpg', 'code4', 25);
productManager.addProduct(newProduct);
productManager.saveProducts(); // Guardar los productos después de agregar uno nuevo

// Actualizar un producto existente
let updatedProduct = new Product('Naranja Actualizada', 'Fruta fresca', 45, 'thumbnail4.jpg', 'code4', 30);
productManager.updateProduct(4, updatedProduct);

// Eliminar un producto por su ID
productManager.deleteProduct(3);

// Obtener todos los productos
console.log(productManager.getProducts());

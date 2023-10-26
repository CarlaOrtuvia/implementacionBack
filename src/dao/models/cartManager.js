import { cartModel } from "./carts.models.js";
import { productModel } from "./products.models.js";

class CartDAO {
    async findAll(limit) {
        return await cartModel.find().limit(limit);
    }

    async findById(id) {
        return await cartModel.findById(id);
    }

    async create() {
        return await cartModel.create({});
    }

    async cleanCart(id) {
        const cart = await this.findById(id);
        if (!cart) {
            throw new Error("Cart not found");
        }
    
        cart.products = [];
        return await cart.save();
    }
    

    async addOrUpdateProductInCart(cartId, productId, quantity) {
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === productId);
        if (index !== -1) {
            cart.products[index].quantity = quantity;
        } else {
            cart.products.push({ id_prod: productId, quantity: quantity });
        }

        return await cart.save();
    }

    async removeProductbyId(cartId, productId) {
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }

        const product = await productModel.findById(productId);
        if (!product) {
            throw new Error("Product not found");
        }

        const index = cart.products.findIndex(prod => prod.id_prod._id.toString() === productId);
        if (index !== -1) {
            cart.products.splice(index, 1);
            
        } else {
            throw new Error("Product not found in the cart");
        }

        return await cart.save();
    }

    async updateCartWithProducts(cartId, productsArray) {
        console.log("Updating cart with products:", productsArray);
        const cart = await this.findById(cartId);
        if (!cart) {
            throw new Error("Cart not found");
        }
    
        
        for (let prod of productsArray) {
            
            const index = cart.products.findIndex(cartProduct => cartProduct.id_prod.toString() === prod.id_prod);
    
            if (index !== -1) {
                
                cart.products[index].quantity = prod.quantity;
            } else {
                
                const exists = await productModel.findById(prod.id_prod);
                if (!exists) {
                    throw new Error(`Product with ID ${prod.id_prod} not found`);
                }
                
                cart.products.push(prod);
            }
        }
        return await cart.save();
    }
    
}

export const CartManager = new CartDAO();
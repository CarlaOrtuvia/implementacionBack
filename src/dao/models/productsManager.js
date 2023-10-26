import { productModel } from "./products.models.js";

class ProductDAO {
    async findAll(limit, page, category, sort) {
        let query = {};
        if (category) {
            query.category = category;
        }
    
        let options = {
            limit: parseInt(limit) || 10,
            page: parseInt(page) || 1
        };
    
        if (sort) {
            options.sort = {
                price: sort === 'asc' ? 1 : -1
            };
        }
    
        return await productModel.paginate(query, options);
    }
    

    async findById(id) {
        return await productModel.findById(id);
    }

    async create(productData) {
        return await productModel.create(productData);
    }

    async updateByCode(code, productData) {
        return await productModel.findOneAndUpdate({ code: code }, productData, { new: true });
    }

    async deleteById(id) {
        return await productModel.findByIdAndDelete(id);
    }
}

export const ProductManager = new ProductDAO();
const Product = require('../models/product');


module.exports = {
        
    createProduct(req, res) {
        const { name, description, price, image, countInStock, countSmall, countMedium, countLarge, countXL } = req.body;
        let newProduct = new Product({
            name,
            description,
            price,
            image,
            countInStock,
            countSmall,
            countMedium,
            countLarge,
            countXL

        });
        newProduct.save();
        res.status(200).json({product: newProduct});
    }, 


    updateProduct(req, res) {
        const { id } = req.params;
        const { name, description, price, picture, countInStock, countSmall, countMedium, countLarge, countXL } = req.body;
        
        Product.findById(id).exec((err, product) => {
            if(err) console.log('Updated Product-----------------', err);
            product.name = name;
            product.description = description;
            product.price = price;
            product.picture = picture;
            product.countInStock = countInStock;
            product.countSmall = countSmall;
            product.countMedium = countMedium;
            product.countLarge = countLarge;
            product.countXL = countXL;

            product.save();
            res.status(200).json({product});
        })
    }, 


    deleteProduct(req, res) {
        const { id } = req.params;

        Product.deleteOne({_id: id}).exec((err, product) => {
            if(err) console.log('Delete One Error-----------------', err)
            res.status(200).json({product});
        });
    },


}
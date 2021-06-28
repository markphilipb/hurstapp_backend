const mongoose = require('mongoose');
const Product  = require('../models/product');
const { db } = require('../models/product');


module.exports = {

    readAllProducts(req, res) {
        Product.find({}).exec((err, products) => {
            if(err) console.log('Get Product Mongoose Error------------------', err);
            res.status(200).send(products);
        });
    },


    readProduct(req, res) {
        const { id } = req.params;

        Product.findById(id).exec((err, product) => {
            if(err) console.log('Get Single Product Error---------------', err);
            console.log('product--------------', product);
            res.status(200).json({product});
        })
    },

    
    decreaseQuantity(metadata) {
        Object.keys(metadata).map(function(key, index) {
            console.log("metaData: ", metadata);
            const sp = metadata[key].split(',');
        
            const id = sp[0];
            const itemSize = sp[1];
            console.log("id ", id);
            console.log("size: ", itemSize);

            Product.findById(id).exec((err, product) => {
                if(err) console.log('Updated Product-----------------', err);
                
                product.countInStock = product.countInStock - 1;

                if(itemSize == 'S'){
                    product.countSmall = product.countSmall - 1;
                }
                else if(itemSize == 'M'){
                    product.countMedium = product.countMedium - 1;
                }
                else if(itemSize == 'L'){
                    product.countLarge = product.countLarge - 1;
                }
                else if(itemSize == 'XL'){
                    product.countXL = product.countXL - 1;
                }
             
                product.save();
            })
        });
    }


}

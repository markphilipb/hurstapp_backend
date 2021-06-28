const Order = require('../models/order');


module.exports = {
    
    readAllOrders(req, res) {
        Order.find({}).exec((err, order) => {
            if(err) console.log('Get Order Mongoose Error------------------', err);
            console.log('orders-------------', order);
            res.status(200).send(order);
        });
    },


    readOrder(req, res) {
        const { id } = req.params;

        Order.findById(id).exec((err, order) => {
            if(err) console.log('Get Single Order Error---------------', err);
            console.log('order--------------', order);
            res.status(200).json({order});
        })
    }, 


    createOrder(session, lineItems) {
        console.log("Shipping info", session.shipping);
        console.log("line items: ", lineItems);
        const items = lineItems.data;
        
        let itemsTotalPrice = 0;

        let cartItems = [];

        for(let i = 0; i < items.length; i++){ 
            const itemName = items[i].description;
            const itemPrice = items[i].amount_total;
            const itemQty = 1;
            const sp = session.metadata[itemName].split(',');
            const id = sp[0];
            const itemSize = sp[1];
            let newItem = {
                itemId: id,
                name: itemName,
                price: itemPrice,
                size: itemSize,
                qty: itemQty 
            }
            cartItems = [...cartItems, newItem];
            itemsTotalPrice = itemsTotalPrice + itemPrice;
            console.log("item id: ", newItem.itemId);
        }

        const shipping = {
            address: "Line 1: " + session.shipping.address.line1 + " Line 2: " + session.shipping.address.line2,
            city: session.shipping.address.city,
            postalCode: session.shipping.address.postal_code,
            country: session.shipping.address.country,
            state: session.shipping.address.state,
            name: session.shipping.name
        }

        let newOrder = new Order({
            orderItems: cartItems,
            shipping: shipping,
            payment: session.payment_method_types,
            itemsPrice: itemsTotalPrice,
            totalPrice: itemsTotalPrice,
            isPaid: session.payment_status
        });
        
        newOrder.save();
    },


    fulfillOrder(session) {
        console.log("Fulfilling Order", session);
    }, 


    deleteOrder(req, res) {  
        const { id } = req.params;

        Order.deleteOne({_id: id}).exec((err, order) => {
            if(err) console.log('Delete One Error-----------------', err)
            res.status(200).json({order});
        });

    }, 
    
    
}
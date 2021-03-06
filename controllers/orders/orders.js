const model = require('../../model/orders/orders.js')
const productsModel = require('../../model/products/products.js')
const helper = require('../../utilities/helper.js')


exports.get = async (req, res) => {


    try {
        const data = await model.find({}, { _id: 0, __v: 0 })

        if (data.length > 0) {

            res.status(200).json(
                {
                    status: 'Success',
                    data: {
                        count: data.length,
                        products: data.map(d => {
                            return {
                                about: d,
                                request: {
                                    method: 'GET',
                                    url: process.env.SERVER_NAME + process.env.PORT + '/orders/' + d.orderId
                                }

                            }

                        })
                    }
                }
            )
        }
        else {
            res.status(400).json(
                {
                    status: 'fail',
                    msg: 'No Products Found'
                }
            )
        }

    } catch (error) {

        res.status(500).json(
            {
                status: 'fail',
                msg: error.message
            }
        )

    }

}


exports.add = async (req, res) => {

    try {

        const productData = await productsModel.findOne({productId : req.body.productId}, {_id : 0, __v : 0})

        if(productData != null){

            req.body.orderId = await helper.generateOrderId()
            
            

            const data = await model.create(req.body)
            

            res.status(201).json(
                {
                    status: 'Success',
                    data: {
    
                        about: data,
                        request: {
                            method: 'GET',
                            url: process.env.SERVER_NAME + process.env.PORT + '/orders/' + data.orderId
                        }
    
                    }
                }
            )




        }
        else{
            res.status(400).json(
                {
                    status: 'fail',
                    msg: 'No Product Found'
                }
            )
        }
        
    } catch (error) {

        res.status(500).json(
            {
                status: 'fail',
                msg: error.message
            }
        )
        
    }
    
    


}


exports.getById = async (req, res) => {

    try {

        const data = await model.findOne({ orderId: req.params.orderId }, {_id : 0, __v : 0})

        if (data != null) {
            res.status(200).json(
                {
                    status: 'Success',
                    data: data
                }
            )
        }
        else {
            res.status(400).json(
                {
                    status: 'fail',
                    msg: 'No Orders Found'
                }
            )
        }

    } catch (error) {

        res.status(500).json(
            {
                status: 'fail',
                msg: error
            }
        )

    }
}


exports.deleteById = async (req, res) => {
    try {


        const data = await model.deleteOne({ orderId: req.params.orderId })

        if (data.deletedCount == 1) {

            res.status(200).json(
                {
                    status: 'Success',
                    data: 'Order Deleted Successfully'
                }
            )

        }
        else {

            res.status(400).json(
                {
                    status: 'fail',
                    msg: 'No Order Found'
                }
            )

        }

    } catch (error) {

        res.status(500).json(
            {
                status: 'fail',
                msg: error.message
            }
        )

    }
}
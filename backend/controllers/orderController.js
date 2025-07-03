import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);


const placeOrder = async (req, res) => {

        const frontendUrl = "http://localhost:5174"; // Replace with your frontend URL
        try{
            const neworder = new orderModel({
                userId:req.body.userId,
                items:req.body.items,
                amount:req.body.amount,
                address:req.body.address,
                payment:req.body.payment,
            })
            await neworder.save();
            await userModel.findByIdAndUpdate(req.body.userId, {cartData: []});
            const line_items = req.body.items.map(item => ({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: item.name,
                        images: [item.image],
                    },
                    unit_amount: item.price * 100, // Convert to cents
                },
                quantity: item.quantity,
            }));

            line_items.push({
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Delivery Charge',
                    },
                    unit_amount: 200, // $2.00 delivery charge
                },
                quantity: 1,
            });



            const  session = await stripe.checkout.sessions.create({
                line_items: line_items,
                mode: 'payment',
                success_url: `${frontendUrl}/verify?success=true&orderId=${neworder._id}`,
                cancel_url:  `${frontendUrl}/verify?success=false&orderId=${neworder._id}`,
            });
            res.json({
                success: true,
                session_url: session.url,
            })

        }catch(error){
            console.error("Error placing order:", error);
            return res.status(500).json({message: "Internal server error"});
        }
}

const verifyOrder = async (req, res) => {
    const {orderId,success} =req.body;
    try {
        if(success){
            await orderModel.findByIdAndUpdate(orderId, {payment:true,status: "Completed"});
            res.json({
                success: true,
                message: "Order placed successfully",
            });
        }
        else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({
                success: false,
                message: "Order cancelled",
            });
        }
    }
    catch (error) {
        console.error("Error verifying order:", error);
        return res.json({success: false, message: "Internal server error"});
    }
}

//user orders for frontend
const userOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId: req.body.userId}).populate('items');
        res.json({success: true, data: orders});
    }catch(error){
        console.error("Error fetching user orders:", error);
        res.json({success: false, message: "Internal server error"});
    }
}

//listing orders for admin panels
const listOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        res.json({success: true, data: orders});
    }catch(error){
        console.error("Error listing orders:", error);
        res.json({success: false, message: "Internal server error"});
    }

}


//api for updating order status
const updateStatus = async (req,res) => {
    try{
        const {orderId, status} = req.body;
        await orderModel.findByIdAndUpdate(orderId, {status});
        res.json({success: true, message: "Order status updated successfully"});
    }catch(error){
        console.error("Error updating order status:", error);
        res.json({success: false, message: "Internal server error"});
    }
}

export {placeOrder, verifyOrder, userOrders, listOrders, updateStatus};
import foodModel from '../models/foodModel.js';
import fs from 'fs';


// add food item 

const adddFood = async (req, res) => {
    if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
    }
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
        image: image_filename,
        category: req.body.category
    });
    try {
        const foodItem = await food.save();
        console.log("Food item saved successfully:", foodItem);
        res.json({success:true, message: "Food item added successfully", foodItem: foodItem});
    } catch (error) {
        console.error("Error saving food item:", error);
        res.json({ success:false, message: "Failed to add food item" });
        // Optionally, delete the uploaded file if saving fails
        // fs.unlinkSync(`upload/${image_filename}`);
    }
}


// all food list 
const listFood = async (req, res) => {
    try {
        const foodItems = await foodModel.find({});
        res.json({ success: true, data: foodItems });
    } catch (error) {
        console.error("Error fetching food items:", error);
        res.json({ success: false, message: "Failed to fetch food items" });
    }
}

//remove food item

const removeFood = async (req, res) => {
    try{
        const foodId = req.body.id;
        const foodItem = await foodModel.findById(foodId);
        fs.unlinkSync(`uploads/${foodItem.image}`,()=>{}); // Delete the image file from the server
        console.log("Image deleted successfully");
        await foodModel.findByIdAndDelete(foodId);
        res.json({ success: true, message: "Food item removed successfully" });
    }catch(error){
        console.error("Error removing food item:", error);
        res.json({ success: false, message: "Failed to remove food item" });
    }
}

export { adddFood, listFood, removeFood };
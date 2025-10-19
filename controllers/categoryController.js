import {data} from "react-router-dom"
import { create, deletes, getAll, getCategoryById, update } from "../models/category.js";

// create, getAll, update, delete, getById

// function create Category
export const createCategory = async (req,res) => {
    try{
        const {category} = req.body;
        const categorys = await create({category})
        return res.status(200).json({
            message:"Category is created",
            data: categorys
        })
    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}
// function update category
export const updateCategory = async (req,res) => {
    try{
        const {id} = req.params;
        const {category} = req.body

        const updateRes = await update(id,{category});
        if(!updateRes){
            return res.status(404).json({message: "Category is not found"});
        }
        return res.status(200).json({
            message:"Update is Successfully",
            data: updateRes
        })
    }catch(err){
        console.error("Error update category:", err);
        return res.status(500).json({message: "Internal server is errro"})
    }
}

// function delete category
export const deletCategory = async (req,res) => {
    try{
        const {id} = req.params
        const deleteRes = await deletes(id);
        if(!deleteRes){
            return res.status(404).json({message: "Id is not found !!! Please try gain"});
        }
        return res.status(200).json({
            message:'Wow your delete is success',
            data: deleteRes
        })
    }catch(err){
        console.error("Your delete is error", err);
    }
}

// functiuon for get all category
export const getAllCategory = async (req,res) => {
    try{
        const data = await getAll();
        if(!res){
            return res.status(404).json({message:"Category is not found"});
        }
        return res.status(200).json({
            message:'Fetch data is succesfull',
            data: data
        })
    }catch(err){
        console.error("Error get all category:", err);
    }
}

// function get only single data
export const getSingleDataCategory = async (req,res) => {
    try{
        const {id} = req.params
        const data = await getCategoryById(id);
        if(!data){
            return res.status(404).json({message:"Category is not found"});
        }
        return res.status(200).json({
            message:'fetch data is success',
            data: data
        })
    }catch(err){
        console.error("Error get all locaiton:", err)
        return res.status(500).json({message:"Internal server error"});
    }
}
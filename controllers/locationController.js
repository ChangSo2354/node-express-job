import { data } from "react-router-dom";
import { createLocation, deleteLocation, getAllLocation, getLocationById, updateLocation } from "../models/location.js";

// function create location
export const create = async (req,res) => {
    try{
        const {name,poscode} = req.body
        const location = await createLocation({name,poscode})

        return res.status(200).json({
            message:'Locaiton is Creation',
            data: location
        })
    }catch(err){
        return res.status(500).json({message:"Internal server error"})
    }
}

// function update location
export const update = async (req,res) => {
    try{
        const {id} = req.params;
        const {name,poscode} = req.body

        const updateResponse = await updateLocation(id,{name,poscode});

        if(!updateResponse){
            return res.status(404).json({message: 'Location not found'});
        }
        return res.status(200).json({
            message:"Update Successfully",
            data: updateResponse
        })
    }catch(err){
        console.error("Error updating location:",err)
        return res.status(500).json({message: "Internaml server error"});
    }
}

// function delete
export const destroy = async (req,res) => {
    try{
        const {id} = req.params;
        const deleteResponse = await deleteLocation(id);

        if(!deleteResponse){
            return res.status(404).json({message:'ID not ofund'});
        }

        return res.status(200).json({
            message:'Locaiton is delete success',
            data: deleteResponse
        })
    }catch(err){
        console.error("Error delete location:", err);
        return res.status(500).json({message: "Internal server Error"})
    }
}

// function getall
export const getAll = async (req,res) => {
    try{
        const data = await getAllLocation();
        if(!res){
            return res.status(404).json({message:"Locaiton not found"});
        }
        return res.status(200).json({
            message:'Fetch data is success',
            data: data
        })
    }catch(err){
        console.error("Error get all locaiton:", err)
        return res.status(500).json({message:"Internal server error"});
    }
}

// function get only single data
export const getSingleData = async (req,res) => {
    try{
        const {id} = req.params
        const data = await getLocationById(id);

        if(!data){
            return res.status(404).json({message:"Locaiton not found"});
        }
        return res.status(200).json({
            message:'Fetch data is success',
            data: data
        })
    }catch(err){
        console.error("Error get all locaiton:", err)
        return res.status(500).json({message:"Internal server error"});
    }
}
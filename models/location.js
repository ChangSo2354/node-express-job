import connection from "../config/db.js";

// model for create locaiton
export const createLocation = async (data) => {
    // get data from params
    const {name,poscode} = data

    try{
        // query insert data and get back
        const query = connection.from('locations').insert([{name,poscode}]).select();
        // execute query
        const {data,error} = await query
        // if error thoe message error
        if(error){
            throw error
        }
        // return data back if success
        return data[0]
    }catch(err){
        // catch error if server crash
        console.error("Error creating user:", err);
        throw err;
    }
}

// model for get all location
export const getAllLocation = async () => {
    try{
        // query get all location from supabase api
        const {data,error} = await connection.from('locations').select('*').order('id',{ascending:true});
        // if error throw message error
        if(error) throw error;
        // return data if success
        return data;
    }catch(err){
        // catch err  if server crash
        console.error("Error fetching all location:", err)
        throw err
    }
}

// model for get location by id
export const getLocationById = async (id) => {
    try{
        // query get only location from supabase api
        const {data,error} = await connection.from('locations').select('*').eq('id',id).single();

        // if error throw message error
        if(error) throw error;

        // return data if successfull
        return data;
    }catch(err){
        // catch err if server crash
        console.error("Error fetching all location:", err);
        throw err;
    }
}

// model for update location
export const updateLocation = async (id,updateData) => {
    const {name,poscode} = updateData;
    try{
        const query = connection.from('locations').update({name,poscode}).eq('id',id).select();
        const {data,error} = await  query
        if(error) return error;
        return data[0];
    }catch(err){
        console.error('Error updating location:',err);
        throw err;
    }
}

// model for delete location
export const deleteLocation = async (id) => {
    try{

        // query delete data in supabse while id
        const query = connection.from('locations').delete().eq('id',id).select();

        // execute query
        const {data,error} = await query

        // if error throw error
        if(error) throw error;

        // reutrn data if success
        return data
    }catch(err){
        // catch err if server crash
        console.error('Error delete locaiton:',err);
        throw err;
    }
}


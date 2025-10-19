import connection from "../config/db.js"; // call connection

export const createUser = async (userData) => {
    const {name,email,password, image} = userData;

    try{
        const {data,error} = await connection
        .from('users')
        .insert([{name,email,password,image}])
        .select(); // return data inserted
        // ORM of supabase

        if(error){
            throw error;
        }
        return data[0];
    } catch (err){
        console.log.error("Error creating user:");
        throw err;
    }
}

export const getUserByEmail = async (email) => {
    try{
        const {data,error} = await connection
        .from('users')
        .select('*')
        .eq('email',email)
        .maybeSingle(); // feth only on row

        if(error){
            throw error;
        }
        return data;

    }catch(err){
        console.log("Error fetching user by email:", err);
        return null;
    }
}

export const getUserByName = async (name) => {
    try{
        const {data,error} = await connection
        .from('users')
        .select('*')
        .eq('name', name)
        .maybeSingle(); // fetch only one row

        if(error) {
            throw error;
        }
        return data;
    } catch (err) {
        console.error("Error fetching user by email:", err)
        return null
    }
}
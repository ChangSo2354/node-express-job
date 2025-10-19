import connection from "../config/db.js"

export const create = async (data) => {
    // get data from
    const { category } = data
    try{
        const query = connection.from('categories').insert({category}).select();
        // exeute insert data and get back
        const {data,error} = await query

        // if error throw message error
        if(error) throw error;

        // return data back if success
        return data[0]
    }catch(e){
        console.error();("Error create user:", e);
        throw e;
        
    }
}

export const getAll = async () => {
    try{
        const {data,error} = await connection.from('categories').select('*').order('id',{ascending:true});
        if(error) throw error;
        return data
    }catch(err){
        console.error("Error fetching all category:", err);
        throw err;
    }
}

// model for get all category
export const getCategoryById = async (id) => {
    try{
        const {data,error} = await connection.from('categories').select('*').eq('id',id).single();
        if(error) throw error;
        if(!data) return null
        return data
    }catch(err){
        console.error("Error fetching all category:", err);
        throw err;
    }
}

// model for update Category
export const update = async (id,updateData) => {
    const {category} = updateData
    try{
        const query = connection.from('categories').update({category}).eq('id',id).select();
        const {data,error} = await query
        if(error) throw error
        return data[0]
    }catch(err){
        console.error("Error Update category:", err);
        throw err;
    }
}

// model for delete category
export const deletes = async (id) => {
    try{
        const query = connection.from('categories').delete().eq('id',id).select();
        const {data,error} = await query
        if(error) throw error;
        return data
    }catch(err){
        console.error("Error delete category:", err);
        throw err;
    }
}
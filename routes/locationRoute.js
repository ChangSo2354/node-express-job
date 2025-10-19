import express from 'express'

import {create, destroy, getAll, getSingleData, update} from '../controllers/locationController.js'


const locationRoute = express.Router()

// resfull api
locationRoute.post('/location',create);
locationRoute.put('/location/:id',update);
locationRoute.delete('/location/:id',destroy);
locationRoute.get('/location',getAll);
locationRoute.get('/location/:id',getSingleData);

export default locationRoute
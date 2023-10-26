import {Router } from "express"
import { userManager } from "../dao/models/userManager.js";

const userRouter = Router();

userRouter.get('/', async (req, res) => {
    const { limit, page } = req.query;
    try {
        const users = await userManager.findAll(limit, page);
        res.status(200).send({respuesta: 'ok', mensaje: users})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.get('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await userManager.findById(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.post('/', async (req, res) => {
    const {first_name, last_name, age, email, password} = req.body
    try {
        const respuesta = await userManager.create({first_name, last_name, age, email, password});
        res.status(200).send({respuesta: 'ok', mensaje: respuesta})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.put('/:id', async (req, res) => {
    const {id} = req.params
    const {first_name, last_name, age, email, password} = req.body
    try {
        const user = await userManager.updateById(id, {first_name, last_name, age, email, password});
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

userRouter.delete('/:id', async (req, res) => {
    const {id} = req.params
    try {
        const user = await userManager.deleteById(id);
        if (user)
            res.status(200).send({respuesta: 'ok', mensaje: user})
        else 
            res.status(404).send({respuesta: 'Error', mensaje: 'User not found'})
    } catch (error){
        res.status(400).send({respuesta: 'Error', mensaje: error})
    }
})

export default userRouter
import { Router } from "express";
import Message from "../model/messages.model.js";

const router = Router();

router.get('/', (req, res) => {
    //guardar en la base de datos message
    res.render('chat')

});

export default router;
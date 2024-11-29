const express = require('express')
const router = express.Router();
const bus = require("../models/Buses");

router.post('/', async(req, res) => {
    // res.json({ status: true, message: "bus selected" })
    await bus.findOne({ "startCity": req.body.startCity, "destination": req.body.destination }).exec((err, bus) => { 
        if (err) { 
            res.json({ status: false, message: "error while searching with ID"})
        }  
        else {
            res.json({ status: true, bus: bus })
        }

    })

})

// router.post("/", (req, res) => {
//     bus.findOne({ _id: req.body.bId }, (err, bus) => {
//         if (err) {
//             res.json({ status: false, message: "error while searching with ID"})
//         }
//         else {
//             res.json({ status: true, bus: bus })
//         }

//     })
// })
module.exports = router;
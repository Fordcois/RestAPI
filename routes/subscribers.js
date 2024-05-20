const express = require('express')
const router = express.Router()
const Subscriber = require('../models/subscribers')

// Getting All
router.get('/',async (req,res) => {
    try {const subscribers = await Subscriber.find()
        res.json(subscribers)}
    catch (err) {res.status(500).json({message: err.message})}
})

// Getting One
//  -- the getSubscriber will run the function defined below before the request
router.get('/:id',getSubscriber,(req,res) => {
    res.send(res.subscriber)
})
// Creating One

router.post('/',async (req,res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscriberToChannel: req.body.subscriberToChannel
    })
    try{
        const newSubscriber = await subscriber.save()
        res.status(201).json(newSubscriber)
    }
    catch(err){res.status(400).json({message: err.message})}
})

// Updating One
router.patch('/:id',getSubscriber,async (req,res) => {
    if (req.body.name != null) 
        {res.subscriber.name = req.body.name}
    if (req.body.subscriberToChannel != null) 
        {res.subscriber.subscriberToChannel = req.body.subscriberToChannel}
    try
        {const updatedSubscriber = await res.subscriber.save()
        res.json(updatedSubscriber)}
    catch(err){res.status(400).save}
})

// Deleting One
router.delete('/:id',getSubscriber, async (req,res) => {
    try{
        console.log(res.subscriber.name)
        await res.subscriber.deleteOne()
        res.json({message: 'Deleted Subscriber'})
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
})

// This is middlware, it will run when it is passed from the function above!
async function getSubscriber(req,res,next){
    try{
        FoundUser = await Subscriber.findById(req.params.id)
        if (FoundUser == null) 
            {return res.status(400).json({message:'Cannot find subscriber'})};
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
    res.subscriber = FoundUser
    next()
}

module.exports = router
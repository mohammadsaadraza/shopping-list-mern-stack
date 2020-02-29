const express = require('express')
const router = express.Router()

const Item = require('../../models/Item')

//@route GET api/items
//@desc get all items

router.get('/', function(req,res){
    Item.find()
        .sort({date: -1})
        .then(items => res.json(items))
})

//@route POST api/items
//@desc create a item
router.post('/', function(req,res){
    const newItem = new Item({
        name: req.body.name,
    })
    newItem.save().then(item => res.json(item))

})

//@route DELETE api/items
//@desc delete a item
router.delete('/:id', function(req,res){
    Item.findById(req.params.id)
        .then(item => item.remove().then(() => res.json({success: true})))
        .catch(err => res.status(404).json({success: false}))
    })


module.exports = router;
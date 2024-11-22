const express = require('express')
const router = express.Router();
const postController = require("../controller/postController.js")
const { checkId} = require("../middlewere/utils.js")
console.log( checkId)
//index
router.get('/', postController.index, () => {
    console.log('Fine index');
});
//show
router.get('/:id', checkId, postController.show, () => {
    console.log('Fine show');
})
//store
router.post('/', postController.store,() => {
    console.log('Fine store');
})
//update
router.put('/:id', postController.update,() => {
    console.log('Fine update');
})
//modify
router.patch('/:id', postController.modify,() => {
    console.log('Fine modify');
})
//destroy
router.delete('/:id', postController.destroy,() => {
    console.log('Fine destroy');
})

module.exports = router;
const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  try {
    var categoryData = await Category.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    var categoryData = await Category.findOne(req.params.id, {
      include: [{ model: Product}]
    });
    if (!categoryData) {
      res.status(404).json({message: "No category found matching that ID"});
      return;
    }
    res.status(200).json(categoryData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    var newCategory = await Category.create(req.body);
    res.status(200).json(newCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    var updatedCategory = await Category.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedCategory);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', (req, res) => {
  try {
    // delete a category by its `id` value
  } catch (error) {
    
  }
});

module.exports = router;

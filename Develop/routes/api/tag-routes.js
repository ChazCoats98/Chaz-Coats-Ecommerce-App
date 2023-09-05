const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  try {
    var tagData = await Tag.findAll({
      include: [{ model: Product}]
    });
    res.status(200).json(tagData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    var tagData = await Tag.findOne(req.params.id, {
      include: [{ model: Product}]
    });
    if (!tagData) {
      res.status(404).json({message: "No tag found matching that ID"});
      return;
    }
    res.status(200).json(tagData);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/', async (req, res) => {
  try {
    var newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    var updatedTag = await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(updatedTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    var deleteTag = await Tag.destroy({
      where: {id: req.params.id}
    });
    res.status(200).json(deleteTag);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

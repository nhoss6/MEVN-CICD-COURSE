const Product = require('../models/Product');

// GET - Récupérer tous les produits
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', message: err.message });
  }
};

// GET - Récupérer un produit par ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', message: err.message });
  }
};

// POST - Créer un produit
exports.createProduct = async (req, res) => {
  try {
    const { name, description, price, image, category, stock, rating } = req.body;

    // Validation
    if (!name || !description || !price) {
      return res.status(400).json({ 
        error: 'Les champs name, description et price sont requis' 
      });
    }

    const product = new Product({
      name,
      description,
      price,
      image,
      category,
      stock,
      rating,
    });

    await product.save();
    res.status(201).json({
      message: 'Produit créé avec succès',
      product,
    });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la création', message: err.message });
  }
};

// PUT - Mettre à jour un produit
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json({
      message: 'Produit mis à jour avec succès',
      product,
    });
  } catch (err) {
    res.status(400).json({ error: 'Erreur lors de la mise à jour', message: err.message });
  }
};

// DELETE - Supprimer un produit
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé' });
    }

    res.json({
      message: 'Produit supprimé avec succès',
      product,
    });
  } catch (err) {
    res.status(500).json({ error: 'Erreur lors de la suppression', message: err.message });
  }
};

// GET - Récupérer les produits par catégorie
exports.getProductsByCategory = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.category });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', message: err.message });
  }
};

// GET - Rechercher des produits
exports.searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: q, $options: 'i' } },
        { description: { $regex: q, $options: 'i' } },
      ],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: 'Erreur serveur', message: err.message });
  }
};
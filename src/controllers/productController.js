import { body, validationResult } from 'express-validator';
import Product from '../models/product.js';
import User from '../models/user.js';
import { generateToken } from '../utils/generateToken.js';
import { uploadImg } from '../utils/cloudinary.js';

const createUser = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Invalid email format'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    try {
      const newUser = new User({
        name,
        email,
        password,
      });

      await newUser.save();

      const token = generateToken({
        payload: {
          id: newUser._id,
        },
      });

      res.status(201).json({
        message: 'User created successfully',
        token,
      });
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: 'Something went wrong, try again', code: error.code });
    }
  },
];

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product', error });
  }
};


const addProduct = [
  body('name').notEmpty().withMessage('Name is required'),
  body('description').notEmpty().withMessage('Description is required'),
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { _id } = req.user;

    try {
      const { name, description, price } = req.body;
      if (!req.files) {
        return res.status(400).json({ message: ' please upload image' });
      }

      const { image } = req.files;

      const { url } = await uploadImg(image.tempFilePath);

      const newProduct = new Product({
        name,
        description,
        price,
        imageURL: url,
        createdBy: _id,
      });

      const savedProduct = await newProduct.save();

      res.status(201).json(savedProduct);
    } catch (error) {
      console.error('Error adding product', error);
      res
        .status(400)
        .json({ message: 'Error adding product', code: error.code });
    }
  },
];

const updateProduct = [
  body('name').optional().notEmpty().withMessage('Name cannot be empty'),
  body('description')
    .optional()
    .notEmpty()
    .withMessage('Description cannot be empty'),
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),

  async (req, res) => {
    const { id } = req.params;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, price } = req.body;
    let updateData = { name, description, price };

    if (req.files && req.files.image) {
      try {
        const { url } = await uploadImg(req.files.image.tempFilePath);
        updateData.imageURL = url;
      } catch (error) {
        console.error('Error uploading image', error);
        return res.status(500).json({ message: 'Error uploading image' });
      }
    }

    try {
      const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });

      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json(updatedProduct);
    } catch (error) {
      console.error('Error updating product', error);
      res
        .status(400)
        .json({ message: 'Error updating product', code: error.code });
    }
  },
];

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Error deleting product', code: error.code });
  }
};

export { createUser, addProduct, getAllProducts, updateProduct, deleteProduct , getProductById};

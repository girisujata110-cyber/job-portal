import { productmodel } from "../schema/product.model.js";


export const productCreate = async (req, res) => {
  try {
    const {
      name,
      benefit,
      description,
      price,
      
      category,
      stock,
    } = req.body;

    const product = await productmodel.create({
      name,
      benefit,
      description,
      price,
      category,
      stock,
    });

    res.status(201).json({
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product creation failed",
      error: error.message,
    });
  }
};


export const productFind = async (req, res) => {
  try {
    const products = await productmodel.find();

    res.status(200).json({
      message: "Products fetched successfully",
      data: products,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};


export const productFindOne = async (req, res) => {
  try {
    const product = await productmodel.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product fetched successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};


export const productUpdate = async (req, res) => {
  try {
    const product = await productmodel.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product update failed",
      error: error.message,
    });
  }
};


export const productDelete = async (req, res) => {
  try {
    const product = await productmodel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
      data: product,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Product deletion failed",
      error: error.message,
    });
  }
};

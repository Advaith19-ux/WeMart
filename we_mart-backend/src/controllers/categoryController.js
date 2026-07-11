import * as categoryService from "../services/categoryService.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await categoryService.getCategories();

    res.status(200).json({
      success: true,
      count: categories.length,
      categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getCategoryProducts = async (req, res) => {
  try {
    const products = await categoryService.getCategoryProducts(
      req.params.category
    );

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBrands = async (req, res) => {
  try {
    const brands = await categoryService.getBrands();

    res.status(200).json({
      success: true,
      count: brands.length,
      brands,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getBrandProducts = async (req, res) => {
  try {
    const products = await categoryService.getBrandProducts(
      req.params.brand
    );

    res.status(200).json({
      success: true,
      count: products.length,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
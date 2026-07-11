// import supabase from "../config/supabase.js";

// export const getProducts = async (req, res) => {
//   try {
//     const { data, error } = await supabase
//       .from("products")
//       .select("*");

//     if (error) {
//       return res.status(500).json({
//         success: false,
//         error: error.message,
//       });
//     }

//     res.status(200).json(data);
//   } catch (err) {
//     res.status(500).json({
//       success: false,
//       error: err.message,
//     });
//   }
// };


// import * as productService from "../services/productService.js";

// export const getProducts = async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 20;

//     const data = await productService.getProducts(page, limit);

//     res.status(200).json(data);
//   } catch (err) {
//     console.error(err);

//     res.status(500).json({
//       success: false,
//       message: err.message,
//     });
//   }
// };
import * as productService from "../services/productService.js";

// GET /api/products
export const getProducts = async (req, res) => {
  console.log("✅ getProducts controller called");
  try {
    const {
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      order,
    } = req.query;

    const data = await productService.getProducts({
      page,
      limit,
      search,
      category,
      minPrice,
      maxPrice,
      sort,
      order,
    });
    console.log(req.query);
    res.status(200).json(data);
  } catch (err) {
    console.error(err);

    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/:asin
export const getProductByAsin = async (req, res) => {
  try {
    const product = await productService.getProductByAsin(req.params.asin);

    res.status(200).json({
      success: true,
      product,
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/brands
export const getBrands = async (req, res) => {
  try {
    const brands = await productService.getBrands();

    res.status(200).json({
      success: true,
      brands,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/categories
export const getCategories = async (req, res) => {
  try {
    const categories = await productService.getCategories();

    res.status(200).json({
      success: true,
      categories,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/latest
export const getLatestProducts = async (req, res) => {
  try {
    const products = await productService.getLatestProducts();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/trending
export const getTrendingProducts = async (req, res) => {
  try {
    const products = await productService.getTrendingProducts();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/top-rated
export const getTopRatedProducts = async (req, res) => {
  try {
    const products = await productService.getTopRatedProducts();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/featured
export const getFeaturedProducts = async (req, res) => {
  try {
    const products = await productService.getFeaturedProducts();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// GET /api/products/related/:asin
export const getRelatedProducts = async (req, res) => {
  try {
    const products = await productService.getRelatedProducts(req.params.asin);

    res.status(200).json({
      success: true,
      products,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
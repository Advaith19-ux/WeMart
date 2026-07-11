import * as reviewService from "../services/reviewService.js";

export const getProductReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getProductReviews(
      req.params.asin
    );

    res.json({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const getUserReviews = async (req, res) => {
  try {
    const reviews = await reviewService.getUserReviews(
      req.user.id
    );

    res.json({
      success: true,
      reviews,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const addReview = async (req, res) => {
  try {
    const review = await reviewService.addReview(
      req.user.id,
      req.body.asin,
      req.body.rating,
      req.body.comment
    );

    res.status(201).json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateReview = async (req, res) => {
  try {
    const review = await reviewService.updateReview(
      req.params.id,
      req.user.id,
      req.body.rating,
      req.body.comment
    );

    res.json({
      success: true,
      review,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteReview = async (req, res) => {
  try {
    await reviewService.deleteReview(
      req.params.id,
      req.user.id
    );

    res.json({
      success: true,
      message: "Review deleted"
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const getRatingSummary = async (req, res) => {
  try {
    const summary =
      await reviewService.getRatingSummary(
        req.params.asin
      );

    res.json({
      success: true,
      summary,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
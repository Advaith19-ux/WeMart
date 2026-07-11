import * as addressService from "../services/addressService.js";

export const getAddresses = async (req, res) => {
  try {
    const addresses = await addressService.getAddresses(req.user.id);

    res.json({
      success: true,
      addresses,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const addAddress = async (req, res) => {
  try {
    const address = await addressService.addAddress(
      req.user.id,
      req.body
    );

    res.status(201).json({
      success: true,
      address,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const updateAddress = async (req, res) => {
  try {
    const address = await addressService.updateAddress(
      req.params.id,
      req.body
    );

    res.json({
      success: true,
      address,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const deleteAddress = async (req, res) => {
  try {
    await addressService.deleteAddress(req.params.id);

    res.json({
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};

export const setDefaultAddress = async (req, res) => {
  try {
    const address = await addressService.setDefaultAddress(
      req.user.id,
      req.params.id
    );

    res.json({
      success: true,
      address,
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      message: err.message,
    });
  }
};
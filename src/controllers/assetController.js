const asset = require("../DAO/AssetDAO");

const CREATE_ASSET = (req, res, next) => {
  asset.createAsset(req, res, next);
};
const GET_ASSET = (req, res, next) => {
  asset.getAsset(req, res, next);
};
const GET_ASSETS = (req, res, next) => {
  asset.getAssets(req, res, next);
};
const UPDATE_ASSET = (req, res, next) => {
  asset.updateAsset(req, res, next);
};
const DELETE_ASSET = (req, res, next) => {
  asset.deleteAsset(req, res, next);
};

module.exports = {
  GET_ASSETS,
  GET_ASSET,
  CREATE_ASSET,
  UPDATE_ASSET,
  DELETE_ASSET,
};
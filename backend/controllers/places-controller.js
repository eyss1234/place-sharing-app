const { v4: uuidv4 } = require('uuid');
const {validationResult } = require('express-validator');

const HttpError = require('../models/http-error');
const getCoordsForAddress = require('../util/location');

let DUMMY_PLACES = [
    {
      id: 'p1',
      title: 'Shinjuku Gojira',
      description: 'Charismatic monster in a neighbourhood in Japan',
      location: {
        lat: 35.6952948,
        lng: 139.7008743
      },
      address: '1-19-1, Kabukicho, Shinjuku-ku, Tokyo, 160-0021',
      creator: 'u1'
    }
  ];

const getPlaceById =  (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  if (!place) {
    const error = new HttpError('Could not find a place for the provided id.', 404)
    throw error;
  }
  res.json({place});
}

const getPlacesbyUserId = (req, res, next) => {
  const userId = req.params.uid;
  const places = DUMMY_PLACES.filter(p => {
  return p.creator === userId;
  })
  if (!places || places.length === 0) {
    return next(new HttpError(
      'Could not find a user for the provided user id.', 404
    ));
  }
  res.json({places});
}

const createPlace = async (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return next(new HttpError('Invalid inputs getPlacesbyUserId, please check your data', 422))  
  }

  const { title, description, address, creator } = req.body;
  
  let coordinates;
  try {
    coordinates = await getCoordsForAddress(address);
  } catch (error) {
    return next(error);
  }
  
  const createdPlace = {
    id: uuidv4(),
    title,
    description,
    location: coordinates,
    address,
    creator
  };
  DUMMY_PLACES.push(createdPlace);

  res.status(201).json({place: createdPlace})
}

const updatePlace = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    throw new HttpError('Invalid inputs getPlacesbyUserId, please check your data', 422)  
  }

  const { title, description } = req.body;
  const placeId = req.params.pid;

  const updatedPlace = { ...DUMMY_PLACES.find(p => p.id === placeId) };
  const placeIndex = DUMMY_PLACES.findIndex(p => p.id === placeId);
  updatedPlace.title = title;
  updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({place: updatedPlace});
};


const deletePlace = (req, res, next) => {
  const placeId = req.params.pid;
  if (!DUMMY_PLACES.find(p => p.id !== placeId)) {
    throw new HttpError('Could not find a place with the input id', 404);
  }
  DUMMY_PLACES = DUMMY_PLACES.filter(p => p.id !== placeId);
  res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesbyUserId  = getPlacesbyUserId ;
exports.createPlace = createPlace;
exports.updatePlace = updatePlace;
exports.deletePlace = deletePlace;

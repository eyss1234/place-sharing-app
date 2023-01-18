const HttpError = require('../models/http-error')

const DUMMY_PLACES = [
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

const getPlacebyUserId = (req, res, next) => {
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => {
      return p.creator === userId;
    })
    if (!place) {
      return next(new HttpError(
        'Could not find a user for the provided user id.', 404
      ));
    }
    res.json({place});
  }

exports.getPlaceById = getPlaceById;
exports.getPlacebyUserId  = getPlacebyUserId ;

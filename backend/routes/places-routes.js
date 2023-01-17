const express = require('express');

const router = express.Router();

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
    creater: 'u1'
  }
];

router.get('/:pid', (req, res, next) => {
  const placeId = req.params.pid;
  const place = DUMMY_PLACES.find(p => {
    return p.id === placeId;
  });
  res.json({place});
});

module.exports = router;

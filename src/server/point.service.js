const Point = require("./point.model");
const ReadPreference = require("mongodb").ReadPreference;

require("./mongo").connect();

function getPoints(req, res) {
  const query = req.query;

  const limit = Number(query["_limit"]);
  const page = query["_page"];
  const order = query["_order"];
  const sort = query["_sort"];

  // const filters = Object.keys(query).filter(k => !k.startsWith('_')).map(k => ({key: k, values: query[k]});
  const filters = Object.keys(query)
    .filter(i => !i.startsWith("_"))
    .reduce((obj, key) => {
      obj[key] = query[key];
      return obj;
    }, {});

  const sortObject = {};
  sortObject[sort] = order === "asc" ? 1 : -1;

  const docquery = Point.find(filters);

  Point.find(filters).count((err, pointCount) => {
    var count = pointCount;

    Point.find(filters)
      .limit(limit)
      .sort(sortObject)
      .read(ReadPreference.NEAREST)
      .exec()
      .then(points => {
        res.setHeader("x-total-count", count);
        res.status(200).json(points);
      })
      .catch(error => {
        res.status(500).send(error);
        return;
      });
  });
}

function getPoint(req, res) {
  const pointId = req.params.id;
  Point.findOne({ pointId: pointId })
    .exec()
    .then(point => res.status(200).json(point))
    .catch(error => {
      res.status(500).send(error);
      return;
    });
}

function postPoint(req, res) {
  const now = Date.now();

  const pointData = {
    owner: req.body.owner,
    reason: req.body.reason,
    note: req.body.note,
    points: req.body.points,
    submitter: req.body.submitter,
    submittedDate: now,
    paid: false,
    paidDate: null,
    lastModifiedDate: now
  };
  const point = new Point(pointData);
  point.save(error => {
    if (checkServerError(res, error)) return;
    res.status(201).json(point);
    console.log("Point created successfully!");
  });
}

function putPoint(req, res) {
  const id = parseInt(req.params.id, 10);
  Point.findOne({ pointId: id }, (error, point) => {
    if (checkServerError(res, error)) return;
    if (!checkFound(res, point)) return;

    const now = Date.now();

    point.owner = req.body.owner;
    point.reason = req.body.reason;
    point.note = req.body.note;
    point.points = req.body.points;
    point.paid = req.body.paid;
    point.paidDate = req.body.paidDate;
    point.lastModifiedDate = now;

    point.save(error => {
      if (checkServerError(res, error)) return;
      res.status(200).json(point);
      console.log("Point updated successfully!");
    });
  });
}

function deletePoint(req, res) {
  const id = parseInt(req.params.id, 10);
  Point.findOneAndRemove({ id: id })
    .then(point => {
      if (!checkFound(res, point)) return;
      res.status(200).json(point);
      console.log("Point deleted successfully!");
    })
    .catch(error => {
      if (checkServerError(res, error)) return;
    });
}

function checkServerError(res, error) {
  if (error) {
    res.status(500).send(error);
    return error;
  }
}

function checkFound(res, point) {
  if (!point) {
    res.status(404).send("Point not found.");
    return;
  }
  return point;
}

module.exports = {
  getPoints,
  getPoint,
  postPoint,
  putPoint,
  deletePoint
};

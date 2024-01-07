const validateCreation = (req, res, next) => {
  const {
    name,
    method,
    monday,
    tuesday,
    wednesday,
    thursday,
    friday,
    saturday,
    sunday,
  } = req.body;

  if (
    !name
    || method === undefined || null
    || !monday
    || !tuesday
    || !wednesday
    || !thursday
    || !friday
    || !saturday
    || !sunday
  ) return res.status(400).json({ message: 'Missing fields' });

  if (
    typeof name !== 'string'
    || typeof method !== 'number'
    || typeof monday !== 'number'
    || typeof tuesday !== 'number'
    || typeof wednesday !== 'number'
    || typeof thursday !== 'number'
    || typeof friday !== 'number'
    || typeof saturday !== 'number'
    || typeof sunday !== 'number'
  ) return res.status(401).json({ message: 'Name must be a string, while method, monday, tuesday, wednesday, thursday, friday, saturday and sunday must be a number' });

  if (
    monday < 0
    || tuesday < 0
    || wednesday < 0
    || thursday < 0
    || friday < 0
    || saturday < 0
    || sunday < 0
  ) return res.status(401).json({ message: 'Prices must be greater than 0' });

  if (method !== 0 && method !== 1) return res.status(401).json({ message: 'Method must be 0 or 1' });

  return next();
};

const validateGetById = (req, res, next) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: 'Missing id' });
  return next();
};

module.exports = {
  validateCreation,
  validateGetById,
};

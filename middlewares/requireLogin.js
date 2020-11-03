module.exports = (req, resp, next) => {
  if (!req.user) {
    return resp.status(401).send({ error: "You must log in" });
  }
  next();
};

module.exports = (req, resp, next) => {
  /* if (!req.user) {
    return resp.status(401).send({ error: "You must log in" });
  }*/
  if (req.user.credits < 1) {
    return resp.status(403).send({ error: "Not enough credits" });
  }
  next();
};

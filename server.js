"use strict";

const express = require("express");
const moment = require("moment");

const app = express();

app.get('/:query', function (req, res) {
  const queryDateString = req.params.query;
  
  let unixtime, natural;
  
  const unixTime = parseInt(queryDateString);
  
  if (unixTime && unixTime >= 0) { // query is a unix number
    unixtime = unixTime;
    natural = moment.unix(unixTime).format("MMMM D, YYYY");
  }
  else if (isNaN(queryDateString) && moment(queryDateString, "MMMM, d YYYY").isValid()) { // query is not a number, check if natural date
    unixtime = moment(queryDateString, "MMMM D, YYYY").format("X");
    natural = queryDateString;
 } else {
    unixtime = null;
    natural = null;
 }
 
  const obj = {
    unixtime: unixtime,
    natural: natural
  };
  
  res.send(obj);
  
})

app.listen(process.env.PORT || 8080));

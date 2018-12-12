'use strict';
const mongoose = require('mongoose');

const <%=modelName%>Schema = new mongoose.Schema({

}, {
  timestamps: <%=timestamps%>
});

module.exports = mongoose.model('<%=modelName%>', <%=modelName%>Schema);

'use strict';
const mongoose = require('mongoose');

const <%=camelizedModelName%>Schema = new mongoose.Schema({

}, {
  timestamps: <%=timestamps%>
});

module.exports = mongoose.model('<%=camelizedModelName%>', <%=camelizedModelName%>Schema);

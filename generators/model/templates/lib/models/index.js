'use strict';
<% files.forEach((file, index) => { %>
const <%=camelize(file)%> = require('./<%=file%>.js')
<%});%>

module.exports = {
    <% files.forEach((file, index) => {%><%=camelize(file)%><%=index !== files.length - 1 ? ',' : ''%><%if(index !== files.length - 1){%>
    <%}%><%});%>
};

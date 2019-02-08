// build a new row for the stories-table from a JSON object received via the /SSE eventbus

function makerow(feedback, count) {
  var items = [];
  items.push("<tr>");
  items.push("<td class='_id' style='display:none;'>" + feedback.new_entry._id + "</td>");
  items.push("<td class='#'>" + count + "</td>");
  items.push("<td class='Story'>" + feedback.new_entry.feedback + "</td>");
  items.push("</tr>");
  var tr = items.join("");
  $("#feedback").find('tbody').append(tr);
}

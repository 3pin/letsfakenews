// build a new row for the stories-table from a JSON object received via the /SSE eventbus

function makerow(story, count) {
  var items = [];
  let status;
  if (story.stories.storylive == true) {
    status = 'checked'
  } else {
    status = 'unchecked'
  }
  items.push("<tr>");
  items.push("<td class='_id' style='display:none;'>" + story.stories._id + "</td>");
  items.push("<td class='#'>" + count + "</td>");
  items.push("<td class='Title'>" + story.stories.title + "</td>");
  items.push("<td class='Story'>" + story.stories.story + "</td>");
  items.push("<td class='Remove'> <button title='remove' type='button' class='btn btn-danger remove show_tip btn-sm'></button> </td>");
  items.push("<td class='Live'><input " + status + " title='live' type='checkbox' class='form-check-input storylive' ></td>");
  items.push("</tr>");
  var tr = items.join("");
  $("#stories").find('tbody').append(tr);
}
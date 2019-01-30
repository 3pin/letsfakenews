// function storydata
function storydata(data) {
  // load title/story
  let title = data.title;
  let story = data.story;
  return {
    title: title,
    story: story
  }
}
// function process-multimedia-metadata
function metadata(data, image_duration, imagesStart) {
  // load imge_URLS
  let image_locations = data.urls;
  let urls = []
  for (var url in image_locations) {
    urls.push(image_locations[url]);
  }
  // calculate multimedia metadata
  let pic_duration = Math.round(image_duration / urls.length);
  let markers = []
  for (i = 1; i <= urls.length; i++) {
    markers.push(Math.round(imagesStart + pic_duration * i));
  }
  return {
    urls: urls,
    markers: markers
  }
}

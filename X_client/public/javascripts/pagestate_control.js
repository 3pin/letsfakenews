function pagestate_ctrl(div_vis_in) {
  let show_div = '#' + div_vis_in
  let hide_div = 'div:not(#' + div_vis_in + ')'
  if (mode == 'development') {
    console.log('pagestate val: ' + div_vis_in)
    console.log('show_div: ' + show_div)
    console.log('hide_div: ' + hide_div)
  }
  let i;
  for (i = 1; i < 6; i++) {
    if (i == div_vis_in) {
      $('#' + i).show()
    } else {
      $('#' + i).hide()
    }
  }
}

function pagestate_alloff() {
  $('div:not(#0)').hide()
  $("#banner_image_frame").show()
  $("#footer_image_frame").show()
}

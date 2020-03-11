export default function Layout(imageLayout, textLayout, aspectRatio, canvasWidth, canvasHeight, containerWidth, containerHeight) {
  //
  //
  /* set in from left edge */
  textLayout.textFrame_Border = Math.round(containerWidth * textLayout.borderFactor); /* set text in from all edges */
  /* calc postions */
  textLayout.textFrame_xOrigin = textLayout.textFrame_Border;
  textLayout.textFrame_yOrigin = Math.round(containerHeight * textLayout.yOffsetFactor) + textLayout.textFrame_Border;
  textLayout.textFrame_Width = containerWidth - Math.round(2 * textLayout.textFrame_Border);
  textLayout.textFrame_Height = Math.round(containerHeight * textLayout.heightFactor) - textLayout.textFrame_Border;
  textLayout.fontSize = Math.round(textLayout.textFrame_Height*0.6);
  //
  //
  /* set in from left edge */
  imageLayout.imageFrame_Xoffset = Math.round(containerWidth * imageLayout.xOffsetFactor);
  /* set in from all edges */
  imageLayout.imageFrame_Border = Math.round(containerWidth * imageLayout.borderFactor);
  /* calc postions */
  imageLayout.imageFrame_xOrigin = imageLayout.imageFrame_Xoffset + imageLayout.imageFrame_Border;
  imageLayout.imageFrame_yOrigin = imageLayout.imageFrame_Border;
  imageLayout.imageFrame_Width = Math.round(containerWidth * imageLayout.widthFactor) - Math.round(2 * imageLayout.imageFrame_Border);
  imageLayout.imageFrame_Height = Math.round(containerHeight * imageLayout.heightFactor) - Math.round(2 * imageLayout.imageFrame_Border);
  imageLayout.image_Xcentre = imageLayout.imageFrame_xOrigin + Math.round(imageLayout.imageFrame_Width / 2);
  imageLayout.image_Ycentre = imageLayout.imageFrame_yOrigin + Math.round(imageLayout.imageFrame_Height / 2);
  //
  //console.log(textLayout);
  //console.log(imageLayout);
  //
  return {
    imageLayout: imageLayout,
    textLayout: textLayout
  }
}

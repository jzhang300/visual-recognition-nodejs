/**
 * Copyright 2015 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

 /* global $:false, setupUse */
'use strict';

// if image is landscape, tag it
function addLandscape(imgElement) {
  if (imgElement.height < imgElement.width)
    imgElement.classList.add('landscape');
}

// attach landscape class on image load event
function landscapify(imgSelector) {
  $(imgSelector).on('load', function() {
    addLandscape(this);
  }).each(function() {
    if (this.complete)
      $(this).load();
  });
}

// square images
function square() {
  $('.square').each(function() {
    $(this).css('height', $(this)[0].getBoundingClientRect().width + 'px');
  });
}

function imageFadeIn(imgSelector) {
  $(imgSelector).on('load', function() {
    $(this).addClass('loaded');
  }).each(function() {
    if (this.complete)
      $(this).load();
  });
}

/**
 * scroll animation to element on page
 * @param  {$element}  Jquery element
 * @return {void}
 */
function scrollToElement(element) {
  $('html, body').animate({
    scrollTop: element.offset().top
  }, 300);
}

/**
 * Returns the current page
 * @return {String} the current page: test, train or use
 */
function currentPage() {
  var href = $(window.location).attr('href');
  return href.substr(href.lastIndexOf('/'));
}

/**
 * Returns the next hour as Date
 * @return {Date} the next hour
 */
function nextHour() {
  var oneHour = new Date();
  oneHour.setHours(oneHour.getHours() + 1);
  return oneHour;
}

/**
 * Resizes an image
 * @param  {String} image   The base64 image
 * @param  {int} maxSize maximum size
 * @return {String}         The base64 resized image
 */
function resize(image, maxSize) {
  var c = window.document.createElement('canvas'),
    ctx = c.getContext('2d'),
    ratio = image.width / image.height;

  c.width = (ratio > 1 ? maxSize : maxSize * ratio);
  c.height = (ratio > 1 ? maxSize / ratio : maxSize);

  ctx.drawImage(image, 0, 0, c.width, c.height);
  return c.toDataURL('image/jpeg');
}

$(document).ready(function () {

  // tagging which images are landscape
  landscapify('.use--example-image');
  landscapify('.use--output-image');
  landscapify('.train--bundle-thumb');
  landscapify('.test--example-image');
  landscapify('.test--output-image');

  square();
  imageFadeIn('.square img');

  $(window).resize(square);

  //tab listener
  $('.tab-panels--tab').click(function(e){
    e.preventDefault();
    var self = $(this);
    var newPanel = self.attr('href');
    if (newPanel !== currentPage())
      window.location = newPanel;
  });
});

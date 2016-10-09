/**
 * Created by iretd on 08.10.2016.
 */

module.exports = Events;

var lodash = require('lodash');

function Events() {

  var events = {};
  var t = {};

  function putEvent(idEvent, event) {

    events[idEvent] = event;

  }

  function getEvent(idEvent) {

    return events[idEvent];

  }
  
}

/**
 * Created by iretd on 28.09.16.
 */

KudagoService.$inject = ['kudagoEventsService'];

module.exports = KudagoService;


function KudagoService(KudagoEventsService) {

  var t = {};

  t.getAllEvents = getAllEvents;

  return t;

  function getAllEvents(callback) {

    KudagoEventsService.getAllEvents(callback);

  }

};

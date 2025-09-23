async function onAppointmentCreated(event) {
  console.log('[Notificaciones] appointment.created event received:');
  console.log(event);
  // Here you could integrate with an email/SMS provider.
}

module.exports = {
  onAppointmentCreated
};

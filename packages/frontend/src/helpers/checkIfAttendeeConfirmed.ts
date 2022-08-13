export function checkIfAttendeeConfirmed(event, address): boolean {
    for (let i = 0; i < event.confirmedAttendees.length; i++) {
      let confirmedAddress = event.confirmedAttendees[i].attendee.id;
      if (confirmedAddress.toLowerCase() == address.toLowerCase()) {
        return true;
      }
    }
    return false;
}

export default checkIfAttendeeConfirmed
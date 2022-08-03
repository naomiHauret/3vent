import { newMockEvent } from "matchstick-as"
import { ethereum, Bytes, Address, BigInt } from "@graphprotocol/graph-ts"
import {
  ConfirmedAttendee,
  DepositsPaidOut,
  NewEventCreated,
  NewRSVP
} from "../generated/Web3RSVP/Web3RSVP"

export function createConfirmedAttendeeEvent(
  eventID: Bytes,
  attendeeAddress: Address
): ConfirmedAttendee {
  let confirmedAttendeeEvent = changetype<ConfirmedAttendee>(newMockEvent())

  confirmedAttendeeEvent.parameters = new Array()

  confirmedAttendeeEvent.parameters.push(
    new ethereum.EventParam("eventID", ethereum.Value.fromFixedBytes(eventID))
  )
  confirmedAttendeeEvent.parameters.push(
    new ethereum.EventParam(
      "attendeeAddress",
      ethereum.Value.fromAddress(attendeeAddress)
    )
  )

  return confirmedAttendeeEvent
}

export function createDepositsPaidOutEvent(eventID: Bytes): DepositsPaidOut {
  let depositsPaidOutEvent = changetype<DepositsPaidOut>(newMockEvent())

  depositsPaidOutEvent.parameters = new Array()

  depositsPaidOutEvent.parameters.push(
    new ethereum.EventParam("eventID", ethereum.Value.fromFixedBytes(eventID))
  )

  return depositsPaidOutEvent
}

export function createNewEventCreatedEvent(
  eventID: Bytes,
  creatorAddress: Address,
  eventTimestamp: BigInt,
  maxCapacity: BigInt,
  deposit: BigInt,
  eventDataCID: string
): NewEventCreated {
  let newEventCreatedEvent = changetype<NewEventCreated>(newMockEvent())

  newEventCreatedEvent.parameters = new Array()

  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam("eventID", ethereum.Value.fromFixedBytes(eventID))
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "creatorAddress",
      ethereum.Value.fromAddress(creatorAddress)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventTimestamp",
      ethereum.Value.fromUnsignedBigInt(eventTimestamp)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "maxCapacity",
      ethereum.Value.fromUnsignedBigInt(maxCapacity)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "deposit",
      ethereum.Value.fromUnsignedBigInt(deposit)
    )
  )
  newEventCreatedEvent.parameters.push(
    new ethereum.EventParam(
      "eventDataCID",
      ethereum.Value.fromString(eventDataCID)
    )
  )

  return newEventCreatedEvent
}

export function createNewRSVPEvent(
  eventID: Bytes,
  attendeeAddress: Address
): NewRSVP {
  let newRsvpEvent = changetype<NewRSVP>(newMockEvent())

  newRsvpEvent.parameters = new Array()

  newRsvpEvent.parameters.push(
    new ethereum.EventParam("eventID", ethereum.Value.fromFixedBytes(eventID))
  )
  newRsvpEvent.parameters.push(
    new ethereum.EventParam(
      "attendeeAddress",
      ethereum.Value.fromAddress(attendeeAddress)
    )
  )

  return newRsvpEvent
}

const hre = require('hardhat')

const main = async () => {
  // Deploy the contract locally
  const rsvpContractFactory = await hre.ethers.getContractFactory('Web3RSVP')
  const rsvpContract = await rsvpContractFactory.deploy()
  await rsvpContract.deployed()
  console.log('Contract deployed to:', rsvpContract.address)

  // Get deployer wallet address and others test wallet addresses
  const [deployer, address1, address2] = await hre.ethers.getSigners()

  // Scenario 1: create a new attendable event
  const deposit = hre.ethers.utils.parseEther('1')
  const maxCapacity = 3
  const timestamp = 1718926200
  // This IPFS CID was already created
  const eventDataCID = 'bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi'

  let txn = await rsvpContract.createNewEvent(timestamp, deposit, maxCapacity, eventDataCID)
  let wait = await txn.wait()
  console.log('NEW EVENT CREATED:', wait.events[0].event, wait.events[0].args)

  const eventID = wait.events[0].args.eventID
  console.log('EVENT ID:', eventID)

  // Scenario 2: create new RSVP
  txn = await rsvpContract.createNewRSVP(eventID, {value: deposit})
  wait = await txn.wait()
  console.log('NEW RSVP:', wait.events[0].event, wait.events[0].args)

  txn = await rsvpContract.connect(address1).createNewRSVP(eventID, {value: deposit})
  wait = await txn.wait()
  console.log('NEW RSVP:', wait.events[0].event, wait.events[0].args)

  txn = await rsvpContract.connect(address2).createNewRSVP(eventID, {value: deposit})
  wait = await txn.wait()
  console.log('NEW RSVP:', wait.events[0].event, wait.events[0].args)

  // Scenario 3: confirm all attendees
  txn = await rsvpContract.confirmAllAttendees(eventID)
  wait = await txn.wait()
  wait.events.forEach((event) => console.log('CONFIRMED:', event.args.attendeeAddress))

  // Scenario 4: withdraw unclaimed deposits
  // Normally the organizer would have to wait 7 days before withdrawing unclaimed deposits
  // We will simulate that 10 years have passed in order to test our function

  // wait 10 years
  await hre.network.provider.send('evm_increaseTime', [15778800000000])

  txn = await rsvpContract.withdrawUnclaimedDeposits(eventID)
  wait = await txn.wait()
  console.log('WITHDRAWN:', wait.events[0].event, wait.events[0].args)
}

const runMain = async () => {
  try {
    await main()
    process.exit(0)
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}

runMain()

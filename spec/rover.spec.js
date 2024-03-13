const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.



describe("Rover class", function() {
  //test 7
  it("constructor sets position and default values for mode and generatorWatts", function() {
    let position = 0;
    let rover = new Rover(position);
    expect(rover.position).toBe(position);
    expect(rover.mode).toBe('NORMAL');
    expect(rover.generatorWatts).toBe(110);
  });
  //test 8
  it("response returned by receiveMessage contains the name of the message", function() {
    let message = new Message ('Test', []);
    let rover = new Rover(0);
    let response = rover.receiveMessage(message);
    expect(response.message).toBe('Test');
  });
  //test 9
  it("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    let commands = [
      new Command('MODE_CHANGE','LOW_POWER'), // create a sample message object with two commands
      new Command('STATUS_CHECK')
    ];
    let message = new Message('Test', commands);
    let rover = new Rover(0); //created a rover object
    let response = rover.receiveMessage(message); //call methods on the rover object with sample message
    expect(response.results.length).toBe(2);
  });
  // test 10
  it("responds correctly to the status check command", function() {
    let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];
    let message = new Message('Test', commands);
    let rover = new Rover(0)
    let response = rover.receiveMessage(message);
    let roverStatus = response.results[1].roverStatus;
    expect(roverStatus.mode).toBe('LOW_POWER');
    expect(roverStatus.generatorWatts).toBe(110);
    expect(roverStatus.position).toBe(0);
  });
// test 11
it("responds correctly to the mode change command", function() {
  let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('STATUS_CHECK')];
  let message = new Message('Test', commands);
  let rover = new Rover(0)
  let response = rover.receiveMessage(message);
  expect(response.results[0].completed).toBe(true);
  expect(rover.mode).toBe('LOW_POWER');
});
// //test 12
it("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
  let commands = [new Command('MODE_CHANGE','LOW_POWER'), new Command('MOVE', 55)];
  let message = new Message('Test', commands);
  let rover = new Rover(0)
  let response = rover.receiveMessage(message);
  expect(response.results[1].completed).toBe(false);
});
//test 13
it("responds with the position for the move command", function(){
  let commands = [new Command('MOVE', 55)];
  let message = new Message('Test', commands);
  let rover = new Rover(0)
  let response = rover.receiveMessage(message);
  expect(rover.position).toBe(55);
});

});

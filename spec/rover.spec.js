const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.


describe("Rover class", function() {
  let rover;
  let commands;
  let message;


  beforeEach(() => {
    rover = new Rover(98382);
    commands = [new Command('STATUS_CHECK'),
    new Command('MODE_CHANGE', 'NORMAL')];
    message = new Message('Test message with two commands', commands);
  });

  it("should set position based on constructor argument", function() {
    expect(rover.position).toEqual(98382);
  });

  it("should set default mode to 'NORMAL' and process commands correctly", function() {
    let response = rover.receiveMessages(message);
    expect(rover.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
  });

  it("should set default mode to 'NORMAL' and generatorWatts to 110", function(){
    expect(rover.mode).toEqual('NORMAL');
    expect(rover.generatorWatts).toEqual(110);
  });

  it("should return the name of the message in the response", function() {
    let response = rover.receiveMessages(message);
    expect(response.message).toEqual('Test message with two commands');
  });

  it("should return two results if two commands are sent in the message", function() {
    let response = rover.receiveMessages(message);
    expect(response.results.length).toEqual(2);
  });

  it("should include a roverStatus object in the result for STATUS_CHECK command", function() {
    let response = rover.receiveMessages(message);
    expect(response.results[0].roverStatus).toBeDefined();
    expect(response.results[0].roverStatus.mode).toEqual('NORMAL');
    expect(response.results[0].roverStatus.generatorWatts).toEqual(110);
    expect(response.results[0].roverStatus.position).toEqual(98382);
  });
  it("should update position when receiving a Move command", function() {
    let moveCommand = [new Command('MOVE', 87382098)];
    let moveMessage = new Message('Test message with one command', moveCommand);
    rover.receiveMessages(moveMessage);
    expect(rover.position).toEqual(87382098);
  });

  it("should respond with false completed value when attempting to move in LOW_POWER ", function() {
    let lowPowerCommands = [new Command('MODE_CHANGE', 'LOW_POWER'), 
    new Command('MOVE', 87382098)
  ];
    let lowPowerMessage = new Message('Test message with two commands', lowPowerCommands);
    let response = rover.receiveMessages(lowPowerMessage);
    expect(response.results[1].completed).toBe(false);
  });
});

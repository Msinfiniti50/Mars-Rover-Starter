const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
//       However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Message class", function() {
    it("should return an object with a 'message' property equal to the original Message object's name", function() {
        let message = new Message('Test message');
        expect(message.name).toEqual('Test message');
      });
    
      it("should return an object with a 'results' property that is an array", function() {
        let commands = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')];
        let message = new Message('Test message', commands);
        expect(Array.isArray(message.commands)).toBe(true);
      });
    });
 
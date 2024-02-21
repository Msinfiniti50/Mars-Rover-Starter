class Rover {
   constructor(position) {
     this.position = position;
     this.mode = 'NORMAL';
     this.generatorWatts = 110;
   }

receiveMessages(message) {
   let response = {
     message: message.name,
     results: []
   };
   for (let {commandType, value} of message.commands) {
     switch (commandType) {
       case 'STATUS_CHECK':
         response.results.push({completed: true, roverStatus: {mode: this.mode, generatorWatts: this.generatorWatts, position: this.position}});
         break;
       case 'MODE_CHANGE':
         this.mode = value;
         response.results.push({completed: true});
         break;
       case 'MOVE':
         if (this.mode === 'NORMAL') {
           this.position = value;
           response.results.push({completed: true});
         } else {
           response.results.push({completed: false});
         }
         break;
     }
   }
 
   return response;
 }
}
module.exports = Rover;
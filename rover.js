class Rover {
   constructor(position, mode = 'NORMAL', generatorWatts = 110){
      this.position = position;
      this.mode = mode
      this.generatorWatts = generatorWatts;
   }

   receiveMessage(message) {
      let response = {
         message: message.name, //message: the name of the original Message object
         results: [] //an array of results. Each element in the array is an object that corresponds to one Command in message.commands.
      };
      for (let command of message.commands) {
         let result = {};

         if(command.commandType === 'MODE_CHANGE') {
            this.mode = command.value;
            result.completed = true;
         } else if (command.commandType === 'STATUS_CHECK') {
           result.roverStatus = {
            mode: this.mode,
            generatorWatts: this.generatorWatts,
            position: this.position
           };
           result.completed = true;
         } else if (command.commandType === 'MOVE') {
            if (this.mode === 'LOW_POWER') { 
               result.completed = false;
               result.message = 'Cant be moved in this state';
            } else {
               this.position = command.value;
               result.completed = true;
            }
         }
         response.results.push(result);
      }
      return response;
   }   
}
  

module.exports = Rover;
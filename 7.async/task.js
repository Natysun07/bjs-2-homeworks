class AlarmClock {
    constructor() {
      this.alarmCollection = [];
      this.intervalId = null;
    }
  
    addClock(time, callback) {
      if (!time || !callback) {
        throw new Error('Отсутствуют обязательные аргументы');
      }
  
      if (this.alarmCollection.some(alarm => alarm.time === time)) {
        console.warn('Уже присутствует звонок на это же время');
      } 
      this.alarmCollection.push({ time, callback, canCall: true });
    }
  
    removeClock(time) {
      let indexToRemove = this.alarmCollection.findIndex(alarm => alarm.time === time);
      do
      {
        indexToRemove = this.alarmCollection.findIndex(alarm => alarm.time === time);
        if (indexToRemove !== -1) {
          this.alarmCollection.splice(indexToRemove, 1);
        }
      }
      while (indexToRemove !== -1);
    }
  
    getCurrentFormattedTime() {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      return `${hours}:${minutes}`;
    }
  
    start() {
      if (this.intervalId) {
        return;
      }
    this.intervalId = setInterval(() => {
        const currentTime = this.getCurrentFormattedTime();
        this.alarmCollection.forEach(alarm => {
            if (alarm.time === currentTime && alarm.canCall) {
              alarm.callback();
              alarm.canCall = false;
            }
          });
        }, 1000);
    }
  
    stop() {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  
    resetAllCalls() {
      this.alarmCollection.forEach(alarm => (alarm.canCall = true));
    }
  
    clearAlarms() {
      this.stop();
      this.alarmCollection = [];
      this.intervalId = null;
    }
  }
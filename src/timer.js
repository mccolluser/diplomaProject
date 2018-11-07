function timer(){
    let timeOut = 60000;
    setTimeout(() =>{
        let popup = document.querySelector('.popup');
        popup.style.display = 'block';
    }, timeOut);
    
    
    let deadline = '2019-07-04 0:00:00';

    function getTimeRemaining(endtime) {
        let t = Date.parse(endtime) - Date.parse(new Date()),
            seconds = Math.floor((t / 1000) % 60),
            minutes = Math.floor((t / 1000 / 60) % 60),
            hours = Math.floor((t / 1000 / 60 / 60) % 24),
            days = Math.floor((t / 1000 / 60 / 60 / 24));

        return {
            'total': t,
            'days': (t < 0) ? 0 : days,
            'hours': (t < 0) ? 0 : hours,
            'minutes': (t < 0) ? 0 : minutes,
            'seconds': (t < 0) ? 0 : seconds,
        };
    }

    function setNumbersOnTimer(element, number){ 
        let numbers = [];
        while(true){
            let tmp = number % 10;
            numbers.unshift(tmp);
            number = Math.trunc(number / 10);
            if (number == 0){
                break;
            }
        }
        if (numbers.length == 1){
            numbers.unshift(0);
        }
        element.innerHTML = "";
        for (let i = 0; i < numbers.length; ++i){
            let tmp = document.createElement('span');
            tmp.innerHTML = numbers[i];
            element.appendChild(tmp);
        }
    }
    function setClock(id, endTime) {
        let timer = document.getElementById(id),
            days = timer.querySelector('.container1 .numbers1 #days'),
            hours = timer.querySelector('.container1 .numbers1 #hours'),
            minutes = timer.querySelector('.container1 .numbers1 #minutes'),
            seconds = timer.querySelector('.container1 .numbers1 #seconds'),
            timeInterval = setInterval(updateClock, 1000);
        
        // let daysInt = +getNumbers(days),
        //     hoursInt = +getNumbers(hours),
        //     minutesInt = +getNumbers(minutes),
        //     secondsInt = +getNumbers(seconds);

        function updateClock() {
            let t = getTimeRemaining(endTime);

            if (t.total <= 0) {
                clearInterval(timeInterval);
            }
            setNumbersOnTimer(days, t.days);
            setNumbersOnTimer(hours, t.hours);
            setNumbersOnTimer(minutes, t.minutes);
            setNumbersOnTimer(seconds, t.seconds);
            // hours.textContent = (-1 < t.hours && t.hours < 10) ? "0" + t.hours : t.hours;
            // minutes.textContent = (-1 < t.minutes && t.minutes < 10) ? "0" + t.minutes : t.minutes;
            // seconds.textContent = (-1 < t.seconds && t.seconds < 10) ? "0" + t.seconds : t.seconds;
        }

    }
    setClock('timer', deadline);
}
module.exports = timer;
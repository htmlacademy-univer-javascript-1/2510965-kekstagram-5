function checkMeeting(startOfWorkday, endOfWorkday, startOfMeeting, meetingDuration) {
    function timeInMinutes(time) {
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
    }

    const startOfWorkdayInMinutes = timeInMinutes(startOfWorkday);
    const endOfWorkdayInMinutes = timeInMinutes(endOfWorkday);
    const startOfMeetingInMinutes = timeInMinutes(startOfMeeting);

    const endOfMeetingInMinutes = startOfMeetingInMinutes + meetingDuration;

    return startOfWorkdayInMinutes <= startOfMeetingInMinutes && endOfMeetingInMinutes <= endOfWorkdayInMinutes;
}

console.log(checkMeeting('08:00', '17:30', '14:00', 90)); // true
console.log(checkMeeting('8:0', '10:0', '8:0', 120));     // true
console.log(checkMeeting('08:00', '14:30', '14:00', 90)); // false
console.log(checkMeeting('14:00', '17:30', '08:0', 90));  // false
console.log(checkMeeting('8:00', '17:30', '08:00', 900)); // false


export default function SchedulePage() {
  // Mock schedule data
  const schedule = {
    fieldA: [
      { time: "9:00 AM", available: false },
      { time: "11:00 AM", available: true },
      { time: "1:00 PM", available: true },
      { time: "3:00 PM", available: false },
      { time: "5:00 PM", available: true },
    ],
    fieldB: [
      { time: "9:00 AM", available: true },
      { time: "11:00 AM", available: false },
      { time: "1:00 PM", available: true },
      { time: "3:00 PM", available: true },
      { time: "5:00 PM", available: false },
    ],
  };

  return (
    <div className="schedule-container">
      <h1>Field Availability</h1>

      <div className="field-schedules">
        <div className="field-schedule">
          <h2>Field A</h2>
          <div className="time-slots">
            {schedule.fieldA.map((slot, index) => (
              <div
                key={index}
                className={`time-slot ${
                  slot.available ? "available" : "booked"
                }`}
              >
                {slot.time} - {slot.available ? "Available" : "Booked"}
              </div>
            ))}
          </div>
        </div>

        <div className="field-schedule">
          <h2>Field B</h2>
          <div className="time-slots">
            {schedule.fieldB.map((slot, index) => (
              <div
                key={index}
                className={`time-slot ${
                  slot.available ? "available" : "booked"
                }`}
              >
                {slot.time} - {slot.available ? "Available" : "Booked"}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

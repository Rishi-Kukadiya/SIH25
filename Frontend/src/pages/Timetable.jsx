import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Timetable = () => {
  const [courses, setCourses] = useState([]);

  // Dummy + API-like timetable data
  const apiResponse = {
    status: 200,
    data: {
      courses: [
        {
          course: { courseCode: "cse101", courseName: "Introduction to Programming" },
          schedule: [
            { day: "monday", startTime: "10:00", endTime: "11:00", room: "A101" },
            { day: "wednesday", startTime: "10:00", endTime: "11:00", room: "A101" }
          ]
        },
        {
          course: { courseCode: "cse201", courseName: "Data Structures and Algorithms" },
          schedule: [
            { day: "tuesday", startTime: "09:00", endTime: "10:00", room: "B201" },
            { day: "thursday", startTime: "09:00", endTime: "10:00", room: "B201" }
          ]
        },
        {
          course: { courseCode: "math301", courseName: "Linear Algebra" },
          schedule: [
            { day: "monday", startTime: "14:00", endTime: "15:00", room: "C105" },
            { day: "friday", startTime: "09:00", endTime: "10:00", room: "C105" }
          ]
        },
        {
          course: { courseCode: "phy202", courseName: "Physics Lab" },
          schedule: [
            { day: "thursday", startTime: "15:00", endTime: "16:00", room: "Lab 2" }
          ]
        }
      ]
    }
  };

  useEffect(() => {
    setCourses(apiResponse.data.courses);
  }, []);

  const days = ["monday", "tuesday", "wednesday", "thursday", "friday"];

  // Generate time slots (9–18, 1-hour)
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 9; hour < 18; hour++) {
      const start = `${hour.toString().padStart(2, "0")}:00`;
      const end = `${(hour + 1).toString().padStart(2, "0")}:00`;
      slots.push({ start, end, hour });
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  // Build schedule map
  const buildScheduleMap = () => {
    const map = {};
    courses.forEach(course => {
      course.schedule.forEach(s => {
        const [sh] = s.startTime.split(":").map(Number);
        map[`${s.day}-${sh}`] = {
          text: `${course.course.courseName} (${s.room})`,
          startTime: s.startTime,
          endTime: s.endTime
        };
      });
    });
    return map;
  };

  const scheduleMap = buildScheduleMap();

  // Highlight ongoing
  const getCellStatus = (day, slot) => {
    const today = new Date();
    const currentDay = today.toLocaleString("en-us", { weekday: "long" }).toLowerCase();
    const nowMins = today.getHours() * 60 + today.getMinutes();

    const entry = scheduleMap[`${day}-${slot.hour}`];
    if (!entry) return "normal";
    if (day !== currentDay) return "normal";

    const [sh, sm] = entry.startTime.split(":").map(Number);
    const [eh, em] = entry.endTime.split(":").map(Number);
    const startMins = sh * 60 + sm;
    const endMins = eh * 60 + em;

    if (nowMins >= startMins && nowMins < endMins) return "ongoing";
    if (nowMins < startMins) return "upcoming";
    return "finished";
  };

  return (
    <div className="p-6">
      <Card className="shadow-xl border border-gray-200">
        <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-t-lg">
          <CardTitle className="text-xl font-bold">Faculty Timetable (9AM – 6PM)</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="table-fixed border-collapse w-full text-sm rounded-lg shadow">
              <thead>
                <tr className="bg-gray-100 text-gray-700 text-center">
                  <th className="border px-4 py-2 w-28">Time</th>
                  {days.map(day => (
                    <th key={day} className="border px-4 py-2 capitalize">
                      {day}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {timeSlots.map((slot, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="border px-3 py-2 text-gray-600 font-medium text-center">
                      {slot.start} - {slot.end}
                    </td>
                    {days.map(day => {
                      const key = `${day}-${slot.hour}`;
                      const cell = scheduleMap[key];
                      const status = getCellStatus(day, slot);

                      let cellClasses =
                        "border px-2 py-3 text-center align-middle rounded-md transition font-medium";
                      if (status === "ongoing") cellClasses += " bg-green-500 text-white shadow-md scale-105";
                      else if (status === "upcoming") cellClasses += " bg-yellow-200 text-gray-800";
                      else if (status === "finished") cellClasses += " text-gray-400";

                      return (
                        <td key={day} className={cellClasses}>
                          {cell ? cell.text : "-"}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Timetable;

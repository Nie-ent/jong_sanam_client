import { useState } from 'react';

const fields = ["สนาม A", "สนาม B", "สนาม C"];
const times = Array.from({ length: 12 }, (_, i) => 8 + i); // 8:00 - 19:00

export default function BookingTable() {
    const [bookings, setBookings] = useState({
        "สนาม A": [8, 10, 15],
        "สนาม B": [9, 14],
        "สนาม C": [8, 9, 17],
    });

    const toggleBooking = (field, hour) => {
        setBookings((prev) => {
            const current = prev[field] || [];
            const isBooked = current.includes(hour);
            return {
                ...prev,
                [field]: isBooked
                    ? current.filter((h) => h !== hour)
                    : [...current, hour],
            };
        });
    };

    return (
        <div className="p-6 min-h-screen">
            <h1 className="text-2xl font-bold mb-6 text-center">
                🕓 ตารางสนามฟุตบอล
            </h1>

            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="w-full text-center border-collapse">
                    <thead>
                        <tr className="bg-blue-600 text-white">
                            <th className="p-3 border">เวลา</th>
                            {fields.map((f) => (
                                <th key={f} className="p-3 border">
                                    {f}
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {times.map((hour) => (
                            <tr key={hour} className="hover:bg-gray-50">
                                <td className="border p-2 font-medium">
                                    {`${hour.toString().padStart(2, "0")}:00`}
                                </td>
                                {fields.map((field) => {
                                    const isBooked = bookings[field].includes(hour);
                                    return (
                                        <td
                                            key={field}
                                            className={`border p-2 cursor-pointer transition-all ${isBooked
                                                ? "bg-green-500 text-white hover:bg-green-600"
                                                : "bg-gray-100 hover:bg-blue-100"
                                                }`}
                                            onClick={() => toggleBooking(field, hour)}
                                        >
                                            {isBooked ? "จองแล้ว" : "ว่าง"}
                                        </td>
                                    );
                                })}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <p className="mt-4 text-center text-gray-600">
                💡 คลิกช่องเพื่อสลับสถานะ “จอง / ว่าง”
            </p>
        </div>
    );
}

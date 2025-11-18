import React from "react";

export default function BookingTable({
    bookings,
    pitches,
    hours,
    selectedDate,
    setSelectedDate,
    selectedPitch,
    setSelectedPitch,
    getBookingForCell,
    loading,
}) {
    if (loading) return <p>Loading...</p>;

    return (
        <div className="overflow-x-auto">
            {/* Filter */}
            <div className="flex gap-4 mb-4">
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="input input-bordered"
                />
                <select
                    value={selectedPitch}
                    onChange={(e) => setSelectedPitch(e.target.value)}
                    className="select select-bordered"
                >
                    <option value="">เลือกสนามทั้งหมด</option>
                    {pitches.map((p) => (
                        <option key={p.id} value={p.name}>
                            {p.name}
                        </option>
                    ))}
                </select>
            </div>

            {/* TimeGrid Table */}
            <table className="table table-zebra w-full border">
                <thead>
                    <tr>
                        <th>สนาม / เวลา</th>
                        {hours.map((hour) => (
                            <th key={hour}>{hour}:00</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {pitches.map((pitch) => (
                        <tr key={pitch.id}>
                            <td className="font-semibold">{pitch.name}</td>
                            {hours.map((hour) => {
                                const booking = getBookingForCell(pitch.name, hour);
                                return (
                                    <td
                                        key={hour}
                                        className={`text-center ${booking
                                            ? booking.status === "CONFIRMED"
                                                ? "bg-green-400 text-white"
                                                : booking.status === "PENDING"
                                                    ? "bg-yellow-300 text-black"
                                                    : "bg-red-400 text-white"
                                            : ""
                                            }`}
                                        title={
                                            booking
                                                ? `ผู้จอง: ${booking.user?.displayName || "ไม่ทราบ"}\nราคา: ${booking.totalPrice}\nสถานะ: ${booking.status}`
                                                : ""
                                        }
                                    >
                                        {booking ? booking.status[0] : ""}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

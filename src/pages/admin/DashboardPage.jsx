import { useEffect, useState } from "react";
import axios from "axios";
import useAuthStore from "../../stores/authStore";

export default function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const [editStatus, setEditStatus] = useState({});
    const token = useAuthStore((state) => state.token);

    // Fetch bookings
    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const res = await axios.get("http://localhost:8000/api/bookings", {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setBookings(res.data);
            } catch (err) {
                console.error("Error fetching bookings", err);
            }
        };
        fetchBookings();
    }, [token]);

    const statusStyle = {
        CONFIRMED: "bg-green-100 text-green-700",
        PENDING: "bg-yellow-100 text-yellow-700",
        CANCELLED: "bg-red-100 text-red-700",
    };

    // Update status
    const handleUpdateStatus = async (id) => {
        const newStatus = editStatus[id];
        if (!newStatus) return alert("กรุณาเลือกสถานะก่อนบันทึก");

        try {
            await axios.patch(
                `http://localhost:8000/api/bookings/${id}`,
                { status: newStatus.toLowerCase() }, // แปลงเป็น lowercase เพื่อ match backend
                { headers: { Authorization: `Bearer ${token}` } }
            );

            // Update state locally
            setBookings((prev) =>
                prev.map((b) => (b.id === id ? { ...b, status: newStatus } : b))
            );

            alert("อัปเดตสถานะเรียบร้อยแล้ว");
        } catch (err) {
            console.error("Error updating status:", err);
            alert("อัปเดตสถานะล้มเหลว");
        }
    };

    return (
        <div className="p-6 w-full bg-base-200">
            <h1 className="text-3xl font-bold mb-6">📅 ตารางการจองสนาม</h1>

            <div className="overflow-x-auto shadow rounded-lg border">
                <table className="min-w-full bg-white text-center">
                    <thead className="bg-gray-100 text-gray-700">
                        <tr>
                            <th className="px-4 py-2 border">วันที่</th>
                            <th className="px-4 py-2 border">เวลา</th>
                            <th className="px-4 py-2 border">สนาม</th>
                            <th className="px-4 py-2 border">ชื่อผู้จอง</th>
                            <th className="px-4 py-2 border">เบอร์โทร</th>
                            <th className="px-4 py-2 border">สถานะ</th>
                            <th className="px-4 py-2 border">จัดการ</th>
                        </tr>
                    </thead>

                    <tbody>
                        {bookings.length === 0 ? (
                            <tr>
                                <td colSpan="7" className="text-center py-6 text-gray-500">
                                    ไม่มีข้อมูลการจอง
                                </td>
                            </tr>
                        ) : (
                            bookings.map((b) => (
                                <tr key={b.id} className="hover:bg-gray-50">
                                    <td className="px-4 py-2 border align-middle">
                                        {new Date(b.startTime).toLocaleDateString("th-TH")}
                                    </td>

                                    <td className="px-4 py-2 border align-middle">
                                        {new Date(b.startTime).toLocaleTimeString("th-TH", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}{" "}
                                        -{" "}
                                        {new Date(b.endTime).toLocaleTimeString("th-TH", {
                                            hour: "2-digit",
                                            minute: "2-digit",
                                        })}
                                    </td>

                                    <td className="px-4 py-2 border font-semibold align-middle">
                                        {b.pitch?.name}
                                    </td>

                                    <td className="px-4 py-2 border align-middle">
                                        {b.user?.displayName || `${b.user?.firstName} ${b.user?.lastName}`}
                                    </td>

                                    <td className="px-4 py-2 border align-middle">
                                        {b.user?.phoneNumber || "-"}
                                    </td>

                                    <td className="px-4 py-2 border align-middle">
                                        <span
                                            className={`px-3 py-1 rounded-full text-sm font-semibold ${statusStyle[b.status]}`}
                                        >
                                            {b.status}
                                        </span>
                                    </td>

                                    <td className="px-4 py-2 border align-middle flex  gap-2 items-center justify-center">
                                        <select
                                            value={editStatus[b.id] ?? b.status}
                                            onChange={(e) =>
                                                setEditStatus({ ...editStatus, [b.id]: e.target.value })
                                            }
                                            className="border rounded px-2 py-1 text-sm"
                                        >
                                            <option value="CONFIRMED">CONFIRMED</option>
                                            <option value="PENDING">PENDING</option>
                                            <option value="CANCELLED">CANCELLED</option>
                                        </select>

                                        <button
                                            onClick={() => handleUpdateStatus(b.id)}
                                            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-400"
                                        >
                                            บันทึก
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

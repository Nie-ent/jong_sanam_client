import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/authApi";

function UserManagePage() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [selectedDate, setSelectedDate] = useState(
        new Date().toISOString().split("T")[0]
    );

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axiosInstance.get("/users");
            setUsers(res.data.data || []);
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการโหลดข้อมูลผู้ใช้");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const filtered = users.filter((u) => {
        return (
            u.displayName?.toLowerCase().includes(search.toLowerCase()) ||
            u.phoneNumber?.includes(search) ||
            u.lineUserId?.toLowerCase().includes(search.toLowerCase())
        );
    });

    if (loading) return <p className="p-8">กำลังโหลดข้อมูลผู้ใช้...</p>;

    return (
        <div className="flex flex-col p-8 gap-y-8 bg-base-200 w-full min-h-screen">
            <div className="flex flex-col">
                <h3 className="text-2xl font-bold">จัดการผู้ใช้</h3>
                <p className="text-xl opacity-55">
                    ดูรายชื่อลูกค้าที่ลงทะเบียนในระบบ
                </p>
            </div>

            <div className="flex flex-col p-6 bg-base-100 rounded-xl shadow-md">
                <div className="flex justify-between mb-4 items-center">
                    <div>
                        <h1 className="text-m font-bold">รายชื่อผู้ใช้ทั้งหมด</h1>
                        <p className="text-m opacity-55">
                            จำนวนผู้ใช้ทั้งหมด: {filtered.length} คน
                        </p>
                    </div>

                    <div className="flex gap-2">
                        <input
                            type="date"
                            className="input input-bordered"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="ค้นหาชื่อ, เบอร์โทร, LINE ID..."
                            className="input input-bordered"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {/* Header */}
                <div className="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_1fr] font-bold px-4 py-2 bg-gray-100 rounded-t-lg">
                    <div>ชื่อ LINE</div>
                    <div>เบอร์โทรศัพท์</div>
                    <div>LINE ID</div>
                    <div>วันที่ลงทะเบียน</div>
                    <div>สถานะ</div>
                </div>

                <div className="divide-y divide-gray-200">
                    {filtered.map((user) => (
                        <div
                            key={user.id}
                            className="grid grid-cols-[2fr_1.5fr_2fr_1.5fr_1fr] items-center px-4 py-3 hover:bg-gray-50"
                        >
                            <div className="flex items-center gap-3">
                                <img
                                    src={user.profileImg}
                                    alt="profile"
                                    className="w-10 h-10 rounded-full"
                                />
                                <span>{user.displayName}</span>
                            </div>

                            <div>{user.phoneNumber ?? "-"}</div>
                            <div className="truncate">{user.lineUserId ?? "-"}</div>
                            <div>
                                {new Date(user.createdAt).toLocaleDateString("th-TH")}
                            </div>
                            <div>
                                <span className="badge badge-info">
                                    {user.registrationStatus}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default UserManagePage;

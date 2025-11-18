import React, { useEffect, useState } from "react";
import { axiosInstance } from "../../config/authApi";

function PitchManagePage() {
    const [pitches, setPitches] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [newPitch, setNewPitch] = useState({
        name: "",
        type: "",
        hourlyRate: "",
        status: true
    });
    const [editPitchId, setEditPitchId] = useState(null);
    const [editPitchData, setEditPitchData] = useState({
        name: "",
        type: "",
        hourlyRate: "",
        status: true
    });

    const fetchPitches = async () => {
        try {
            const res = await axiosInstance.get("/pitches");
            const data = res.data?.data || [];
            setPitches(
                data.map(p => ({
                    ...p,
                    status: p.status === "OPEN" ? true : false
                }))
            );
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการโหลดสนาม");
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchPitches();
    }, []);

    const toggleStatus = async (id, currentStatus) => {
        try {
            const res = await axiosInstance.patch(`/pitches/${id}`, {
                status: !currentStatus ? "OPEN" : "CLOSED"
            });
            setPitches(prev =>
                prev.map(p => (p.id === id ? { ...p, status: res.data.status === "OPEN" } : p))
            );
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการอัปเดตสถานะสนาม");
        }
        window.location.reload()
    };


    const deletePitch = async (id) => {
        if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสนามนี้?")) return;
        try {
            await axiosInstance.delete(`/pitches/${id}`);
            // อัปเดต state ทันที -> UI rerender
            setPitches(prev => prev.filter(p => p.id !== id));
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการลบสนาม");
        }
    };


    const handleCreatePitch = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.post("/pitches", {
                ...newPitch,
                hourlyRate: Number(newPitch.hourlyRate)
            });
            // เพิ่มสนามใหม่ลง state
            setPitches(prev => [...prev, res.data]);
            setNewPitch({ name: "", type: "", hourlyRate: "", status: true });
            setShowForm(false);
        } catch (err) {
            console.error(err);
            alert("Error creating pitch");
        }
        window.location.reload()
    };

    const handleEditPitch = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.put(`/pitches/${editPitchId}`, {
                ...editPitchData,
                hourlyRate: Number(editPitchData.hourlyRate)
            });
            // อัปเดต state
            setPitches(prev =>
                prev.map(p => (p.id === editPitchId ? res.data : p))
            );
            setEditPitchId(null);
            setEditPitchData({ name: "", type: "", hourlyRate: "", PitchStatus: true });
        } catch (err) {
            console.error(err);
            alert("เกิดข้อผิดพลาดในการแก้ไขสนาม");
        }
        window.location.reload()

    };

    if (loading) return <p>Loading...</p>;

    return (
        <div className="flex flex-col p-8 gap-y-8 bg-base-200 w-full">
            <div className="flex min-w-270 justify-between">
                <div className="flex flex-col">
                    <h3 className="text-2xl font-bold">จัดการสนาม</h3>
                    <p className="text-xl opacity-55">เพิ่ม แก้ไข ลบ และเปิด/ปิดการใช้งานสนาม</p>
                </div>
                <button
                    className={`btn ${showForm ? 'btn-ghost btn-circle' : 'btn-primary'}`}
                    onClick={() => {
                        setShowForm(!showForm);
                        setEditPitchId(null); // ถ้ากำลังแก้ไข ให้ยกเลิก
                    }}
                >
                    {showForm ? '✕' : '+ เพิ่มสนาม'}
                </button>
            </div>

            {/* ฟอร์มสร้างสนาม */}
            {showForm && !editPitchId && (
                <form onSubmit={handleCreatePitch} className="flex flex-col gap-2 p-4 bg-base-100 rounded">
                    <input
                        type="text"
                        placeholder="ชื่อสนาม"
                        value={newPitch.name}
                        onChange={(e) => setNewPitch({ ...newPitch, name: e.target.value })}
                        className="input input-bordered"
                        required
                    />
                    <select
                        value={newPitch.type}
                        onChange={(e) => setNewPitch({ ...newPitch, type: e.target.value })}
                        className="select select-bordered"
                        required
                    >
                        <option value="" disabled>เลือกประเภทสนาม</option>
                        <option value="7 คน">7 คน</option>
                        <option value="11 คน">11 คน</option>
                    </select>
                    <input
                        type="number"
                        placeholder="ราคา/ชั่วโมง"
                        value={newPitch.hourlyRate}
                        onChange={(e) => setNewPitch({ ...newPitch, hourlyRate: e.target.value.replace(/\D/, '') })}
                        className="input input-bordered"
                        required
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={newPitch.status}
                            onChange={(e) => setNewPitch({ ...newPitch, status: e.target.checked })}
                            className="toggle"
                        />
                        <span>เปิดใช้งาน</span>
                    </div>
                    <button type="submit" className="btn btn-primary">สร้างสนาม</button>
                </form>
            )}

            {/* ฟอร์มแก้ไขสนาม */}
            {editPitchId && (
                <form onSubmit={handleEditPitch} className="flex flex-col gap-2 p-4 bg-base-100 rounded">
                    <input
                        type="text"
                        placeholder="ชื่อสนาม"
                        value={editPitchData.name}
                        onChange={(e) => setEditPitchData({ ...editPitchData, name: e.target.value })}
                        className="input input-bordered"
                        required
                    />
                    <select
                        value={editPitchData.type}
                        onChange={(e) => setEditPitchData({ ...editPitchData, type: e.target.value })}
                        className="select select-bordered"
                        required
                    >
                        <option value="" disabled>เลือกประเภทสนาม</option>
                        <option value="7 คน">7 คน</option>
                        <option value="11 คน">11 คน</option>
                    </select>
                    <input
                        type="number"
                        placeholder="ราคา/ชั่วโมง"
                        value={editPitchData.hourlyRate}
                        onChange={(e) => setEditPitchData({ ...editPitchData, hourlyRate: e.target.value.replace(/\D/, '') })}
                        className="input input-bordered"
                        required
                    />
                    <div className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={editPitchData.status}
                            onChange={(e) => setEditPitchData({ ...editPitchData, status: e.target.checked })}
                            className="toggle"
                        />
                        <span>เปิดใช้งาน</span>
                    </div>
                    <button type="submit" className="btn btn-primary">บันทึกการแก้ไข</button>
                    <button type="button" className="btn btn-ghost" onClick={() => setEditPitchId(null)}>ยกเลิก</button>
                </form>
            )}

            {/* ตารางสนาม */}
            <div className="flex flex-col p-8 bg-base-100 rounded-xl">
                <h1 className="text-m font-bold">รายการสนามทั้งหมด</h1>
                <p className="text-m opacity-55">
                    จำนวนสนามทั้งหมด: {pitches.length} สนาม (เปิดใช้งาน: {pitches.filter(p => p.status).length})
                </p>

                <div className="flex justify-between pt-4 px-4 font-bold">
                    <div className="w-1/4">ชื่อสนาม</div>
                    <div className="w-1/4">ประเภท</div>
                    <div className="w-1/4">ราคา (บาท/ชั่วโมง)</div>
                    <div className="w-1/4">สถานะ</div>
                    <div className="w-1/4">การจัดการ</div>
                </div>

                {pitches.map((pitch) => (
                    <React.Fragment key={pitch.id}>
                        <div className="flex justify-between pt-4 px-4 items-center">
                            <div className="w-1/4">{pitch.name}</div>
                            <div className="w-1/4">{pitch.type}</div>
                            <div className="w-1/4">{pitch.hourlyRate}</div>
                            <div className="w-1/4">
                                <input
                                    type="checkbox"
                                    className="toggle"
                                    checked={pitch.status}
                                    onChange={() => toggleStatus(pitch.id, pitch.status)}
                                />
                            </div>
                            <div className="w-1/4 flex gap-2">
                                <button
                                    className="btn"
                                    onClick={() => {
                                        setEditPitchId(pitch.id);
                                        setEditPitchData({ ...pitch });
                                        setShowForm(false);
                                    }}
                                >
                                    แก้ไข
                                </button>
                                <button
                                    className="btn btn-error text-white"
                                    onClick={() => deletePitch(pitch.id)}
                                >
                                    ลบ
                                </button>
                            </div>
                        </div>
                        <div className="divider mt-0"></div>
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
}

export default PitchManagePage;

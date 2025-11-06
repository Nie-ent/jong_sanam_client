import React from 'react'
import BookingTable from '../../components/FullCalendar'

function DashboardPage() {
    return (
        <div className='w-screen flex flex-col gap-4 m-8'>
            <h1 className='text-2xl font-bold'>ตารางการจอง</h1>
            <p className='text-sm'>ดูแลจัดการการจองสนามฟุตบอล</p>
            <div className="flex gap-4">
                <label className="input">
                    <span className="label">Filter date</span>
                    <input type="date" />
                </label>
                <label className="select">
                    <span className="label">Pitch</span>
                    <select>
                        <option value="" selected disabled>เลือกสนาม</option>
                        <option value="A" >สนาม A</option>
                        <option value="B">สนาม B</option>
                        <option value="C">สนาม C</option>
                    </select>

                </label>
            </div>
            <BookingTable />
        </div>
    )
}

export default DashboardPage
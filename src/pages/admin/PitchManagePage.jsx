import React from 'react'

function PitchManagePage() {
    return (
        <div className='flex flex-col p-8 gap-y-8 bg-base-200'>
            <div className="flex min-w-270 justify-between">
                <div className="flex flex-col">
                    <h3 className='text-2xl font-bold'>จัดการสนาม</h3>
                    <p className='text-xl opacity-55'>เพิ่ม แก้ไข ลบ และเปิด/ปิดการใช้งานสนาม</p>
                </div>
                <div className="btn btn-accent">+ เพิ่มสนาม</div>
            </div>
            <div className="flex flex-col p-8 bg-base-100 rounded-xl">
                <h1 className='text-m font-bold'>รายการสนามทั้งหมด</h1>
                <p className='text-m opacity-55'>จำนวนสนามทั้งหมด: 3 สนาม (เปิดใช้งาน: 2)</p>
                <div className="flex flex-col">
                    <div className="flex justify-between pt-4 px-4">
                        <div className="">ชื่อสนาม</div>
                        <div className="">ประเภท</div>
                        <div className="">ราคา (บาท/ชั่วโมง)</div>
                        <div className="mr-10">สถานะ</div>
                        <div className="">การจัดการ</div>
                    </div>
                    <div className="divider mt-0"></div>
                    <div className="flex justify-between pt-4 px-4">
                        <div className="">สนาม A</div>
                        <div className="">ฟุตบอล 7 คน</div>
                        <div className="">1,500 (บาท/ชั่วโมง)</div>
                        <div className="">
                            <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex gap-2">
                            <button className='btn'>แก้ไข</button>
                            <button className='btn btn-error text-white'>ลบ</button>
                        </div>
                    </div>
                    <div className="divider mt-0"></div>
                    <div className="flex justify-between pt-4 px-4">
                        <div className="">สนาม B</div>
                        <div className="">ฟุตบอล 7 คน</div>
                        <div className="">1,500 (บาท/ชั่วโมง)</div>
                        <div className="">
                            <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex gap-2">
                            <button className='btn'>แก้ไข</button>
                            <button className='btn btn-error text-white'>ลบ</button>
                        </div>

                    </div>
                    <div className="divider mt-0"></div>
                    <div className="flex justify-between pt-4 px-4">
                        <div className="">สนาม C</div>
                        <div className="">ฟุตบอล 11 คน</div>
                        <div className="">2,500 (บาท/ชั่วโมง)</div>
                        <div className="">
                            <input type="checkbox" defaultChecked className="toggle" />
                        </div>
                        <div className="flex gap-2">
                            <button className='btn'>แก้ไข</button>
                            <button className='btn btn-error text-white'>ลบ</button>
                        </div>
                    </div>
                    <div className="divider mt-0"></div>
                </div>
            </div>
        </div>
    )
}

export default PitchManagePage
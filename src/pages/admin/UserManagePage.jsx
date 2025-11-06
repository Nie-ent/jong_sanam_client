
function UserManagePage() {
    return (
        <div className='flex flex-col p-8 gap-y-8 bg-base-200 w-full'>
            <div className="flex flex-col">
                <h3 className='text-2xl font-bold'>จัดการผู้ใช้</h3>
                <p className='text-xl opacity-55'>ดูรายชื่อลูกค้าที่ลงทะเบียนในระบบ</p>
            </div>
            <div className="flex flex-col p-8 bg-base-100 rounded-xl ">
                <div className="flex justify-between">
                    <div className="flex flex-col">
                        <h1 className='text-m font-bold'>รายชื่อผู้ใช้ทั้งหมด</h1>
                        <p className='text-m opacity-55'>จำนวนผู้ใช้ทั้งหมด: 5 คน</p>
                    </div>
                    <input type="text" placeholder="ค้นหาชื่อ, เบอร์โทร, LINE ID..." className="input" />
                </div>
                <div className="flex flex-col">
                    <div className="flex justify-between pt-4 px-4">
                        <div className="">ชื่อ-นามสกุล</div>
                        <div className="">เบอร์โทรศัพท์</div>
                        <div className="">LINE ID</div>
                        <div className="">วันที่ลงทะเบียน</div>
                        <div className="">จำนวนการจอง</div>
                    </div>
                    <div className="divider my-0"></div>
                    <div className="flex justify-between items-center pt-4 px-4">
                        <div className="">นาย ก ใจดี</div>
                        <div className="">081-234-5678</div>
                        <div className="">@user_a</div>
                        <div className="">15 มกราคม 2568</div>
                        <div className="px-4 items-start">
                            <button className='btn btn-outline '>2 ครั้ง</button>
                        </div>
                    </div>
                    <div className="divider mt-0"></div>
                </div>
            </div>
        </div>
    )
}

export default UserManagePage
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router'
import { adminApi } from '../../config/authApi'
import useAuthStore from '../../stores/authStore'

function LoginPage() {
    const {
        register,
        handleSubmit,
        reset,
        trigger, // สำหรับ trigger validation onBlur
        formState: { errors }
    } = useForm()

    const {
        register: registerKeyForm,
        handleSubmit: handleKeySubmit,
        reset: resetKeyForm,
        trigger: triggerKey,
        formState: { errors: keyErrors }
    } = useForm()

    const login = useAuthStore(state => state.login)
    const navigate = useNavigate()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onSubmit = async (data) => {
        login(data)
        reset()
    }

    const onSubmitKey = async (data) => {
        setIsLoading(true)
        try {
            const response = await adminApi.get(`/keys/admin${data.adminKey}`)
            if (response.data.key) {
                alert('✅ Key ถูกต้อง! กรุณากรอกข้อมูลเพื่อสมัครแอดมินใหม่');
                localStorage.setItem("adminInviteKey", data.adminKey);
                navigate('/register');
            } else {
                alert('❌ Key ไม่ถูกต้อง');
            }
        } catch (error) {
            console.error(error);
            alert('เกิดข้อผิดพลาดระหว่างตรวจสอบ key');
        } finally {
            setIsLoading(false);
            resetKeyForm();
        }
    }

    return (
        <div className='bg-blue-50 w-full min-h-screen flex justify-center items-center'>
            <div className="border rounded-xl w-sm h-fit p-4 bg-white flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Login to Administrator</h1>

                <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Enter email</legend>
                        <input
                            {...register('email', {
                                required: 'กรุณากรอกอีเมล',
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'อีเมลไม่ถูกต้อง' }
                            })}
                            type="text"
                            className="input bg-slate-100 rounded-sm text-center h-10 w-full text-xl"
                            placeholder="email"
                            onBlur={() => trigger('email')} // validate on blur
                        />
                        {errors.email && <span className="text-red-500 text-sm">{errors.email.message}</span>}
                    </fieldset>

                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Enter password</legend>
                        <input
                            {...register('password', {
                                required: 'กรุณากรอกรหัสผ่าน',
                                minLength: { value: 6, message: 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' }
                            })}
                            type="password"
                            className="input bg-slate-100 rounded-sm text-center h-10 w-full text-xl"
                            placeholder="password"
                            onBlur={() => trigger('password')} // validate on blur
                        />
                        {errors.password && <span className="text-red-500 text-sm">{errors.password.message}</span>}
                    </fieldset>

                    <button className="btn btn-primary">Login</button>

                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className='btn btn-ghost text-center opacity-55 cursor-pointer'
                    >
                        register?
                    </button>
                </form>
            </div>

            {/* ---------- Modal ---------- */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-80 flex flex-col gap-4">
                        <h2 className="text-xl font-semibold text-center">Enter Admin Key</h2>

                        <form onSubmit={handleKeySubmit(onSubmitKey)} className="flex flex-col gap-3">
                            <input
                                {...registerKeyForm('adminKey', {
                                    required: 'กรุณากรอก Admin Key',
                                    minLength: { value: 5, message: 'Key อย่างน้อย 5 ตัวอักษร' }
                                })}
                                type="text"
                                placeholder="Your admin key"
                                className="input bg-slate-100 rounded-md text-center h-10 text-lg"
                                onBlur={() => triggerKey('adminKey')} // validate on blur
                            />
                            {keyErrors.adminKey && <span className="text-red-500 text-sm">{keyErrors.adminKey.message}</span>}

                            <div className="flex gap-2 mt-2">
                                <button type="submit" className="btn btn-primary flex-1">
                                    {isLoading ? 'Loading...' : 'Confirm'}
                                </button>
                                <button
                                    type="button"
                                    className="btn btn-ghost flex-1"
                                    onClick={() => setIsModalOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}

export default LoginPage

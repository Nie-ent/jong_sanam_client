import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useSearchParams, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { adminApi } from "../../config/authApi";

export default function RegisterPage() {
    const [isValidKey, setIsValidKey] = useState(null); // null = loading
    const [searchParams] = useSearchParams();
    const inviteKey = searchParams.get("key");
    const navigate = useNavigate(); // <-- ใช้ navigate

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        const checkKey = async () => {
            if (!inviteKey) {
                setIsValidKey(false);
                return;
            }

            try {
                const res = await axios.post("/api/keys", { key: inviteKey });
                setIsValidKey(res.data.valid);
            } catch (err) {
                setIsValidKey(false);
            }
        };
        checkKey();
    }, [inviteKey]);

    const onSubmit = async (data) => {
        try {
            const res = await adminApi.post('/keys/admin', data);
            alert("สร้าง Admin สำเร็จ!");
            reset();
            navigate('/'); // <-- navigate ไปหน้า login หลังสร้างสำเร็จ
        } catch (err) {
            alert(err.response?.data?.message || "เกิดข้อผิดพลาด");
        }
    };

    if (isValidKey === null) return <p>Loading...</p>;

    // key ไม่ valid → redirect (ถ้าต้องการ)
    // if (!isValidKey) return <Navigate to="/" replace />;

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="card w-full max-w-md shadow-lg bg-white p-8">
                <h2 className="text-2xl font-bold mb-6 text-center">สร้าง Admin ใหม่</h2>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Email */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input
                            type="email"
                            placeholder="example@email.com"
                            className="input input-bordered w-full"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^\S+@\S+$/i,
                                    message: "Email format is invalid",
                                },
                            })}
                        />
                        {errors.email && (
                            <span className="text-red-500 text-sm">{errors.email.message}</span>
                        )}
                    </div>

                    {/* Password */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <input
                            type="password"
                            placeholder="********"
                            className="input input-bordered w-full"
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Password must be at least 6 chars" },
                            })}
                        />
                        {errors.password && (
                            <span className="text-red-500 text-sm">{errors.password.message}</span>
                        )}
                    </div>

                    {/* First Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">First Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="John"
                            className="input input-bordered w-full"
                            {...register("firstName", { required: "First name is required" })}
                        />
                        {errors.firstName && (
                            <span className="text-red-500 text-sm">{errors.firstName.message}</span>
                        )}
                    </div>

                    {/* Last Name */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Last Name</span>
                        </label>
                        <input
                            type="text"
                            placeholder="Doe"
                            className="input input-bordered w-full"
                            {...register("lastName", { required: "Last name is required" })}
                        />
                        {errors.lastName && (
                            <span className="text-red-500 text-sm">{errors.lastName.message}</span>
                        )}
                    </div>

                    {/* Phone Number */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Phone Number</span>
                        </label>
                        <input
                            type="tel"
                            placeholder="0812345678"
                            className="input input-bordered w-full"
                            {...register("phoneNumber", {
                                required: "Phone number is required",
                                pattern: {
                                    value: /^[0-9]{9,10}$/,
                                    message: "Phone number format is invalid",
                                },
                            })}
                        />
                        {errors.phoneNumber && (
                            <span className="text-red-500 text-sm">{errors.phoneNumber.message}</span>
                        )}
                    </div>

                    {/* Role */}
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Role</span>
                        </label>
                        <select
                            className="select select-bordered w-full"
                            {...register("role", { required: "Role is required" })}
                        >
                            <option value="STAFF" defaultChecked>
                                STAFF
                            </option>
                            <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                        </select>
                        {errors.role && (
                            <span className="text-red-500 text-sm">{errors.role.message}</span>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`btn btn-primary w-full mt-4 ${isSubmitting ? "loading" : ""}`}
                        disabled={isSubmitting}
                    >
                        สร้าง Admin
                    </button>
                </form>
            </div>
        </div>
    );
}

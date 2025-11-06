import { NavLink } from 'react-router'
import { useForm } from 'react-hook-form'
import useAuthStore from '../../stores/authStore';

function LoginPage() {
    const { register, handleSubmit, reset } = useForm()
    const login = useAuthStore(state => state.login)

    const onSubmit = async (data) => {
        console.log("Form data submitted:", data);
        await new Promise(resolve => setTimeout(resolve, 1000))

        login(data)

        reset();
    };

    return (
        <div className='bg-blue-50 w-full min-h-screen flex justify-center items-center'>
            <div className="border rounded-xl w-sm h-fit p-4 bg-white flex flex-col gap-4">
                <h1 className="text-2xl font-bold">Login to Administrator</h1>
                <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Enter email</legend>
                        <input {...register('email')} type="text" className="input bg-slate-100 rounded-sm text-center h-10 w-full text-xl" placeholder="email" />
                    </fieldset>
                    <fieldset className="fieldset">
                        <legend className="fieldset-legend text-sm">Enter password</legend>
                        <input {...register('password')} type="text" className="input bg-slate-100 rounded-sm text-center h-10 w-full text-xl" placeholder="password" />
                    </fieldset>
                    <button className="btn btn-primary">Login</button>
                    <NavLink to='/register' className='btn btn-ghost text-center opacity-55 cursor-pointer'>register?</NavLink>
                </form>
            </div>
        </div>
    )
}

export default LoginPage
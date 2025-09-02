import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import "../../styles/forms.scss"

const registerSchema = z.object({
    email: z.string().email("Podaj poprawny adres e-mail"),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być identyczne",
    path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function Register() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = (data: RegisterFormData) => {
        console.log("Register data:", data)

    }

    return (
        <div className="form-wrapper">
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="form">
                <input
                    type="email"
                    placeholder="E-mail"
                    {...register("email")}
                />
                {errors.email && <p className="error">{errors.email.message}</p>}

                <input
                    type="password"
                    placeholder="Hasło"
                    {...register("password")}
                />
                {errors.password && <p className="error">{errors.password.message}</p>}

                <input
                    type="password"
                    placeholder="Powtórz hasło"
                    {...register("confirmPassword")}
                />
                {errors.confirmPassword && (
                    <p className="error">{errors.confirmPassword.message}</p>
                )}

                <button type="submit">Zarejestruj się</button>
            </form>
        </div>
    )
}

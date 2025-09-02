"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { InputWithEndIcon } from "@/components/ui/input-with-end-icon"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

const loginSchema = z.object({
    email: z.string().email("Podaj poprawny adres e-mail"),
    password: z.string().min(6, "Hasło musi mieć co najmniej 6 znaków"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    const onSubmit = (data: LoginFormData) => {
        console.log("Login data:", data)
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-muted">
            <Card className="w-full max-w-md shadow-lg">
                <CardHeader>
                    <CardTitle className="text-center text-xl font-semibold">
                        Logowanie
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Email */}
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="email">E-mail</Label>
                            <InputWithEndIcon
                                id="email"
                                type="email"
                                placeholder="Podaj swój adres e-mail"

                                {...register("email")}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">
                                    {errors.email.message}
                                </p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col space-y-1">
                            <Label htmlFor="password">Hasło</Label>
                            <InputWithEndIcon
                                id="password"
                                type="password"
                                placeholder="Wpisz hasło"
                                {...register("password")}
                            />
                            {errors.password && (
                                <p className="text-sm text-red-500">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Submit */}
                        <Button type="submit" className="w-full">
                            Zaloguj się
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}

import { forwardRef } from "react"
import { MailIcon, AlertCircle } from "lucide-react"
import { Input } from "@/components/ui/input"

type InputWithEndIconProps = React.ComponentPropsWithoutRef<"input"> & {
    icon?: React.ReactNode
    error?: string
}

const InputWithEndIcon = forwardRef<HTMLInputElement, InputWithEndIconProps>(
    (
        { className, type, placeholder, icon = <MailIcon size={16} aria-hidden="true" />, error, ...props },
        ref
    ) => {
        return (
            <div className="w-full">
                <div className="relative">
                    <Input
                        ref={ref}
                        type={type}
                        placeholder={placeholder}
                        className={`peer pe-9 ${
                            error ? "border-red-500 focus-visible:ring-red-500" : ""
                        } ${className ?? ""}`}
                        {...props}
                    />
                    <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 peer-disabled:opacity-50">
                        {error ? <AlertCircle size={16} className="text-red-500" aria-hidden="true" /> : icon}
                    </div>
                </div>
                {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
            </div>
        )
    }
)

InputWithEndIcon.displayName = "InputWithEndIcon"

export { InputWithEndIcon }

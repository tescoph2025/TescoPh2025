import * as React from "react"

import { cn } from "@/lib/utils"
import { Eye, EyeOff } from "lucide-react"

function InputPassword({ className, type, ...props }: React.ComponentProps<"input">) {
  const [eye, setEye] = React.useState(true)
  return (
    <div className="relative">

    <input
      type={eye ? 'password' : 'text'}
      data-slot="input"
      className={cn(
        "border-input file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      
      {...props}
      />
      <div  className="absolute top-2 right-2 cursor-pointer text-gray-600" onClick={() => setEye(prev => !prev)}>
        
      {
        eye ? <>
        
        <Eye/>
        </>:
        <>
      <EyeOff />
        </>
      }
      </div>
      </div>
  )
}

export { InputPassword }

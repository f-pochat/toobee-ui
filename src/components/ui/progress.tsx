import * as React from "react"
import * as ProgressPrimitives from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

interface ProgressProps extends Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitives.Root>, "onChange"> {
  value: number
  onChange?: (value: number) => void
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitives.Root>,
  ProgressProps
>(({ className, value, onChange, ...props }, ref) => {
  const progressRef = React.useRef<HTMLDivElement>(null)
  const [internalValue, setInternalValue] = React.useState(value)

  React.useEffect(() => {
    setInternalValue(value)
  }, [value])

  const handleMouseDown = (event: React.MouseEvent) => {
    if (!progressRef.current || !onChange) return

    const updateProgress = (event: MouseEvent) => {
      if (!progressRef.current) return
      const rect = progressRef.current.getBoundingClientRect()
      let newProgress = ((event.clientX - rect.left) / rect.width) * 100
      newProgress = Math.max(0, Math.min(100, newProgress))
      setInternalValue(newProgress)
      onChange(newProgress)
    }

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", updateProgress)
      window.removeEventListener("mouseup", handleMouseUp)
    }

    window.addEventListener("mousemove", updateProgress)
    window.addEventListener("mouseup", handleMouseUp)

    updateProgress(event.nativeEvent)
  }

  return (
    <div
      ref={progressRef}
      className={cn("relative h-3 w-full cursor-pointer overflow-hidden rounded-full bg-secondary", className)}
      onMouseDown={handleMouseDown}
    >
      <div
        className="absolute left-0 top-0 h-full bg-primary transition-transform duration-300"
        style={{ width: `${internalValue}%` }}
      />

      <ProgressPrimitives.Root ref={ref} value={internalValue} {...props}>
        <ProgressPrimitives.Indicator
          className="h-full bg-primary transition-transform duration-300"
          style={{ transform: `translateX(-${100 - internalValue}%)` }}
        />
      </ProgressPrimitives.Root>

      <div
        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-primary-foreground shadow-md"
        style={{
          left: `calc(${internalValue}% - 8px)`,
          width: "16px",
          height: "16px",
        }}
      />
    </div>
  )
})

Progress.displayName = "Progress"

export { Progress }
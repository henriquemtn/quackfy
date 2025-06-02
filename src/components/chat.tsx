"use client"

import { useEffect, useRef, useCallback } from "react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { Command, SendIcon, LoaderIcon, CheckIcon, CopyIcon, PlusIcon } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import * as React from "react"

interface UseAutoResizeTextareaProps {
    minHeight: number
    maxHeight?: number
}

interface Task {
    id: string
    text: string
    completed: boolean
    category: string
    createdAt: Date
    completedAt?: Date
}

interface TasksByCategory {
    [category: string]: Task[]
}

function useAutoResizeTextarea({ minHeight, maxHeight }: UseAutoResizeTextareaProps) {
    const textareaRef = useRef<HTMLTextAreaElement>(null)

    const adjustHeight = useCallback(
        (reset?: boolean) => {
            const textarea = textareaRef.current
            if (!textarea) return

            if (reset) {
                textarea.style.height = `${minHeight}px`
                return
            }

            textarea.style.height = `${minHeight}px`
            const newHeight = Math.max(minHeight, Math.min(textarea.scrollHeight, maxHeight ?? Number.POSITIVE_INFINITY))

            textarea.style.height = `${newHeight}px`
        },
        [minHeight, maxHeight],
    )

    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = `${minHeight}px`
        }
    }, [minHeight])

    useEffect(() => {
        const handleResize = () => adjustHeight()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [adjustHeight])

    return { textareaRef, adjustHeight }
}

interface CommandSuggestion {
    icon: React.ReactNode
    label: string
    description: string
    prefix: string
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
    containerClassName?: string
    showRing?: boolean
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ className, containerClassName, showRing = true, ...props }, ref) => {
        const [isFocused, setIsFocused] = React.useState(false)

        return (
            <div className={cn("relative", containerClassName)}>
                <textarea
                    className={cn(
                        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm",
                        "transition-all duration-200 ease-in-out",
                        "placeholder:text-muted-foreground",
                        "disabled:cursor-not-allowed disabled:opacity-50",
                        showRing ? "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0" : "",
                        className,
                    )}
                    ref={ref}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    {...props}
                />

                {showRing && isFocused && (
                    <motion.span
                        className="absolute inset-0 rounded-md pointer-events-none ring-2 ring-offset-0 ring-violet-500/30"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    />
                )}
            </div>
        )
    },
)
Textarea.displayName = "Textarea"

export function AnimatedAIChat() {
    const [value, setValue] = useState("")
    const [tasks, setTasks] = useState<Task[]>([])
    const [isProcessing, setIsProcessing] = useState(false)
    const [activeSuggestion, setActiveSuggestion] = useState<number>(-1)
    const [showCommandPalette, setShowCommandPalette] = useState(false)
    const [recentCommand, setRecentCommand] = useState<string | null>(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [showTasks, setShowTasks] = useState(false)
    const { textareaRef, adjustHeight } = useAutoResizeTextarea({
        minHeight: 60,
        maxHeight: 200,
    })
    const [inputFocused, setInputFocused] = useState(false)
    const commandPaletteRef = useRef<HTMLDivElement>(null)

    const [isWorking, setIsWorking] = useState(false)

    const commandSuggestions: CommandSuggestion[] = [
        {
            icon: <PlusIcon className="w-4 h-4" />,
            label: "Add Task",
            description: "Add a new task to a category",
            prefix: "/add",
        },
        {
            icon: <CheckIcon className="w-4 h-4" />,
            label: "Show Tasks",
            description: "View all your tasks",
            prefix: "/tasks",
        },
        {
            icon: <CopyIcon className="w-4 h-4" />,
            label: "Copy Tasks",
            description: "Copy tasks formatted for WhatsApp",
            prefix: "/copy",
        },
    ]

    // Load tasks from localStorage on mount
    useEffect(() => {
        const savedTasks = localStorage.getItem("tasks")
        if (savedTasks) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            const parsedTasks = JSON.parse(savedTasks).map((task: any) => ({
                ...task,
                createdAt: new Date(task.createdAt),
            }))
            setTasks(parsedTasks)
        }
    }, [])

    // Load work status from localStorage
    useEffect(() => {
        const savedWorkStatus = localStorage.getItem("isWorking")
        if (savedWorkStatus === "true") {
            setIsWorking(true)
        }
    }, [])

    // Save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    // Save work status to localStorage
    useEffect(() => {
        localStorage.setItem("isWorking", isWorking.toString())
    }, [isWorking])

    useEffect(() => {
        if (value.startsWith("/") && !value.includes(" ")) {
            setShowCommandPalette(true)

            const matchingSuggestionIndex = commandSuggestions.findIndex((cmd) => cmd.prefix.startsWith(value))

            if (matchingSuggestionIndex >= 0) {
                setActiveSuggestion(matchingSuggestionIndex)
            } else {
                setActiveSuggestion(-1)
            }
        } else {
            setShowCommandPalette(false)
        }
    }, [value])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => {
            window.removeEventListener("mousemove", handleMouseMove)
        }
    }, [])

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node
            const commandButton = document.querySelector("[data-command-button]")

            if (
                commandPaletteRef.current &&
                !commandPaletteRef.current.contains(target) &&
                !commandButton?.contains(target)
            ) {
                setShowCommandPalette(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])

    const processCommand = (input: string) => {
        const trimmedInput = input.trim()

        if (trimmedInput.startsWith("/add ")) {
            const content = trimmedInput.substring(5) // Remove '/add '
            const parts = content.split(" - ")

            if (parts.length >= 2) {
                const category = parts[0].trim()
                const taskText = parts.slice(1).join(" - ").trim()

                const newTask: Task = {
                    id: Date.now().toString(),
                    text: taskText,
                    completed: false,
                    category: category,
                    createdAt: new Date(),
                }

                setTasks((prev) => [...prev, newTask])
                return `Tarefa adicionada em "${category}": ${taskText}`
            } else {
                return "Formato: /add [Categoria] - [Tarefa]"
            }
        }

        if (trimmedInput === "/tasks") {
            setShowTasks(true)
            return "Mostrando suas tarefas"
        }

        if (trimmedInput === "/copy") {
            const formattedText = generateWhatsAppText()
            navigator.clipboard.writeText(formattedText)
            return "Texto copiado para a área de transferência!"
        }

        return "Comando não reconhecido. Use /add, /tasks ou /copy"
    }

    const generateWhatsAppText = () => {
        const tasksByCategory: TasksByCategory = {}

        tasks.forEach((task) => {
            if (!tasksByCategory[task.category]) {
                tasksByCategory[task.category] = []
            }
            tasksByCategory[task.category].push(task)
        })

        let text = ""
        Object.entries(tasksByCategory).forEach(([category, categoryTasks]) => {
            text += `${category}:\n`
            categoryTasks.forEach((task) => {
                const checkmark = task.completed ? " ✅" : ""
                const timeStr = task.completedAt
                    ? ` *${task.completedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}`
                    : ""
                text += `- ${task.text}${timeStr}${checkmark}\n`
            })
            text += "\n"
        })

        return text.trim()
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (showCommandPalette) {
            if (e.key === "ArrowDown") {
                e.preventDefault()
                setActiveSuggestion((prev) => (prev < commandSuggestions.length - 1 ? prev + 1 : 0))
            } else if (e.key === "ArrowUp") {
                e.preventDefault()
                setActiveSuggestion((prev) => (prev > 0 ? prev - 1 : commandSuggestions.length - 1))
            } else if (e.key === "Tab" || e.key === "Enter") {
                e.preventDefault()
                if (activeSuggestion >= 0) {
                    const selectedCommand = commandSuggestions[activeSuggestion]
                    setValue(selectedCommand.prefix + " ")
                    setShowCommandPalette(false)
                }
            } else if (e.key === "Escape") {
                e.preventDefault()
                setShowCommandPalette(false)
            }
        } else if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault()
            if (value.trim()) {
                handleSendMessage()
            }
        }
    }

    const handleSendMessage = () => {
        if (value.trim()) {
            setIsProcessing(true)

            setTimeout(() => {
                const response = processCommand(value)
                setRecentCommand(response)
                setValue("")
                adjustHeight(true)
                setIsProcessing(false)

                setTimeout(() => setRecentCommand(null), 3000)
            }, 500)
        }
    }

    const toggleTaskCompletion = (taskId: string) => {
        setTasks((prev) =>
            prev.map((task) => {
                if (task.id === taskId) {
                    const now = new Date()
                    return {
                        ...task,
                        completed: !task.completed,
                        completedAt: !task.completed ? now : undefined,
                    }
                }
                return task
            }),
        )
    }

    const selectCommandSuggestion = (index: number) => {
        const selectedCommand = commandSuggestions[index]
        setValue(selectedCommand.prefix + " ")
        setShowCommandPalette(false)
    }

    const tasksByCategory: TasksByCategory = {}
    tasks.forEach((task) => {
        if (!tasksByCategory[task.category]) {
            tasksByCategory[task.category] = []
        }
        tasksByCategory[task.category].push(task)
    })

    return (
        <div className="min-h-screen flex flex-col w-full items-center justify-center bg-transparent text-white p-6 relative overflow-hidden">
            <div className="absolute inset-0 w-full h-full overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-violet-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-500/10 rounded-full mix-blend-normal filter blur-[128px] animate-pulse delay-700" />
                <div className="absolute top-1/4 right-1/3 w-64 h-64 bg-fuchsia-500/10 rounded-full mix-blend-normal filter blur-[96px] animate-pulse delay-1000" />
            </div>

            <div className="w-full max-w-4xl mx-auto relative">
                <motion.div
                    className="relative z-10 space-y-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    {!showTasks && (
                        <>
                            <div className="text-center space-y-3">
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    className="inline-block"
                                >
                                    <h1 className="text-3xl font-medium tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white/90 to-white/40 pb-1">
                                        Quackfy - Seu Assistente de Tarefas
                                    </h1>
                                    <motion.div
                                        className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: "100%", opacity: 1 }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                    />
                                </motion.div>
                                <motion.p
                                    className="text-sm text-white/40"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    Digite /add [Categoria] - [Tarefa] para adicionar uma nova tarefa
                                </motion.p>
                            </div>

                            <motion.div
                                className="relative backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] shadow-2xl"
                                initial={{ scale: 0.98 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.1 }}
                            >
                                <AnimatePresence>
                                    {showCommandPalette && (
                                        <motion.div
                                            ref={commandPaletteRef}
                                            className="absolute left-4 right-4 bottom-full mb-2 backdrop-blur-xl bg-black/90 rounded-lg z-50 shadow-lg border border-white/10 overflow-hidden"
                                            initial={{ opacity: 0, y: 5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: 5 }}
                                            transition={{ duration: 0.15 }}
                                        >
                                            <div className="py-1 bg-black/95">
                                                {commandSuggestions.map((suggestion, index) => (
                                                    <motion.div
                                                        key={suggestion.prefix}
                                                        className={cn(
                                                            "flex items-center gap-2 px-3 py-2 text-xs transition-colors cursor-pointer",
                                                            activeSuggestion === index ? "bg-white/10 text-white" : "text-white/70 hover:bg-white/5",
                                                        )}
                                                        onClick={() => selectCommandSuggestion(index)}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: index * 0.03 }}
                                                    >
                                                        <div className="w-5 h-5 flex items-center justify-center text-white/60">
                                                            {suggestion.icon}
                                                        </div>
                                                        <div className="font-medium">{suggestion.label}</div>
                                                        <div className="text-white/40 text-xs ml-1">{suggestion.prefix}</div>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>

                                <div className="p-4">
                                    <Textarea
                                        ref={textareaRef}
                                        value={value}
                                        onChange={(e) => {
                                            setValue(e.target.value)
                                            adjustHeight()
                                        }}
                                        onKeyDown={handleKeyDown}
                                        onFocus={() => setInputFocused(true)}
                                        onBlur={() => setInputFocused(false)}
                                        placeholder="Digite um comando..."
                                        containerClassName="w-full"
                                        className={cn(
                                            "w-full px-4 py-3",
                                            "resize-none",
                                            "bg-transparent",
                                            "border-none",
                                            "text-white/90 text-sm",
                                            "focus:outline-none",
                                            "placeholder:text-white/20",
                                            "min-h-[60px]",
                                        )}
                                        style={{
                                            overflow: "hidden",
                                        }}
                                        showRing={false}
                                    />
                                </div>

                                <div className="p-4 border-t border-white/[0.05] flex items-center justify-between gap-4">
                                    <div className="flex items-center gap-3">
                                        <motion.button
                                            type="button"
                                            data-command-button
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                setShowCommandPalette((prev) => !prev)
                                            }}
                                            whileTap={{ scale: 0.94 }}
                                            className={cn(
                                                "p-2 text-white/40 hover:text-white/90 rounded-lg transition-colors relative group",
                                                showCommandPalette && "bg-white/10 text-white/90",
                                            )}
                                        >
                                            <Command className="w-4 h-4" />
                                        </motion.button>
                                    </div>

                                    <motion.button
                                        type="button"
                                        onClick={handleSendMessage}
                                        whileHover={{ scale: 1.01 }}
                                        whileTap={{ scale: 0.98 }}
                                        disabled={isProcessing || !value.trim()}
                                        className={cn(
                                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                            "flex items-center gap-2",
                                            value.trim()
                                                ? "bg-white text-[#0A0A0B] shadow-lg shadow-white/10"
                                                : "bg-white/[0.05] text-white/40",
                                        )}
                                    >
                                        {isProcessing ? (
                                            <LoaderIcon className="w-4 h-4 animate-[spin_2s_linear_infinite]" />
                                        ) : (
                                            <SendIcon className="w-4 h-4" />
                                        )}
                                        <span>Send</span>
                                    </motion.button>
                                </div>
                            </motion.div>

                            <div className="flex flex-wrap items-center justify-center gap-2">
                                {commandSuggestions.map((suggestion, index) => (
                                    <motion.button
                                        key={suggestion.prefix}
                                        onClick={() => selectCommandSuggestion(index)}
                                        className="flex items-center gap-2 px-3 py-2 bg-white/[0.02] hover:bg-white/[0.05] rounded-lg text-sm text-white/60 hover:text-white/90 transition-all relative group"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        {suggestion.icon}
                                        <span>{suggestion.label}</span>
                                    </motion.button>
                                ))}
                            </div>
                        </>
                    )}

                    {showTasks && (
                        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-medium text-white/90">Suas Tarefas</h2>
                                <div className="flex gap-2">
                                    <motion.button
                                        onClick={() => {
                                            const formattedText = generateWhatsAppText()
                                            navigator.clipboard.writeText(formattedText)
                                            setRecentCommand("Texto copiado!")
                                            setTimeout(() => setRecentCommand(null), 2000)
                                        }}
                                        className="px-3 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg text-sm text-white/70 hover:text-white/90 transition-all flex items-center gap-2"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <CopyIcon className="w-4 h-4" />
                                        Copiar
                                    </motion.button>
                                    <motion.button
                                        onClick={() => setShowTasks(false)}
                                        className="px-3 py-2 bg-white/[0.05] hover:bg-white/[0.1] rounded-lg text-sm text-white/70 hover:text-white/90 transition-all"
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Voltar
                                    </motion.button>
                                </div>
                            </div>

                            {Object.keys(tasksByCategory).length === 0 ? (
                                <div className="text-center py-12 text-white/40">
                                    <p>Nenhuma tarefa encontrada.</p>
                                    <p className="text-sm mt-2">Use /add [Categoria] - [Tarefa] para adicionar uma nova tarefa.</p>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    {Object.entries(tasksByCategory).map(([category, categoryTasks]) => (
                                        <motion.div
                                            key={category}
                                            className="backdrop-blur-2xl bg-white/[0.02] rounded-2xl border border-white/[0.05] p-6"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            <h3 className="text-lg font-medium text-white/90 mb-4">{category}</h3>
                                            <div className="space-y-3">
                                                {categoryTasks.map((task) => (
                                                    <motion.div
                                                        key={task.id}
                                                        className="flex items-center gap-3 p-3 bg-white/[0.02] rounded-lg hover:bg-white/[0.05] transition-colors"
                                                        whileHover={{ scale: 1.01 }}
                                                    >
                                                        <motion.button
                                                            onClick={() => toggleTaskCompletion(task.id)}
                                                            className={cn(
                                                                "w-5 h-5 rounded border-2 flex items-center justify-center transition-all",
                                                                task.completed
                                                                    ? "bg-green-500 border-green-500 text-white"
                                                                    : "border-white/30 hover:border-white/50",
                                                            )}
                                                            whileTap={{ scale: 0.9 }}
                                                        >
                                                            {task.completed && <CheckIcon className="w-3 h-3" />}
                                                        </motion.button>
                                                        <span
                                                            className={cn(
                                                                "flex-1 text-sm",
                                                                task.completed ? "text-white/50 line-through" : "text-white/80",
                                                            )}
                                                        >
                                                            {task.text}
                                                            {task.completedAt && (
                                                                <span className="text-white/40 ml-2">
                                                                    *
                                                                    {task.completedAt.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}
                                                                </span>
                                                            )}
                                                        </span>
                                                    </motion.div>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </motion.div>
                    )}
                </motion.div>
            </div>

            <AnimatePresence>
                {isProcessing && (
                    <motion.div
                        className="fixed bottom-8 left-1/2 mx-auto transform -translate-x-1/2 backdrop-blur-2xl bg-white/[0.02] rounded-full px-4 py-2 shadow-lg border border-white/[0.05]"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-7 rounded-full bg-white/[0.05] flex items-center justify-center text-center">
                                <span className="text-xs font-medium text-white/90 mb-0.5">AI</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-white/70">
                                <span>Processando</span>
                                <TypingDots />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {recentCommand && (
                    <motion.div
                        className="fixed bottom-8 left-1/2 mx-auto transform -translate-x-1/2 backdrop-blur-2xl bg-green-500/10 rounded-lg px-4 py-2 shadow-lg border border-green-500/20"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                    >
                        <div className="text-sm text-green-400">{recentCommand}</div>
                    </motion.div>
                )}
            </AnimatePresence>

            {inputFocused && (
                <motion.div
                    className="fixed w-[50rem] h-[50rem] rounded-full pointer-events-none z-0 opacity-[0.02] bg-gradient-to-r from-violet-500 via-fuchsia-500 to-indigo-500 blur-[96px]"
                    animate={{
                        x: mousePosition.x - 400,
                        y: mousePosition.y - 400,
                    }}
                    transition={{
                        type: "spring",
                        damping: 25,
                        stiffness: 150,
                        mass: 0.5,
                    }}
                />
            )}
        </div>
    )
}

function TypingDots() {
    return (
        <div className="flex items-center ml-1">
            {[1, 2, 3].map((dot) => (
                <motion.div
                    key={dot}
                    className="w-1.5 h-1.5 bg-white/90 rounded-full mx-0.5"
                    initial={{ opacity: 0.3 }}
                    animate={{
                        opacity: [0.3, 0.9, 0.3],
                        scale: [0.85, 1.1, 0.85],
                    }}
                    transition={{
                        duration: 1.2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: dot * 0.15,
                        ease: "easeInOut",
                    }}
                    style={{
                        boxShadow: "0 0 4px rgba(255, 255, 255, 0.3)",
                    }}
                />
            ))}
        </div>
    )
}

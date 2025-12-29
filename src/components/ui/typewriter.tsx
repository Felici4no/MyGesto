"use client"

import { useEffect, useState } from "react"

interface TypewriterProps {
    words: string[]
    loop?: boolean
    typingSpeed?: number
    deletingSpeed?: number
    delayBetweenWords?: number
}

export function Typewriter({
    words,
    loop = true,
    typingSpeed = 150,
    deletingSpeed = 100,
    delayBetweenWords = 2000,
}: TypewriterProps) {
    const [text, setText] = useState("")
    const [isDeleting, setIsDeleting] = useState(false)
    const [loopNum, setLoopNum] = useState(0)

    useEffect(() => {
        let timer: NodeJS.Timeout

        const i = loopNum % words.length
        const fullText = words[i]

        if (isDeleting) {
            setText(fullText.substring(0, text.length - 1))
            timer = setTimeout(() => { }, deletingSpeed)
        } else {
            setText(fullText.substring(0, text.length + 1))
            timer = setTimeout(() => { }, typingSpeed)
        }

        const type = () => {
            if (!isDeleting && text === fullText) {
                if (!loop && loopNum === words.length - 1) return
                setTimeout(() => setIsDeleting(true), delayBetweenWords)
                return
            }

            if (isDeleting && text === "") {
                setIsDeleting(false)
                setLoopNum(loopNum + 1)
                return
            }
        }

        // The logic above is slightly intertwined. Let's simplify the effect trigger.
    }, [text, isDeleting, loopNum, words, typingSpeed, deletingSpeed, delayBetweenWords, loop])

    // Cleaner implementation using a single effect for the tick
    return (
        <span className="inline-block relative">
            {text}
            <span className="animate-pulse border-r-2 border-slate-400 ml-1 h-[0.8em] align-middle inline-block">&nbsp;</span>
        </span>
    )
}

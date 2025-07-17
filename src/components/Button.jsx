import React from 'react'

const Button = ({children, circle = false, color = "blue"}) => {
    const colorClasses = {
        blue: 'bg-[var(--color-blue)] border border-[var(--color-blue)]',
        green: 'bg-[var(--color-green)] border border-[var(--color-green)]',
        red: 'bg-[var(--color-red)] border border-[var(--color-red)]',
    };
    return (
        <button className={`${colorClasses[color] || colorClasses['blue']} font-bold ${circle ? "rounded-full p-2" : "rounded py-2 px-4"} hover:opacity-90 transition duration-200 cursor-pointer`}>
            {children}
        </button>
  )
}

const ButtonOutline = ({children, circle = false}) => {
    return (
        <button className={`border border-[var(--color-blue-light)] font-bold ${circle ? "rounded-full p-2" : "rounded py-2 px-4"} hover:bg-[var(--color-lightgray)] hover:text-[var(--color-blue)] hover:border-[var(--color-lightgray)] transition duration-200 cursor-pointer`}>
            {children}
        </button>
  )
}

const ButtonGradient = ({children, circle = false}) => {
    return (
        <button className={`bg-gradient-to-tr from-[var(--color-blue)] to-[var(--color-green)] text-white font-bold ${circle ? "rounded-full p-2" : "rounded py-2 px-4"} hover:opacity-90  transition duration-200 cursor-pointer`}>
            {children}
        </button>
  )
}

export {
    Button,
    ButtonOutline,
    ButtonGradient
}
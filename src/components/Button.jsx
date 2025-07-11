import React from 'react'

const ButtonGradient = ({children, circle = false}) => {
    return (
        <button className={`bg-gradient-to-r from-purple-600 to-pink-600 text-white ${circle ? "rounded-full p-2" : "rounded py-2 px-4"} hover:from-purple-700 hover:to-pink-700 transition duration-200 cursor-pointer`}>
            {children}
        </button>
  )
}

const ButtonOutline = ({children, color}) => {
    const colorClasses = {
        default: 'text-gray-900 hover:bg-gray-100',
        purple: 'border border-purple-200 text-purple-600 hover:bg-purple-50',
        green: 'border border-green-200 text-green-700 hover:bg-green-50',
        red: 'border border-red-200 text-red-400 hover:bg-red-50',
        blue: 'border border-blue-200 text-blue-800 hover:bg-blue-50',
        yellow: 'border border-yellow-200 text-yellow-700 hover:bg-yellow-50',
    }
    return (
        <button className={`${colorClasses[color] || colorClasses.default} py-2 px-4 rounded transition duration-200 cursor-pointer`}>
            {children}
        </button>
  )
}

export {
    ButtonGradient,
    ButtonOutline
}
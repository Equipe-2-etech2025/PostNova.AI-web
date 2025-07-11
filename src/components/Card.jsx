import React from 'react'

const Card = ({ children, shadow = 1, hoverShadow = false }) => {
    // shadow: 0 = no shadow, 1 = light shadow, 2 = medium shadow, 3 = heavy shadow
    const shadowClasses = [
        'shadow-none',
        'shadow-sm',
        'shadow-md',
        'shadow-lg'
    ];
    shadow = shadow < 0 || shadow >= shadowClasses.length ? 1 : shadow;

    return (
        <div className={`border border-gray-100 rounded-3xl text-start ${shadowClasses[shadow]} backdrop-blur-sm p-5 ${hoverShadow && "hover:shadow-lg transition duration-200"}`}>
            {children}
        </div>
    )
}

export {
    Card
}
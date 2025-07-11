import React from 'react'
import { InputPrompt } from '../../components/Input'

const Hero = () => {
    return (
        <div className="container flex flex-col items-center justify-center h-screen mx-auto">
            <h1 className="w-3/4 text-7xl text-center font-bold mb-4">
                Transformez une <span className="text-[var(--color-blue)]">idée</span> en <span className="text-[var(--color-blue)]">campagne</span> complète
            </h1>
            <p className="text-xl text-center mb-8">Une idée ? L’IA la transforme en campagne complète.</p>
            <div className="w-3/4 mt-8">
                <InputPrompt placeholder="Demander à PostNova de générer ..." />
            </div>
        </div>
    )
}


const Home = () => {
    return (
        <>
            <Hero />
        </>
    )
}

export default Home
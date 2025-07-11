import React from 'react'
import { InputPrompt } from '../../components/Input'

const Hero = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-linear-to-tl from-purple-50 via-pink-50 to-purple-50 px-50">
            <h1 className="text-7xl text-center font-bold mb-4">Créez un POST, inNOVAnt</h1>
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
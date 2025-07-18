import React from 'react'
import { InputPrompt } from '../../components/Input'
import { Card } from '../../components/Card'
import { BsCheck, BsX } from 'react-icons/bs'
import { Button } from '../../components/Button'
import NavBar from '../../components/NavBar'

const Home = () => {
    return (
        <>
        <NavBar />
            <section className="relative h-screen">
                <div className="absolute bottom-10 w-full h-1/2 -z-10">
                    <div className="h-full bg-radial from-[var(--color-blue)] to-black opacity-75"></div>
                </div>
                <div className="absolute bottom-0 w-full h-1/2 -z-10">
                    <div className="h-full bg-radial from-[var(--color-green)] to-black opacity-25"></div>
                </div>
                <div className="container flex flex-col items-center justify-center h-full mx-auto">
                    <h1 className="w-3/4 text-6xl text-center font-bold mb-4">
                        Transformez une <span className="text-[var(--color-blue)]">idée</span> en <span className="text-[var(--color-blue)]">campagne</span> complète
                    </h1>
                    <p className="text-xl text-center mb-8">Une idée ? L’IA la transforme en campagne complète.</p>
                    <div className="w-2/3 mt-8">
                        <InputPrompt placeholder="Demander à PostNova de générer ..." />
                    </div>
                </div>
            </section>
            <section className="py-32">
                <div className="container mx-auto text-center">
                    <div className="mb-4">
                        <h2 className="text-5xl font-bold mb-4">Nos Services</h2>
                        <p className="text-lg text-[var(--color-lightgray)] mb-12">De la création de contenu à la gestion de campagnes, nous avons tout ce qu'il vous faut.</p>
                    </div>
                    <div className="grid grid-cols-3 gap-8">
                        <Card styles={"p-8"}>
                            <h3 className="text-6xl font-bold mb-1">P</h3>
                            <h4 className="text-2xl font-bold mb-3">
                                Publication sur les réseaux
                            </h4>
                            <p>
                                Publiez du contenu engageant sur les réseaux sociaux avec l'aide de l'IA.
                            </p>
                        </Card>
                        <Card styles={"p-8"}>
                            <h3 className="text-6xl font-bold mb-1">I</h3>
                            <h4 className="text-2xl font-bold mb-3">
                                Image
                            </h4>
                            <p>
                                Créez des images captivantes pour vos campagnes marketing.
                            </p>
                        </Card>
                        <Card styles={"p-8"}>
                            <h3 className="text-6xl font-bold mb-1">I</h3>
                            <h4 className="text-2xl font-bold mb-3">
                                Landing page
                            </h4>
                            <p>
                                Concevez des pages d'atterrissage optimisées pour convertir vos visiteurs en clients.
                            </p>
                        </Card>
                    </div>
                </div>
            </section>
            <section className="py-32">
                <div className="container mx-auto">
                    <div className="text-center mb-4">
                        <h2 className="text-5xl font-bold mb-4">Contenu Populaire</h2>
                        <p className="text-lg text-[var(--color-lightgray)] mb-12">Plongez dans les tendances actuelles et découvrez le contenu qui fait le buzz.</p>
                    </div>
                    <div className="bg-[var(--color-darkgray)] border border-blue-50/10 flex rounded-4xl overflow-hidden">
                        <div className="flex-1/2 bg-[var(--color-blue)]"></div>
                        <div className="flex-1/2 flex flex-col gap-8 shadow-lg p-24 z-10">
                            <div>
                                <h3 className="text-4xl font-bold mb-2">Lorem ipsum</h3>
                                <strong className="text-xl">Landing page - <i>ITem</i></strong>
                                <p className="mt-8">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero repudiandae veritatis nihil esse culpa quod, consectetur voluptas, voluptates animi qui nisi fugiat officia ratione delectus! Facilis fuga deleniti voluptas quae!
                                </p>
                            </div>
                            <div className="flex items-center gap-3 mt-8">
                                <div className="flex-1/2 flex flex-col items-center">
                                    <strong className="text-5xl">140</strong>
                                    <span className="text-center">J'aime</span>
                                </div>
                                <div className="flex-1/2 flex flex-col items-center">
                                    <strong className="text-5xl">45</strong>
                                    <span className="text-center">Temps de génération en seconde</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="py-32">
                <div className="container mx-auto text-center">
                    <h2 className="text-5xl font-bold mb-4">Nos Offres</h2>
                    <p className="text-lg text-[var(--color-lightgray)] mb-12">Découvrez nos offres adaptées à vos besoins.</p>
                    <div className="flex items-center justify-center gap-8 text-start">
                        <div className="w-1/3 bg-[var(--color-darkgray)] rounded-[3em] p-12">
                            <h3 className="text-4xl mb-3"><strong>Plan gratuit</strong></h3>
                            <strong className="text-lg">$0 / mois</strong>
                            <hr className="w-1/3 border-blue-50/25 m-auto my-5" />
                            <div className="flex flex-col gap-2">
                                <div className="flex items-start gap-2">
                                    <BsCheck size={24} color={"var(--color-green)"} />
                                    <p>Lorem ipsum dolor sit amet consectetur.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BsCheck size={24} color={"var(--color-green)"} />
                                    <p>Lorem ipsum.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BsX size={24} color={"var(--color-red)"} />
                                    <p>Lorem ipsum ornare.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BsX size={24} color={"var(--color-red)"} />
                                    <p>Lorem ipsum egestas quis.</p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <BsX size={24} color={"var(--color-red)"} />
                                    <p>Lorem ipsum fames condimentum.</p>
                                </div>
                            </div>
                            <div className="text-center mt-8">
                                <Button>Tester gratuitement</Button>
                            </div>
                        </div>
                        <div className="relative w-1/3 rounded-[3em] overflow-hidden">
                            <div className="absolute w-full h-full bg-linear-to-tr from-[var(--color-blue)] to-[var(--color-green)] opacity-50 -z-10"></div>
                            <div className="absolute w-full h-full bg-[var(--color-blue)] -z-20"></div>
                            <div className="p-12">
                                <h3 className="text-4xl mb-3"><strong>Professionnel</strong></h3>
                                <strong className="text-lg">$14.99 / mois</strong>
                                <hr className="w-1/3 border-blue-50/25 m-auto my-5" />
                                <div className="flex flex-col gap-2">
                                    <div className="flex items-start gap-2">
                                        <BsCheck size={24} color={"var(--color-green)"} />
                                        <p>Lorem ipsum dolor sit amet consectetur.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <BsCheck size={24} color={"var(--color-green)"} />
                                        <p>Lorem ipsum.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <BsCheck size={24} color={"var(--color-green)"} />
                                        <p>Lorem ipsum ornare.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <BsCheck size={24} color={"var(--color-green)"} />
                                        <p>Lorem ipsum egestas quis.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <BsCheck size={24} color={"var(--color-green)"} />
                                        <p>Lorem ipsum fames condimentum.</p>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <BsCheck size={24} color={"var(--color-green)"} />
                                        <p>Sit amet consectetur.</p>
                                    </div>
                                </div>
                                <div className="text-center mt-8">
                                    <Button color="green">Commencer</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <footer className="py-16 text-center">
                <h2 className="text-3xl">
                    <a href="/">
                        <strong>PostNova</strong>
                    </a>
                </h2>
                <ul className="flex items-center justify-center gap-16 my-16">
                    <li><a href="#">A propos</a></li>
                    <li><a href="#">Nos services</a></li>
                    <li><a href="#">Nos offres</a></li>
                </ul>
                <p className="text-sm text-[var(--color-lightgray)]">© 2025 PostNova. Tous droits réservés.</p>
            </footer>
        </>
    )
}

export default Home
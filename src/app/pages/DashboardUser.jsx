import React from "react";
import { Button, ButtonOutline } from "../../components/Button";
import { useAuth } from "../../contexts/AuthContext";
import {
	BsArrowUpRightCircleFill,
	BsBarChartLine,
	BsBoxArrowInUpRight,
	BsBullseye,
	BsCalendar,
	BsCameraVideo,
	BsClock,
	BsEye,
	BsFileEarmarkText,
	BsHeart,
	BsImage,
	BsLightningCharge,
	BsPieChart,
	BsPlus,
	BsShare,
} from "react-icons/bs";
import NavBar from "../../components/NavBar";
import { Card } from "../../components/Card";
import Tag from "../../components/Tag";

const DashboardUser = () => {
	const { user } = useAuth();
	return (
		<>
			<NavBar />
			<div className="container flex flex-col gap-6 mx-auto my-4">
				<section>
					<div className="flex items-center justify-between gap-6">
						<div className="flex flex-col gap-2">
							<h1 className="text-3xl font-bold">
								Bonjour,{" "}
								{
									user?.name
								}
							</h1>
							<p>
								Créez
								des
								campagnes
								marketing
								complètes
								en
								moins
								d'une
								minute
								grâce
								à
								l'IA
							</p>
						</div>
						<div>
							<Button color="blue">
								<div className="flex items-center gap-4">
									<BsPlus
										size={
											24
										}
									/>
									<span>
										Créer
										une
										campagne
									</span>
								</div>
							</Button>
						</div>
					</div>
				</section>
				<section>
					<div className="grid grid-cols-4 gap-6">
						<Card
							styles={
								"shadow-lg"
							}
						>
							<div className="flex items-center justify-between gap-2">
								<div className="flex flex-col gap-1">
									<span className="text-gray-500">
										Total
										campagnes
									</span>
									<span className="text-3xl font-bold">
										12
									</span>
									<span className="text-">
										+20%
										ce
										mois
									</span>
								</div>
								<BsBarChartLine
									size={
										32
									}
								/>
							</div>
						</Card>
						<Card
							styles={
								"shadow-lg"
							}
						>
							<div className="flex items-center justify-between gap-2">
								<div className="flex flex-col gap-1">
									<span className="text-gray-500">
										Vues
										totales
									</span>
									<span className="text-3xl font-bold">
										24.8K
									</span>
									<span className="text-">
										+15%
										ce
										mois
									</span>
								</div>
								<BsEye
									size={
										32
									}
								/>
							</div>
						</Card>
						<Card
							styles={
								"shadow-lg"
							}
						>
							<div className="flex items-center justify-between gap-2">
								<div className="flex flex-col gap-1">
									<span className="text-gray-500">
										Engagement
									</span>
									<span className="text-3xl font-bold">
										8.4%
									</span>
									<span className="text-">
										+5%
										ce
										mois
									</span>
								</div>
								<BsHeart
									size={
										32
									}
								/>
							</div>
						</Card>
						<Card
							styles={
								"shadow-lg"
							}
						>
							<div className="flex items-center justify-between gap-2">
								<div className="flex flex-col gap-1">
									<span className="text-gray-500">
										Conversions
									</span>
									<span className="text-3xl font-bold">
										142
									</span>
									<span className="text-">
										+8%
										ce
										mois
									</span>
								</div>
								<BsBullseye
									size={
										32
									}
								/>
							</div>
						</Card>
					</div>
				</section>
				<section>
					<div className="grid grid-cols-6 items-start gap-6">
						<div className="col-span-4">
							<Card
								styles={
									"shadow-lg"
								}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<BsClock
											size={
												18
											}
										/>
										<h2 className="text-xl font-bold">
											Campagnes
											récentes
										</h2>
									</div>
									<Button
										circle
									>
										<div className="flex items-center gap-2 px-2">
											<span className="text-sm">
												Voir
												tout
											</span>
											<BsArrowUpRightCircleFill
												size={
													16
												}
											/>
										</div>
									</Button>
								</div>
								<div className="mt-6">
									<ul className="space-y-4">
										<li className="flex items-center justify-between">
											<Card
												styles={
													"w-full rounded-xl space-y-2"
												}
											>
												<div className="flex items-center justify-between gap-6">
													<div className="flex items-center gap-2">
														<h5 className="text-xl font-bold">
															Lancement
															Produit
															SaaS
															B2B
														</h5>
														<Tag color="green">
															Terminé
														</Tag>
													</div>
													<a href="#">
														<Button
															circle
														>
															<BsBoxArrowInUpRight />
														</Button>
													</a>
												</div>
												<div>
													<div className="flex items-center gap-2 text-gray-500">
														<BsCalendar />
														<span>
															dimanche
															14
															juillet
															2024
														</span>
													</div>
												</div>
												<div className="bg-[var(--color-black)]/50 flex items-center justify-around text-sm p-4 mt-4 rounded-lg">
													<div className="flex flex-col items-center gap-2">
														<div className="flex items-center">
															<BsCameraVideo
																size={
																	16
																}
																className="text-red-400"
															/>
															<span className="ml-1">
																2
															</span>
														</div>
														<span className="text-sm text-gray-400">
															Videos
														</span>
													</div>
													<div className="flex flex-col items-center gap-2">
														<div className="flex items-center">
															<BsImage
																size={
																	16
																}
																className="text-blue-500"
															/>
															<span className="ml-1">
																8
															</span>
														</div>
														<span className="text-sm text-gray-400">
															Image
														</span>
													</div>
													<div className="flex flex-col items-center gap-2">
														<div className="flex items-center">
															<BsFileEarmarkText
																size={
																	16
																}
																className="text-green-600"
															/>
															<span className="ml-1">
																2
															</span>
														</div>
														<span className="text-sm text-gray-400">
															Landing
															page
														</span>
													</div>
												</div>
												<div className="flex items-center justify-end gap-4 mt-2">
													<div className="flex items-center gap-4 text-gray-400 text-sm">
														<div className="flex items-center gap-2">
															<BsEye />
															<span>
																2,400
															</span>
														</div>
														<div className="flex items-center gap-2">
															<BsHeart />
															<span>
																186
															</span>
														</div>
														<div className="flex items-center gap-2">
															<BsShare />
															<span>
																32
															</span>
														</div>
													</div>
												</div>
											</Card>
										</li>
										<li className="flex items-center justify-between">
											<Card
												styles={
													"w-full rounded-xl space-y-2"
												}
											>
												<div className="flex items-center justify-between gap-6">
													<div className="flex items-center gap-2">
														<h5 className="text-xl font-bold">
															Campagne
															Formation
															IA
														</h5>
														<Tag color="green">
															Terminé
														</Tag>
													</div>
													<a href="#">
														<Button
															circle
														>
															<BsBoxArrowInUpRight />
														</Button>
													</a>
												</div>
												<div>
													<div className="flex items-center gap-2 text-gray-500">
														<BsCalendar />
														<span>
															vendredi
															12
															juillet
															2024
														</span>
													</div>
												</div>
												<div className="bg-[var(--color-black)]/50 flex items-center justify-around text-sm p-4 mt-4 rounded-lg">
													<div className="flex flex-col items-center gap-2">
														<div className="flex items-center">
															<BsCameraVideo
																size={
																	16
																}
																className="text-red-400"
															/>
															<span className="ml-1">
																2
															</span>
														</div>
														<span className="text-sm text-gray-400">
															Videos
														</span>
													</div>
													<div className="flex flex-col items-center gap-2">
														<div className="flex items-center">
															<BsImage
																size={
																	16
																}
																className="text-blue-500"
															/>
															<span className="ml-1">
																5
															</span>
														</div>
														<span className="text-sm text-gray-400">
															Image
														</span>
													</div>
													<div className="flex flex-col items-center gap-2">
														<div className="flex items-center">
															<BsFileEarmarkText
																size={
																	16
																}
																className="text-green-600"
															/>
															<span className="ml-1">
																0
															</span>
														</div>
														<span className="text-sm text-gray-400">
															Landing
															page
														</span>
													</div>
												</div>
												<div className="flex items-center justify-end gap-4 mt-2">
													<div className="flex items-center gap-4 text-gray-400 text-sm">
														<div className="flex items-center gap-2">
															<BsEye />
															<span>
																1,850
															</span>
														</div>
														<div className="flex items-center gap-2">
															<BsHeart />
															<span>
																124
															</span>
														</div>
														<div className="flex items-center gap-2">
															<BsShare />
															<span>
																28
															</span>
														</div>
													</div>
												</div>
											</Card>
										</li>
									</ul>
								</div>
							</Card>
						</div>
						<div className="col-span-2 grid grid-cols-1 gap-6">
							<Card
								styles={
									"shadow-lg"
								}
							>
								<div className="flex items-center gap-3">
									<BsPieChart
										size={
											18
										}
									/>
									<h2 className="text-xl font-bold">
										Quota
										utilisé
									</h2>
								</div>
								<div className="mt-4">
									<div className="flex items-center justify-between gap-2">
										<span>
											Campagnes
										</span>
										<strong>
											2/5
										</strong>
									</div>
									<div className="w-full bg-[var(--color-gray)] rounded-full h-2.5 mt-2">
										<div
											className="bg-blue-600 h-2.5 rounded-full"
											style={{
												width: "50%",
											}}
										></div>
									</div>
									<div className="mt-4">
										<span>
											Il
											vous
											reste
											3
											campagnes
											ce
											mois-ci.
										</span>
									</div>
								</div>
							</Card>
							<Card
								styles={
									"shadow-lg space-y-4 opacity-75"
								}
							>
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<BsLightningCharge
											size={
												18
											}
										/>
										<h2 className="text-xl font-bold">
											Actions
											rapides
										</h2>
									</div>
									<div></div>
								</div>
								<div className="bg-gray-600/5 text-center space-y-2 p-4 rounded-lg">
									<p className="text-gray-400">
										Fonctionnalité
										disponible
										en
										version
										Pro
									</p>
									<ButtonOutline>
										Découvrir
										Pro
									</ButtonOutline>
								</div>
								<ul className="space-y-4">
									<li>
										<a href="#">
											<div className="flex items-center gap-2">
												<Card
													styles={
														"w-full py-3"
													}
												>
													<div className="flex items-center gap-4">
														<BsCameraVideo
															size={
																16
															}
															className="text-gray-400"
														/>
														<span>
															Créer
															une
															vidéo
														</span>
													</div>
												</Card>
											</div>
										</a>
									</li>
									<li>
										<a href="#">
											<div className="flex items-center gap-2">
												<Card
													styles={
														"w-full py-3"
													}
												>
													<div className="flex items-center gap-4">
														<BsFileEarmarkText
															size={
																16
															}
															className="text-gray-400"
														/>
														<span>
															Générer
															une
															landing
															page
														</span>
													</div>
												</Card>
											</div>
										</a>
									</li>
									<li>
										<a href="#">
											<div className="flex items-center gap-2">
												<Card
													styles={
														"w-full py-3"
													}
												>
													<div className="flex items-center gap-4">
														<BsFileEarmarkText
															size={
																16
															}
															className="text-gray-400"
														/>
														<span>
															Post
															Linkedin
														</span>
													</div>
												</Card>
											</div>
										</a>
									</li>
								</ul>
							</Card>
						</div>
					</div>
				</section>
			</div>
		</>
	);
};

export default DashboardUser;

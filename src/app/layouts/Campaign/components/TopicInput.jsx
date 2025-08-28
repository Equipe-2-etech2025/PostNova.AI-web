import React from "react";
import InputPrompt from "@shared/Input";
import LoadingSpinnerNova from "@shared/LoadingSpinnerNova";

const TopicInput = ({
	topic,
	setTopic,
	showOption,
	setShowOption,
	handleGenerate,
	loading,
	selectedPlatform,
	isCreating,
	isCollapsed = false,
	hasGeneratedPosts = false,
}) => {
	return (
		<div
			className={`transition-all duration-500 ease-in-out ${
				hasGeneratedPosts
					? "w-full max-w-5xl mx-auto mb-4"
					: "w-full max-w-5xl mx-auto"
			}`}
		>
			<InputPrompt
				placeholder={
					hasGeneratedPosts ? "Modifier le sujet..." : "Décrivez votre campagne"
				}
				value={topic}
				btnText={
					loading ? "Génération..." : hasGeneratedPosts ? "Regénérer" : "Générer"
				}
				btnDisabled={loading || !topic || !selectedPlatform}
				btnIcon={
					<LoadingSpinnerNova
						isLoading={isCreating}
						iconSize={10}
						spinnerSize={20}
						starColors={{
							purple: "bg-purple-300",
							blue: "bg-blue-300",
							cyan: "bg-cyan-300",
							pink: "bg-pink-300",
						}}
						showIdleGlow={true}
					/>
				}
				onChange={(e) => setTopic(e.target.value)}
				onSubmit={handleGenerate}
				containerStyle={`transition-all duration-500 w-full ${
					hasGeneratedPosts
						? "!px-4 !py-3 !rounded-lg !h-12 !text-base"
						: "!px-6 !py-4 !rounded-xl !min-h-[80px] !text-lg"
				}`}
				inputStyle={`transition-all duration-300 ${
					hasGeneratedPosts
						? "!p-0 !text-base !min-h-[32px]"
						: "!p-0 !text-lg !min-h-[60px]"
				}`}
				btnStyle={
					hasGeneratedPosts ? "!py-2 !px-4 !text-sm" : "!py-3 !px-5 !text-base"
				}
				btnPosition="right"
			/>
		</div>
	);
};

export default TopicInput;

import React from "react";
import { InputForm, TextareaForm } from "@shared/Input";

const CampaignInformationInputs = ({ state, setState }) => {
	const onChangeInput = (e) => {
		const { name, value } = e.target;
		setState((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 p-1">
				<InputForm
					placeholder={"Nom du business"}
					name="business_name"
					value={state.business_name}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Email"}
					name="email"
          type="email"
					value={state.email}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Numéro téléphone"}
					name="phone_numbers"
					value={state.phone_numbers}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Nom de l'entreprise"}
					name="company"
					value={state.company}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Site web"}
					name="website"
					value={state.website}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Industrie"}
					name="industry"
					value={state.industry}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Adresse"}
					name="location"
					value={state.location}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Audience cible"}
					name="target_audience"
					value={state.target_audience}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Objectifs"}
					name="goals"
					value={state.goals}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Budget"}
					name="budget"
					value={state.budget}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Keywords"}
					name="keywords"
					value={state.keywords}
					onChange={onChangeInput}
				/>
				<InputForm
					placeholder={"Style ou couleur préféré"}
					name="preferred_style"
					value={state.preferred_style}
					onChange={onChangeInput}
				/>
			</div>

			<div className="px-1 mt-1">
				<TextareaForm
					placeholder={"Notes additionnels"}
					name="additional_notes"
					value={state.additional_notes}
					onChange={onChangeInput}
				/>
			</div>
		</>
	);
};

export default CampaignInformationInputs;

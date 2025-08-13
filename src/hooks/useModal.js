import { useState, useCallback } from "react";

const useModal = () => {
	const [activeModal, setActiveModal] = useState(null);

	const openModal = useCallback((modal) => {
		setActiveModal(modal);
	}, []);

	const closeModal = useCallback(() => {
		setActiveModal(null);
	}, []);

	const isOpen = useCallback((modal) => activeModal === modal, [activeModal]);

	return { activeModal, isOpen, openModal, closeModal };
};

export default useModal;

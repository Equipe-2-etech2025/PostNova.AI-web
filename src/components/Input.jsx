import React from 'react'
import { ButtonGradient } from './Button'
import { BsStars } from 'react-icons/bs'

const InputPrompt = ({ placeholder, containerStyle, inputStyle }) => {
    const containerRef = React.useRef(null);
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        const handleFocus = () => {
            if (containerRef.current && inputRef.current) {
                containerRef.current.classList.add('ring-2', 'ring-[var(--color-lightgray)]');
            }
        };
        const handleBlur = () => {
            if (inputRef.current && containerRef.current) {
                containerRef.current.classList.remove('ring-2', 'ring-[var(--color-lightgray)]');
            }
        };
        if (inputRef.current) {
            inputRef.current.addEventListener('focus', handleFocus);
            inputRef.current.addEventListener('blur', handleBlur);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('focus', handleFocus);
                inputRef.current.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

    return (
        <div ref={containerRef} className={`border border-[var(--color-gray)] rounded-3xl shadow-lg px-5 py-4 ${containerStyle}`}>
            <textarea
                ref={inputRef}
                placeholder={placeholder}
                className={`w-full p-3 focus:outline-none resize-none placeholder:text-gray-400 ${inputStyle}`}
                cols={2}
            >
            </textarea>
            <div className='flex items-center justify-between my-2'>
                <div className='flex items-center gap-2'>
                    <button className='text-gray-500 hover:text-gray-700 transition duration-200'>
                        <i className="ri-image-line"></i>
                    </button>
                    <button className='text-gray-500 hover:text-gray-700 transition duration-200'>
                        <i className="ri-link-m"></i>
                    </button>
                </div>
                <ButtonGradient circle>
                    <BsStars className='text-white' size={24} />
                </ButtonGradient>
            </div>
        </div>
    )
}

const InputForm = ({placeholder, password = false}) => {
    const inputRef = React.useRef(null);

    React.useEffect(() => {
        const handleFocus = () => {
            if (inputRef.current) {
                inputRef.current.classList.add('border-purple-100', 'ring-2', 'ring-[var(--color-lightgray)]');
            }
        };
        const handleBlur = () => {
            if (inputRef.current) {
                inputRef.current.classList.remove('border-purple-100', 'ring-2', 'ring-[var(--color-lightgray)]');
            }
        };
        if (inputRef.current) {
            inputRef.current.addEventListener('focus', handleFocus);
            inputRef.current.addEventListener('blur', handleBlur);
        }
        return () => {
            if (inputRef.current) {
                inputRef.current.removeEventListener('focus', handleFocus);
                inputRef.current.removeEventListener('blur', handleBlur);
            }
        };
    }, []);

    return (
        <input
            ref={inputRef}
            type={password ? "password" : "text"}
            placeholder={placeholder}
            className="w-full px-4 py-3 focus:outline-none border border-[var(--color-gray)] rounded-lg placeholder:text-gray-500"
        />
    )
}

export {
    InputPrompt,
    InputForm
}
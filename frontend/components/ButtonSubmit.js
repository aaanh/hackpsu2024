"use client";
import { useFormStatus } from 'react-dom'

const ButtonSubmit = ({ value, ...props  }) => {
    const { pending } = useFormStatus();

    return (
        <button disabled={pending} {...props}>
            { pending ? 'Loading...' : value}
        </button>
    )
}

export default ButtonSubmit
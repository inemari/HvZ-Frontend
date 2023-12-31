import React from 'react';
import infoicon from '../../assets/ui/info.png';

// CustomInput component is used to create a customizable input or textarea element.
// Props:
// - textComponent: Specifies whether the input is a text input or a textarea.
// - fieldname: The name of the input field.
// - placeholder: The placeholder text for the input.
// - id: The unique identifier for the input.
// - label: The label text for the input.
// - TooltipContent: The content to display as a tooltip when hovering over the info icon.
// - defaultContent: The default content for the input.
// - value: The value of the input.
// - className: Additional CSS classes to be applied.
const CustomInput = ({
    textComponent,
    fieldname,
    placeholder,
    id,
    label,
    TooltipContent,
    defaultContent,
    value,
    className,
    ...rest
}) => {
    const InputElement = textComponent === 'textarea' ? 'textarea' : 'input';

    return (
        <div className="flex flex-col">
            <div className="flex flex-row-reverse">
                <div className="group ml-0 w-full">
                    {TooltipContent && (
                        <img
                            id="tooltip-icon"
                            src={infoicon}
                            alt=""
                            className={`h-3 w-3 absolute cursor-pointer ${TooltipContent ? 'group-hover:opacity-100' : ''
                                }`}
                        />
                    )}
                    {TooltipContent && (
                        <div className="hidden break-words group-hover:block absolute z-10 -mt-10 px-2 py-1 text-sm font-medium text-white w-fit bg-opacity-90 rounded-lg shadow-sm tooltip bg-customLightBrown ring-1 ring-customBrown">
                            {TooltipContent}
                            <div
                                id="arrow"
                                className="invisible absolute h-2 w-2 bg-inherit before:visible before:absolute before:h-2 before:w-2 before:rotate-45 before:bg-inherit before:content-['']"
                                data-popper-arrow
                            ></div>
                        </div>
                    )}
                </div>
                <label
                    htmlFor="tooltip-icon"
                    className="block w-fit mb-2 text-sm mr-2 whitespace-nowrap font-medium text-white"
                >
                    {label}
                </label>
            </div>
            <InputElement
                name={fieldname}
                placeholder={placeholder}
                id={id}
                className={`border w-full col-span-full  text-sm rounded-lg focus:ring--customOrange  block p-2.5 bg-customBrown border-gray-600 placeholder-gray-400 text-white  ${textComponent === 'textarea' ? 'h-44' : ''
                    }${className}`}
                required
                value={value}
                //value={value !== '' ? value : defaultContent} // Set the default content
                onChange={(e) => rest.onChange(e)} // Pass the onChange handler from props
                {...rest}
            />
        </div>
    );
};

export default CustomInput;

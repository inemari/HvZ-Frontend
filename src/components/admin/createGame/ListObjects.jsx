import React from 'react';

// Renders a list of objects, typically with a name (or title) and a description, in a styled format
const ListObjects = ({ list }) => {
    return (
        <>
            {list.map((object, index) => (
                <div key={index}>
                    <ul className="bg-white bg-opacity-25 justify-center flex-col flex p-3 rounded-lg gap-3  my-3">
                        <p className='text-sm text-white'><b>{object.name || object.title}</b>
                        </p><li>{object.description}</li>
                    </ul>
                </div>
            ))}
        </>
    );
};

export default ListObjects;
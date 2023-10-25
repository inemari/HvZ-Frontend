import React from 'react';

const ListObjects = ({ list }) => {
    return (
        <>
            {list.map((object, index) => (
                <div key={index}>
                    <ul className="bg-white bg-opacity-25 justify-center flex-col flex p-3 rounded-lg gap-3 hover:bg-opacity-40 my-3">
                        <p className='text-sm text-white'><b>{object.title || object.name}</b>
                        </p><li>{object.description}</li>
                    </ul>
                </div>
            ))}
        </>
    );
};

export default ListObjects;
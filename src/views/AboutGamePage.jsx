import React from 'react'
import NavBar from '../components/common/NavBar';

function AboutGame() {
    return (
        <div className='flex flex-col m-6 min-h-full justify-center py-auto'>
<NavBar/>
           

            {/* Game Box */}
            {/**NB! Container should be made into a component */}
            <div className="container mx-auto  flex flex-row justify-center min-w-full box-border w-auto bg-black h-fit min-h-full bg-opacity-60 p-10 hover:overflow-scroll">
                <h1 className="text-lg md:text-4xl font-bold text-white font-passionOne md:pb-0 pb-3">GameName</h1>
            </div>
        </div>
    )
}

export default AboutGame;
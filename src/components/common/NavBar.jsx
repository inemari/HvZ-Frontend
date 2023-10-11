
import ButtonGroup from './ButtonGroup';
import logo from '../../assets/icons/LogoHVZ.png'

const NavBar = () => {
    return (
        <div className=" w-full mx-auto h-1/6 ">
            <nav className="flex justify-center">
                < div className="flex flex-col md:flex-row md:pb-6 pb-3 items-center" >
                    <div className="flex items-center">
                        <img src={logo} alt="App Logo" className="md:pb-0 pb-3 md:max-h-28 justify-end" />
                    </div>
                    {/** If user is not logged in */}
                    <div className=''>
                        <ButtonGroup className="ml-auto" />
                    </div>
                </div >
            </nav >
        </div >
    )
};
export default NavBar;
import AuthButtons from './AuthButtons.jsx';
import logo from '../../assets/icons/LogoHVZ.png'
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import CustomBtn from './CustomButton.jsx';
import Dropdown from './DropDownBtn.jsx';

const NavBar = () => {
    const location = useLocation(); // Get the current location (route)
    const navigate = useNavigate(); // Get the navigation function

    // Function to render game-related buttons if the user is on the game page
    const renderGameButtons = () => {
        if (location.pathname === '/Game') { // Check the current route
            return (
                <>
                    {/* Add your game-related buttons here */}
                    {/* Example: */}
                    <Dropdown
                        label="Dropdown"
                        options={['Option1', 'Option2', 'Option3']}
                        onClickOption={(option) => {
                            // Handle what happens when an option is clicked
                            console.log(`Clicked option: ${option}`);
                        }}
                    />
                    <CustomBtn label="Option1" onClick={() => navigate('/Option1')} />
                    <CustomBtn label="Option2" onClick={() => navigate('/Option2')} />
                    {/* Add more buttons as needed */}
                </>
            );
        }
        return null; // Return null if not on the game page
    };

    return (
        <div className="w-full mx-auto h-1/6">
            <nav className="flex justify-center">
                <div className="flex flex-col md:flex-row md:pb-6 pb-3 items-center justify-between space-x-6">
                    <img src={logo} alt="App Logo" className="md:pb-0 pb-3 md:max-h-28 justify-start m-auto " />
                    {renderGameButtons()}<AuthButtons className='ml-auto flex flex-row space-x-6 w-full justify-between md:justify-end md:max-w-xs' />
                </div>
            </nav>
        </div>
    );
};

export default NavBar;

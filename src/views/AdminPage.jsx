import React, { useState } from 'react';
import AdminFilterSlider from '../components/admin/AdminFilterSlider';
import CreateGameContainer from '../components/admin/createGame/CreateGameContainer';

function AdminPage() {
    const [activeTab, setActiveTab] = useState("1");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };
  
    return (
        <div className='flex flex-col fixed justify-center mx-auto w-full'>
           
            <AdminFilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
            <CreateGameContainer activeTab={activeTab} />
        </div>
    );
}
export default AdminPage;
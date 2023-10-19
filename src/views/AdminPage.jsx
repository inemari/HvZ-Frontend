import React, { useState } from 'react';
import AdminFilterSlider from '../components/admin/AdminFilterSlider';
import CreateGameContainer from '../components/admin/createGame/CreateGameContainer';

function AdminPage() {
    const [activeTab, setActiveTab] = useState("1");

    const handleTabChange = (tabName) => {
        setActiveTab(tabName);
    };

    return (
        <>
            <AdminFilterSlider activeTab={activeTab} handleTabChange={handleTabChange} />
            <CreateGameContainer activeTab={activeTab} />
        </>
    );
}
export default AdminPage;
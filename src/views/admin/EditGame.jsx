import React from 'react';
import GameEditor from '../../components/admin/createGame/GameEditor';
import Container from '../../components/common/Container'

/**
 * The `EditGame` component represents the "Edit Game" page in the application.
 * It uses the `Container` component to structure the content and displays a heading
 * followed by the `GameEditor` component, allowing users to edit game details.
 */
const EditGame = () => {
    return (
        <Container>
            <h1 className="text-3xl md:text-4xl font-bold  mb-2 w-full border-b pb-2 ">Edit  game</h1>
            <GameEditor />
        </Container>
    );
}
export default EditGame;
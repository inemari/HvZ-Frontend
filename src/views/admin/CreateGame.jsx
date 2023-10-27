import React from 'react';
import GameEditor from '../../components/admin/createGame/GameEditor';
import Container from '../../components/common/Container';

/**
 * The `CreateGame` component represents the "Create Game" page in the application.
 * It utilizes the `Container` component to structure the content and displays a heading
 * followed by the `GameEditor` component, which allows users to modify and add game details.
 */
const CreateGame = () => {
    return (
        <Container>
            <h1 className="text-3xl md:text-4xl font-bold  mb-2 w-full border-b pb-2 ">Create  game</h1>
            <GameEditor />
        </Container>
    );
}
export default CreateGame;
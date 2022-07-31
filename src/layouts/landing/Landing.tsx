import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

import { Button } from '@chakra-ui/react';

const Landing: FC = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h1>Landing</h1>
            <Button mt={2} onClick={() => navigate("/home")}>
                go to home
            </Button>
        </div>
    );
};

export default Landing;

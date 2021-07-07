import { FC } from 'react';
import styled from 'styled-components';

const Layout: FC = ({children}) => {

    const TheLayout = styled.main`
        width: 100%;
        padding: 20px;
        @media (max-width: 768px) {
            padding: 5px;
        }
    `;

    return (
        <TheLayout>
            {children}
        </TheLayout>
    )
}

export default Layout;
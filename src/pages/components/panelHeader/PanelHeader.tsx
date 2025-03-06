import React from 'react';

import { ButtonGroup, HeaderContainer, HeaderText } from './PanelHeader.sc';

interface StyledHeaderProps {
    title: string;
    buttons?: React.ReactNode;
}

const PanelHeader: React.FC<StyledHeaderProps> = ({ title, buttons }) => {
    return (
        <HeaderContainer>
            <HeaderText>{title}</HeaderText>
            {buttons && <ButtonGroup>{buttons}</ButtonGroup>}
        </HeaderContainer>
    );
};

export default PanelHeader;

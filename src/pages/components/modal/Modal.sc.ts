import { styled } from 'styled-components';

import { DialogSize } from 'utils/types';

interface ModalProps {
    $size?: DialogSize;
}

export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000; /* Ensure the modal is above other content */
`;

export const ModalContent = styled.div<ModalProps>`
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: ${(props) => {
        switch (props.$size) {
            case DialogSize.SMALL:
                return '300px';
            case DialogSize.LARGE:
                return '600px';
            default:
                return '500px';
        }
    }};
    width: 100%;
`;

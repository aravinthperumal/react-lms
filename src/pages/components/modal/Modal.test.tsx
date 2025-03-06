import { renderWithProviders, screen } from 'utils/test-utils';

import Modal from './Modal';

describe('Modal Component', () => {
    beforeAll(() => {
        const modalRoot = document.createElement('div');
        modalRoot.setAttribute('id', 'modal-root');
        document.body.appendChild(modalRoot);
    });

    afterAll(() => {
        document.body.removeChild(document.getElementById('modal-root')!);
    });

    test('renders modal when isOpen is true', () => {
        renderWithProviders(
            <Modal isOpen={true}>
                <p>Modal Content</p>
            </Modal>,
        );

        expect(screen.getByText('Modal Content')).toBeInTheDocument();
    });

    test('does not render modal when isOpen is false', () => {
        renderWithProviders(
            <Modal isOpen={false}>
                <p>Modal Content</p>
            </Modal>,
        );

        expect(screen.queryByText('Modal Content')).not.toBeInTheDocument();
    });

    test('renders children inside the modal', () => {
        renderWithProviders(
            <Modal isOpen={true}>
                <p>Test Child</p>
            </Modal>,
        );

        expect(screen.getByText('Test Child')).toBeInTheDocument();
    });
});

import { render} from '@testing-library/react';
import App from './App';

describe('App Test',()=>{
    it('Render App',()=>{
        const {getByRole} = render(<App/>);

        expect(getByRole('button')).toBeInTheDocument();
    })
})
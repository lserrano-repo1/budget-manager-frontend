import React from 'react';
import { BankProps} from './bank.d';
import DrawerLayout from '../../component/Layout/DrawerLayout';

import SavingsTwoToneIcon from '@mui/icons-material/SavingsTwoTone';
import { DrawerMenuOptions } from '../../component/Layout/DrawerLayout.d';
import { useNavigate } from 'react-router-dom';

const Bank = (props:BankProps) => {

    const navigate = useNavigate();

    const goToLandingPage = () => {
        navigate('/', { replace: true });
    };


    const options:DrawerMenuOptions[] = [{
        text:'Add bank',
        icon: SavingsTwoToneIcon,
        onClickAction:goToLandingPage
    },{text:'View bank', icon: SavingsTwoToneIcon,
    onClickAction:goToLandingPage}];

    return (
        <DrawerLayout id='bank-management' 
            name='bank-management'
            title='Bank Management'  
            menuOptions={options}
        >
            <div>Aqui todo lo que se pondra</div>
        </DrawerLayout>
    );
};


export default Bank;
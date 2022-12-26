export interface DrawerLayoutProps{
    id?:string;
    name?:string;
    title?:string;

    children: JSX.Element | JSX.Element[];
    menuOptions: DrawerMenuOptions[];
}

export interface DrawerMenuOptions {
    text:string;
    icon?:SvgIconTypeMap;
    onClickAction?: () => void;
}
export interface InputFieldProps{

    id?:string;
    name?:string;
    label:string;
    value?: unknown;
    style?: React.CSSProperties;
    type?: React.HTMLInputTypeAttribute|undefined;
    error?: ErrorField[];

    onBlur?: InputBaseProps['onBlur'];
    onChange?: StandardInputProps['onChange'];

}
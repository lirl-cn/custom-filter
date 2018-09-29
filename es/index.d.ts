import React from 'react';
import './index.css';
interface CustomFilterProps {
    form: any;
    title: string;
    name: string;
    initialValue?: any;
    validator?: (rule: any, value: any, callback: any) => void;
    valuePropName?: string;
    validateTrigger?: string;
    onOk?: (name: string, value: any, title?: any) => void;
    overlayClassName?: string;
    renderParent?: true | false;
}
declare class CustomFilter extends React.Component<CustomFilterProps, any> {
    constructor(props: CustomFilterProps);
    filterOnClick: () => void;
    hideFilter: () => void;
    componentDidMount(): void;
    render(): JSX.Element;
}
export default CustomFilter;

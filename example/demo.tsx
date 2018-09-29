import React from 'react';
import ReactDOM from 'react-dom';
import {Form, Input, Select} from 'antd';
import { FormComponentProps } from 'antd/lib/form';
import CustomFilter from '../src';

import '../src/index.css';

interface DemoProps extends FormComponentProps{

}
class Demo extends React.Component<DemoProps,any>{
    constructor(props:DemoProps) {
        super(props);
        
    }
    
    render(){
        
        return <div>
            <CustomFilter
                title = '姓名'
                form = {this.props.form}
                name = 'name'
                initialValue = '我是默认值'
                onOk={(name, value, title) => {console.log(name, value, title)}}
                // valuePropName='initValue' 
                // validateTrigger='onSelect'
            >
                <Input />
            </CustomFilter>
            <CustomFilter
                title = '性别'
                form = {this.props.form}
                name = 'sex'
                initialValue = ''
                onOk={(name, value, title) => {console.log(name, value, title)}}
                // valuePropName='initValue' 
                // validateTrigger='onSelect'
            >
                <Select style={{width: 120}}>
                    <Select.Option value='1'>男</Select.Option>
                    <Select.Option value='0'>女</Select.Option>
                </Select>
            </CustomFilter>
            {
                // ... you can use antd all form component or custom component
            }
        </div>
    }
}

const DemoForm = Form.create()(Demo);

ReactDOM.render(<DemoForm/>, document.getElementById('root'));
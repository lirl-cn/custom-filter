# custom-filter 文档
### 描述：针对于 react antd 表格组件中表头搜索，原则上支持所有 antd 及自定义 form 组件，如组件值与触发方法不是 value 及 onChange 则需要设置 valuePropName, validateTrigger 
属性|描述
---|:--:
form| antd form 对象 ``` form={this.props.form} ```
title|显示名称
name|变量名称
initialValue|默认值
validator| form validator 验证方法
valuePropName|子节点的值的属性，如 Switch 的是 'checked'  默认 'value'
validateTrigger|子节点的值的触发方法， 默认 'onChange'
onOk|点击确定按钮的回调
overlayClassName|浮层类名
renderParent|是否渲染在父级

----
## example
```js


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
                initialValue = '1'
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

```
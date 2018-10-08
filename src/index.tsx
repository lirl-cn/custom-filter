import React from 'react';

import { Form, Button, Icon, Popover } from 'antd';
const FormItem = Form.Item;

import { hasErrors } from './util'

import './index.css';

interface CustomFilterProps{
    form:any;   //form对象
    title: string; //显示名称
    name: string;   //变量名称
    initialValue?: any; //默认值
    validator?: (rule:any, value:any, callback:any) => void; //验证方法
    valuePropName?: string; //子节点的值的属性，如 Switch 的是 'checked'  默认 'value'
    validateTrigger?: string;
    onOk?: (name:string, value:any, title?:any) => void; //点击确定时触发的方法
    overlayClassName?: string; //浮层类名
    renderParent?: true | false;
}

class CustomFilter extends React.Component<CustomFilterProps, any>{
    constructor(props:CustomFilterProps){
        super(props);
        this.state={
            filtered: false,    //用于保存 Popover 显隐变量
            initialValue: props.initialValue,   //用于保存初始化的值
            value: props.initialValue,  //用于保存实时变化但未点击确定的值
        }
    }

    filterOnClick = () => { //点击小图标展开 Popover 搜索选项
        const { name, form} = this.props;
        const {getFieldValue} = form;
        let value = getFieldValue(name) === undefined ? this.state.initialValue : getFieldValue(name); //获取未点击确定前的值
        const {filtered} = this.state;
        this.setState({
            filtered:!filtered,
            value,
        });
    }

    hideFilter = () => {
        this.setState({filtered: false});
    }

    componentDidMount(){
        // document.addEventListener('click', this.hideFilter)
    }

    render(){
        const { initialValue, value } = this.state;
        const { name, validator, title, form, overlayClassName, valuePropName, validateTrigger} = this.props;
        const {setFieldsValue, getFieldDecorator, getFieldValue, getFieldsError} = form;
        const fieldValue = getFieldValue(name);
        const reg = fieldValue === undefined || fieldValue === null || fieldValue === '' || fieldValue === [] || fieldValue.value === ''; //该正则用于判断小图标是否需要更改颜色，如搜索项有值则变颜色
        let popoverProps : any = {
            content: <FilterTableHeaderItem
                key={name}
                getFieldDecorator={getFieldDecorator}
                setFieldsValue={setFieldsValue}
                getFieldValue={getFieldValue}
                getFieldsError={getFieldsError}
                name={name}
                validator={validator}
                initialValue={initialValue}
                value={value}
                hideFilter={this.hideFilter}
                valuePropName={valuePropName || 'value'}
                validateTrigger={validateTrigger || 'onChange'}
                onOk={(value) => {this.setState({value}, () => {
                    this.props.onOk && this.props.onOk(name, value, title);
                    this.setState({filtered: false});
                })}}
            >
                {this.props.children}
            </FilterTableHeaderItem>,
            style: {minWidth: 140},
            trigger: "click" as any,
            visible: this.state.filtered,
            placement: 'bottomRight' as any,
            overlayStyle: {},
            overlayClassName: overlayClassName || '',
            arrowPointAtCenter: true,
            onVisibleChange: (visible: boolean) => {
                if(!visible){   //未点击确定按钮关闭浮层，则恢复至浮层打开前的值
                    console.log(value);
                    setFieldsValue({[name]:value})
                }
                this.setState({filtered: visible})
            },
            // getPopupContainer: (node) => this.props.isParent ?  node.parentNode as HTMLElement : 'body',
        }
        if(this.props.renderParent === true){
            popoverProps.getPopupContainer = (node : HTMLElement) => node.parentNode as HTMLElement
        }

        return <div
            className='lirl-custom-filter-container'
        >
            {title}
            <Popover
                {...popoverProps}
            >
                <Icon onClick={this.filterOnClick} type="filter" className={reg ? '' : 'anticon-filter-active'} />
            </Popover>
        </div>
    }
}

interface FilterTableHeaderItemProps{
    getFieldDecorator: any;
    setFieldsValue: any;
    getFieldValue: any;
    getFieldsError: any;
    name: string;
    validator: ((rule: any, value: any, callback: any) => void) | undefined;
    initialValue: string | number;
    value: string | number;
    hideFilter: () => void;
    onOk: (value:any) => void;
    valuePropName: string;
    validateTrigger: string;
}
class FilterTableHeaderItem extends React.Component<FilterTableHeaderItemProps,any>{
    constructor(props: FilterTableHeaderItemProps){
        super(props);
    }

    cannel = async() => {    //未点击确定按钮关闭浮层，则恢复至浮层打开前的值
        const {setFieldsValue, name, value} = this.props;
        await setFieldsValue({[name]: value})
        this.props.hideFilter();
    }

    render(){
        const {getFieldDecorator, name, validator, initialValue, getFieldValue, getFieldsError, valuePropName, validateTrigger} = this.props;
        return <div
            className='lirl-custom-filter-filter'
            // ref={node => this.container = node}
        >
        
        <FormItem>
            {getFieldDecorator(name, {
                rules: [{
                    validator: (rule:any, value:any, callback:any) => {
                        if(validator){
                            validator(rule, value, callback)
                        }else{
                            callback()
                        }
                    },
                }],
                initialValue,
                valuePropName,
                validateTrigger,
            })(
                this.props.children
            )}
        </FormItem>
        <div
            style={{
                textAlign: 'right'
            }}
        >
            <Button disabled={hasErrors(getFieldsError([name]))} onClick={async() => {
                await this.props.onOk(getFieldValue(name));
            }} style={{marginRight: 10}} type='primary'> 确定 </Button>
            <Button onClick={this.cannel}> 取消 </Button>
        </div>
        
    </div>
    }
}

export default CustomFilter;
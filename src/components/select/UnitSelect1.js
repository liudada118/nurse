import { TreeSelect } from 'antd';
import React from 'react'


const treeData = [
  {
    title: '小数点后1位数值',
    value: '0-0',
  },
  {
    title: '小数点后2位数值',
    value: '0-1',
  },
  {
    title: '小数点后3位数值',
    value: '0-2',
  },
  {
    title: '小数点后4位数值',
    value: '0-3',
  },
];

export default class Demo extends React.Component {
  state = {
    value: undefined,
  };

  onChange = value => {
    console.log(value);
    this.setState({ value });
  };

  render() {
    return (
      <TreeSelect
        style={{ width: '100%' }}
        value={this.state.value}
        dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
        treeData={treeData}
        placeholder="请选择小数点后的数值"
        treeDefaultExpandAll
        onChange={this.onChange}
      />
    );
  }
}
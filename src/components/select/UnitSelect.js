import { TreeSelect } from 'antd';
import React from 'react'

const { SHOW_PARENT } = TreeSelect;

const treeData = [
  
  
      {
        title: 'Kg/cm2',
        value: '0-1-0',
        key: '0-1-0',
      },
      {
        title: 'RAW',
        value: '0-1-1',
        key: '0-1-1',
      },
      {
        title: 'PSI',
        value: '0-1-2',
        key: '0-1-2',
      }, {
        title: 'ATM',
        value: '0-1-3',
        key: '0-1-3',
      },
      {
        title: 'mmh',
        value: '0-1-4',
        key: '0-1-4',
      },
      {
        title: 'Kpa',
        value: '0-1-5',
        key: '0-1-5',
      },
      {
        title: 'bar',
        value: '0-1-6',
        key: '0-1-6',
      },
 
  
];

export default class Demo extends React.Component {
  state = {
    value: [],
  };

  onChange = value => {
    console.log('onChange ', value);
    this.setState({ value });
  };

  render() {
    const tProps = {
      treeData,
      value: this.state.value,
      onChange: this.onChange,
      treeCheckable: true,
      showCheckedStrategy: SHOW_PARENT,
      placeholder: '选择你要输出的单位',
      style: {
        width: '100%',
      },
    };
    return <TreeSelect {...tProps} />;
  }
}

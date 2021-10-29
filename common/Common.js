import React, { useMemo, useRef, useState, useEffect, Suspense, useCallback, ReactDOM } from 'react';
import 'element-theme-default';
import { Button, Layout, Card, Progress, Message } from 'element-react';
import axios from 'axios'
import { Select } from 'element-react';
import { Slider } from 'antd'
import { addSide } from '../../assets/js/addSide';
import { url } from './url'
import { stick } from '../../assets/js/dataStable'
let wsPointData
let ws
let bedStick4 = new stick()
let bedStick1 = new stick()
let bedStick2 = new stick()
let bedStick3 = new stick()
let timeArr = []
let timeSum = 0

export class Common extends React.Component {
    constructor(props) {
        super(props)
        this.state={

        }
    }

    handleChangeCom(com) {
        this.setState({
            com: com
        })

    }

    requireCom() {
        axios.get(url + '/port')
            .then((res) => {
                console.log(res, 'res')
                this.setState({
                    comArr: res.data.data
                })
            })
    }

    dataCom() {
        axios.get(url + `/connect?port=${this.state.com.toLowerCase()}`).then((res) => {
            console.log(res)
            if (res.data.result == 'ok') {
                console.log(1)
                // ws = new WebSocket('ws://127.0.0.1:8080/ws');
                ws = new WebSocket('ws://192.168.31.33:8080/ws');
                ws.onopen = () => {
                    // connection opened
                    console.info('connect success');
                };
                ws.onmessage = (e) => {
                    // console.log(e)
                    let num = 0
         
                    let arr
                    let jsonObject = JSON.parse(e.data);
                    //处理空数组
                    if (jsonObject.data != null) {
                        wsPointData = jsonObject.data;

                        wsPointData = addSide(wsPointData, 32, 32, 2)
                        this.props.changeWsData(wsPointData)

                    }


                    const chairUrl = 'http://sensor.bodyta.com:9090/predict/cushion' //椅子

                    axios({
                        method: 'POST', url: chairUrl, headers: { appKey: '50ea2b2f913d', appSecret: 'q93Zhn/vqqaEQOD7MC8fQg==' }, data: { 'instances': [[...jsonObject.data]] }
                    })
                        .then((res) => {
                            console.log(res.data)
                            if(this.props.changeFetchData){let bedFetchData1 = bedStick1.dataStable(res.area)
                            let bedFetchData2 = bedStick2.dataStable(res.balance)
                            let bedFetchData3 = bedStick3.dataStable(res.leg)
                            let bedFetchData4 = bedStick4.dataStable(res.pose)
                            this.props.changeFetchData([bedFetchData1, bedFetchData2, bedFetchData3, bedFetchData4])
                            }

                        }).catch((err) => {
                            console.log(err)
                        })

                    let wsSum = wsPointData.reduce((a, b) => a + b, 0)
                    if (timeArr.length < 2) {
                        timeArr.push({
                            num: wsSum > 50 ? 1 : 0,
                            time: new Date().getTime(),
                        })
                    } else {
                        timeArr.shift()
                        timeArr.push({
                            num: wsSum > 50 ? 1 : 0,
                            time: new Date().getTime(),
                        })
                    }
                    if (timeArr.every((a, index) => a.num == 1) && timeArr.length == 2) {
                        timeSum += timeArr[1].time - timeArr[0].time
                    }
                    this.setState({
                        time: parseInt(timeSum / 1000)
                    })
                    /**
                    总和
                    */
                    for (let i = 0; i < wsPointData.length; i++) {
                        /**
                        数据变化率
                        */
                        // if(lastPointData){
                        //      let nums = lastPointData[i]- wsPointData[i] > 0 ? lastPointData[i]- wsPointData[i] : wsPointData[i]- lastPointData[i]
                        //      lastWsArr.push(nums)
                        //    }
                        num += wsPointData[i]
                        // console.log(num)


                    }


                    /**
                      呼吸
                    */
                    // if(lastWsArr.length > 0){
                    //   // let num = 0
                    //   lastWsArr.forEach((a,index)=>{
                    //     num += a
                    //   })
                    //
                    // }

                   
                };
                ws.onerror = (e) => {
                    // an error occurred
                };
                ws.onclose = (e) => {
                    // connection closed
                };

            }
        })
    }

    closeCom() {
        axios.get(url + '/disconnect')
            .then((res) => {
                console.log(res)
            })
    }

    componentWillUnmount() {
        axios.get(url + 'disconn')
        if (ws) {
            ws.close();
        }

    }
    render() {
        return (
            <div className="com" style={{ position: 'fixed', top: 0, left: 0, backgroundColor: '#000', display: 'flex', zIndex: 2 }}>
                <Button onClick={() => { this.requireCom() }}>请求串口</Button>
                {

                    this.state.comArr ? <Select value={this.state.com} placeholder="请选择" onChange={(e) => { this.handleChangeCom(e) }}
                    >
                        {
                            this.state.comArr.map(el => {
                                // console.log(this.state.data)
                                return <Select.Option key={el} label={el} value={el} />
                            })
                        }
                    </Select>

                        : null}
                <Button onClick={() => { this.dataCom() }}>扫描串口</Button>
                <Button onClick={() => { this.closeCom() }}>断开链接</Button>
                <div style={{ width: 300, margin: 0, paddingRight: 10, display: 'flex', paddingLeft: 10, alignItems: 'center' }}>
                    <div style={{ color: '#fff' }}>润滑程度</div>
                    <Slider
                        min={0.1}
                        max={8}
                        onChange={(value) => { this.setState({ valueg: value }) }}
                        value={this.state.valueg}
                        step={0.1}
                        // value={}
                        style={{ flex: 1 }}
                    />
                </div>
                <div style={{ width: 300, margin: 0, paddingRight: 10, display: 'flex', paddingLeft: 10, alignItems: 'center' }}>
                    <div style={{ color: '#fff' }}>颜色饱和度</div>
                    <Slider
                        min={100}
                        max={1200}
                        onChange={(value) => { this.setState({ valuej: value }) }}
                        value={this.state.valuej}
                        step={10}
                        // value={}
                        style={{ flex: 1 }}
                    />
                </div>
            </div>

        )
    }
}
import React, { useState, useEffect, useRef } from 'react'
import Img from '../../assets/img/a.jpg'
import './user.css'
import System from '../antapage/AntaCanvasFull32-64 copy'
import { Sleep } from './sleep/Sleep1'
import { History } from './history/History'
import axios from 'axios'
import md5 from 'js-md5'
import * as echarts from 'echarts'
import { Button, Dropdown, Menu } from 'antd'
import { computeData1, } from './sleep/Chart'
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import htmlToPdfmake from 'html-to-pdfmake';
import createPdf from '../../assets/js/createPdf'
import UnitSelect from '../select/UnitSelect'
import UnitSelect1 from '../select/UnitSelect1'
// import {allData} from '../home/Home'
const createUrl = 'http://bah.bodyta.com:19356/rec/report'
const historyUrl = 'https://bah.bodyta.com/rec/mark'
const key = '13a43a4fd27e4b9e8acee7b82c11e27c'
const timestamp = Date.parse(new Date()) / 1000
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
const date = `${year}-${month}-${day}`
const deviceId = '474887766'
const dateStr = '2021-10-14'
function dateStr1(date) {
    const year = new Date(date).getFullYear()
    const month = new Date(date).getMonth() + 1
    const day = new Date(date).getDate()
    return `${year}-${month}-${day}`
}

function timeToNum(time) {
    let numArr = time.split(':')
    return Number(numArr[0]) * 60 + Number(numArr[1])
}



const stateItem = ['实时状态', '睡眠报告', '历史报告']
export default function User(props) {
    const [state, setState] = useState(0)

    const [data, setData] = useState({})
    const [chart1, setChart1] = useState()
    const [chart2X, setChart2X] = useState()
    const [chart2Y, setChart2Y] = useState()
    const [chart3Y, setChart3Y] = useState()
    const [chart4X, setChart4X] = useState()
    const [chart4Y, setChart4Y] = useState()
    const [chart5Y, setChart5Y] = useState()

    const realRef = useRef()
    const sleepRef = useRef();
    const historyRef = useRef()
    const user = useRef()

    const printDocument = useReactToPrint({
        content: () => user.current,
    });

    const handlePrint = (e) => {
        if (e.key == 'item_0') {
            createPdf(user.current)
        } else if (e.key == 'item_1') {
            printDocument()
        }
    }

    const menu = (
        <Menu onClick={(e) => { handlePrint(e) }}>
            <Menu.Item >
                <div >生成pdf</div>
            </Menu.Item>
            <Menu.Item >
                <div>打印机打印</div>
            </Menu.Item>
        </Menu>
    );

    useEffect(() => {
        // var chart1 = document.getElementById('chart1');
        // 

        // 当天数据请求
        axios.post(createUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            did: deviceId,
            date: dateStr ? dateStr : date
        })
            .then((res) => {
                const data = res.data.data[0]

                setData(res.data.data[0])


                // 雷达图
                let chart1Data = computeData1(data.total_duration, data.outbed.n, data.outbed.n, data.deep_duration / data.total_duration, data.sleep_time.split(':')[0])
                setChart1(chart1Data)

                // 呼吸图
                let xdata = data.dt_arr, ydata = data.hx_arr
                setChart2X(xdata)
                setChart2Y(ydata)

                // 体位转动
                let postData = []

                for (let i = 0; i < data.posture_arr.length; i++) {

                    if (data.posture_arr[i] == '平躺') {
                        postData.push(0)
                    } else if (data.posture_arr[i] == '趴睡') {
                        postData.push(1)
                    } else if (data.posture_arr[i] == '侧躺') {
                        postData.push(2)
                    }
                }
                setChart3Y(postData)

            })

        // 请求历史数据
        axios.post(historyUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            start_date: dateStr1(Date.parse(new Date('2021-10-19')) - 6 * 24 * 3600 * 1000),
            end_date: dateStr1(Date.parse(new Date('2021-10-19'))),
            did: deviceId,
        })
            .then((res) => {
                const data = res.data.data



                if (res.data.data) {
                    let daArr = []
                    res.data.data.dt_arr.forEach((a, index) => {
                        let b = a.split('-')
                        daArr.push(`${b[1]}-${b[2]}`)
                    })
                    let duration_arr1 = res.data.data.duration_arr.map((a) => (timeToNum(a) / 60).toFixed(1))

                    setChart4X(daArr)
                    setChart4Y(data.score_arr)
                    setChart5Y(duration_arr1)
                }

            })
    }, [])

    // // ws 数据刷新
    // useEffect(() => {
    //     // console.log(allData)
    //     const ws = new WebSocket('ws://sensor.bodyta.com:8888/insure/12')
    //     ws.onopen = () => {
    //         console.log('open')
    //     }
    //     ws.onmessage = (e) => {
    //         let allData = JSON.parse(e.data)
    //         if (allData.did === props.match.params.id) {
    //             console.log(allData)

    //             // 呼吸
    //             if(realRef.current.footForm.current.innerHTML != allData.breath){
    //                 realRef.current.footForm.current.innerHTML = allData.breath
    //             }
                
    //             // 在离床
    //             if (allData.leaveBedFlag == 0) {
    //                 realRef.current.bedFetchData1.current.children[1].style.display = 'unset'
    //                 realRef.current.bedFetchData1.current.children[0].style.display = 'none'
    //             } else  {
    //                 realRef.current.bedFetchData1.current.children[1].style.display = 'none'
    //                 realRef.current.bedFetchData1.current.children[0].style.display = 'unset'
    //             }

    //             // 脑卒中
    //             if(realRef.current.stroke.current.innerHTML != allData.stroke){
    //                 realRef.current.stroke.current.innerHTML = allData.stroke
    //             }

    //             // 呼吸暂停

    //             if(realRef.current.breathPause.current.innerHTML != allData.breathPause){
    //                 realRef.current.breathPause.current.innerHTML = allData.breathPause
    //             }

    //             // 睡姿

    //             if(realRef.current.train.current.innerHTML != allData.train){
    //                 realRef.current.train.current.innerHTML = allData.train == '平躺' ? '平躺' : '侧睡'
    //             }

    //         }
    //     }
    // }, [])






    return (
        <div className="userPage" ref={user}>
            <div className="userInfos boxShadow">
                <div className="user">
                    <div className="userImg">
                        <div className="imgBox">
                            <img src={Img} alt="" />
                        </div>

                    </div>
                    <div className="userAge">
                        <div className="name">王雨婷</div>
                        <div className="sexAndAge">
                            <div className="sex">女</div>
                            <div className="age">36岁</div>
                        </div>
                    </div>
                </div>
                <div className="userInfo">
                    <div className="bedNumber userInfoItem">
                        <div className="userInfoTitle">
                            房间号
                        </div>
                        <div className="userInfoContent">
                            20
                        </div>

                    </div>
                    <div className="setTime userInfoItem">
                        <div className="userInfoTitle">
                            入住日期
                        </div>
                        <div className="userInfoContent">
                            2021/9/30
                        </div>


                    </div>
                    <div className="nurse userInfoItem">
                        <div className="userInfoTitle">
                            责任护士
                        </div>
                        <div className="userInfoContent">
                            jack
                        </div>

                    </div>
                </div>
            </div>
            <div className="userContents">
                <div className="userTitles">
                    <div className="userTitle">
                        {/* <div className="userTitleItem">实时状态</div>
                    <div className="userTitleItem">睡眠报告</div>
                    <div className="userTitleItem">历史报告</div> */}

                        {
                            stateItem.map((item, index) => {
                                return (
                                    <div className="userTitleItem" key={item} style={{ backgroundColor: state == index ? '#91cff3' : 'unset', color: state == index ? '#fff' : '#aaa' }} onClick={() => { setState(index) }}>
                                        <div className="userTitleItemBorder">
                                            <div className='userTitleItemBox' >
                                                {item}

                                            </div>
                                            {/* {item == '睡眠报告' && state == 1 ? <><Button onClick={handleSleepPrint}>打印</Button></> : null}
                                            {item == '历史报告' && state == 2 ? <><Button onClick={handleHistoryPrint}>打印</Button></> : null} */}
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                    <div className="print">
                        <Dropdown overlay={menu} placement="bottomLeft" arrow>
                            <i className='iconfont'>&#xe607;</i>
                        </Dropdown>
                        {/* <UnitSelect /> */}

                    </div>
                    {/* <div className="print" style={{width: 400}}>
                   
                        <UnitSelect1 />

                    </div> */}
                </div>
                <div className="userContent">
                    {/* {state == 0 ? <System /> : state == 1 ? <div><Sleep /></div>  : <div> <History /></div>} */}
                    <div style={{ visibility: state == 0 ? 'unset' : 'hidden', position: 'absolute', width: '100%', height: '100%' }}><System ref={realRef} /></div>
                    <div style={{ visibility: state == 1 ? 'unset' : 'hidden', position: 'absolute', width: '100%', height: '100%' }}>
                        <Sleep ref={sleepRef} chart1={chart1} chart2X={chart2X} chart2Y={chart2Y} chart3Y={chart3Y} data={data} />
                    </div>
                    <div style={{ visibility: state == 2 ? 'unset' : 'hidden', position: 'absolute', width: '100%', height: '100%' }}> <History ref={historyRef} chart1={chart1} chart4X={chart4X} chart4Y={chart4Y} chart5Y={chart5Y} data={data} /></div>
                </div>
            </div>
        </div>
    )
}

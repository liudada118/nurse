import React, { useEffect, useState } from 'react'
import './sleep.css'
import axios from 'axios'
import md5 from 'js-md5'
import * as echarts from 'echarts'
import { TimeMin, toString, computeMin } from '../../../assets/js/computeTime'
import { computeItem } from '../../../assets/js/computeItem'
import { computeData1, } from './Chart'
import { Chart1, Chart2 } from './Chart1'

const createUrl = 'http://bah.bodyta.com:19356/rec/report'
const key = '13a43a4fd27e4b9e8acee7b82c11e27c'
const timestamp = Date.parse(new Date()) / 1000
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
const date = `${year}-${month}-${day}`
const deviceId = '474887766'
const dateStr = '2021-10-14'
const segSleep = [
    {
        name: '清醒',
        color: '#4ec46d',
    },
    {
        name: '浅度睡眠',
        color: '#497dea',
    },
    {
        name: '深度睡眠',
        color: '#344fff',
    },
    {
        name: '离床',
        color: '#ffb500',
    },
]

export default function Sleep() {
    const [data, setData] = useState({})
    const chart1 = React.createRef()
    useEffect(() => {
        // var chart1 = document.getElementById('chart1');
        // 

        axios.post(createUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            did: deviceId,
            date: dateStr ? dateStr : date
        })
            .then((res) => {
                const data = res.data.data[0]
                console.log(res.data.data[0])
                setData(res.data.data[0])


                // let chart1Data = computeData1(data.total_duration/60 , data.outbed.n ,data.outbed.n,data.deep_duration/data.total_duration,data.sleep_time.split(':')[0])
                // setOption1(myChart , chart1Data)
            })
    }, [])


    return (
        <>
            {Object.keys(data).length > 0 ? <div className='sleepReport'>
                <div className="reportItem">
                    <div className="card">
                        <div className="sleepSum">
                            <p className="sleepScore">
                                {data.score}
                                <span className="score">
                                    分
                                </span>
                                <div className='sleepEval'>{data.score > 90 ? '睡眠质量不错' : '睡眠质量一般'}</div>
                            </p>
                            <p>

                            </p>
                        </div>
                        <div className="sleepAllTime">
                            <i className='iconfont sleepIcon'>&#xe66b;</i>睡眠总时长{computeMin(data.total_duration)}
                        </div>
                    </div>
                    <div className="segCard">
                        <div className="segSleepTitles">分段睡眠数据</div>
                        <div className="segSleepIcon">
                            {
                                segSleep.map((item, index) => {
                                    return (
                                        <div className="segItem">
                                            <div className="circle" style={{ backgroundColor: item.color }} ></div>
                                            <div className="segTitle">{item.name}</div>
                                        </div>)
                                })
                            }
                        </div>
                        <div className="segSleepData">
                            {
                                data.sleep_arr?.length > 0 ? computeItem(data.sleep_arr, data.outbed_arr).map((item, index) => {
                                    return <div className="segSleepDataItem" style={{ width: `${(100 * item.num / computeItem(data.sleep_arr, data.outbed_arr).length)}%`, backgroundColor: item.color }}></div>
                                }) : null
                            }
                        </div>
                        <div className="segSleepTime">
                            <div>{toString(data.gobed_time)}</div>
                            <div>{toString(data.outbed_time)}</div>
                        </div>
                    </div>
                    <div className="sleepProject">睡眠数据</div>
                    <div className="sleepDataItems">
                        <div className="sleepDataItem sleepDataItemLeft">
                            <div>{computeMin(data.total_duration)}</div>
                            <div>睡眠时长</div>
                        </div>
                        <div className="sleepDataItem ">
                            <div>{data.sleep_time}</div>
                            <div>入睡时刻</div>
                        </div>
                        <div className="sleepDataItem sleepDataItemLeft">
                            <div>{computeMin(data.deep_duration)}</div>
                            <div>深睡时长</div>
                        </div>
                        <div className="sleepDataItem">
                            <div>{computeMin(data.light_duration)}</div>
                            <div>浅睡时长</div>
                        </div>
                        <div className="sleepDataItem sleepDataItemLeft">
                            <div>{data.outbed.n}</div>
                            <div>离床次数</div>
                        </div>
                        <div className="sleepDataItem">
                            <div>{data.hxsus_num}</div>
                            <div>呼吸暂停</div>
                        </div>
                    </div>
                </div>
                <div className="reportItem">
                    <div className="whiteCard">
                        睡眠分布
                        <Chart1 />
                    </div>
                    <div className="whiteCard">
                        当晚呼吸数据
                        <div className="breathes">
                            <div className="breathe breatheRight">
                                <div className="breatheNum">{data.hx_avg}</div>
                                <div className="breatheUnit">次/分钟</div>
                                <div className="breatheState">平均呼吸</div>

                            </div>
                            <div className="breathe breatheRight">
                                <div className="breatheNum">{data.hx_max}</div>
                                <div className="breatheUnit">次/分钟</div>
                                <div className="breatheState">平均呼吸</div>
                            </div>
                            <div className="breathe">
                                <div className="breatheNum">{data.hx_min}</div>
                                <div className="breatheUnit">次/分钟</div>
                                <div className="breatheState">平均呼吸</div>
                            </div>
                        </div>
                        <Chart2 />
                    </div>
                </div>
                <div className="reportItem">
                    <div className="whiteCard">
                        睡眠分布
                        <Chart1 />
                    </div>
                </div>
            </div> : null}
        </>
    )
}

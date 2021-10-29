import React, { useEffect, useState } from 'react'
import './sleep1.css'
import axios from 'axios'
import md5 from 'js-md5'
import * as echarts from 'echarts'
import { TimeMin, toString, computeMin } from '../../../assets/js/computeTime'
import { computeItem } from '../../../assets/js/computeItem'
import { computeData1, } from './Chart'
import { Chart1, Chart2, Chart3 } from './Chart1'

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
                <div className="sleepItem1">
                    <div className="card cardRight boxShadow">
                        <div className="cardItemTitle">睡眠得分</div>
                        <div className="cardItemValue">{data.score}</div>

                    </div>
                    <div className="card cardRight boxShadow">
                        <div className="cardItemTitle">睡眠总时长</div>
                        <div className="cardItemValue">{computeMin(data.total_duration)}</div>
                    </div>
                    <div className="card cardRight boxShadow">
                        <div className="cardItemTitle">入睡时刻</div>
                        <div className="cardItemValue">{data.sleep_time}</div>
                    </div>
                    <div className="card boxShadow">
                        <div className="cardItemTitle">离床次数</div>
                        <div className="cardItemValue"><p className="breatheNum">{data.outbed.n}<span className="breatheUnit">次</span></p> </div>
                        
                    </div>
                </div>
                <div className="sleepItem2">
                    <div className="item2card1 ">
                        <div className="item2Chart1 boxShadow">
                            <div className="cardItemTitle">
                                当晚体位转动数据
                            </div>

                            <div className="breathes">
                                <div className="breathe breatheRight">
                                    <p className="breatheNum">{data.turn_svg_num}<span className="breatheUnit">次/小时</span></p>

                                    <div className="breatheState">平均</div>

                                </div>
                                <div className="breathe">
                                    <p className="breatheNum">{data.turn_num}<span className="breatheUnit">次/天</span></p>

                                    <div className="breatheState">总数</div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Chart3 /></div>
                        </div>
                        <div className="item2Chart2 boxShadow">
                            <div className="cardItemTitle">
                                当晚呼吸数据
                            </div>

                            <div className="breathes">
                                <div className="breathe breatheRight">
                                    <p className="breatheNum">{data.hx_avg}<span className="breatheUnit">次/分钟</span></p>

                                    <div className="breatheState">平均呼吸</div>

                                </div>
                                <div className="breathe breatheRight">
                                    <p className="breatheNum">{data.hx_max}<span className="breatheUnit">次/分钟</span></p>

                                    <div className="breatheState">平均呼吸</div>
                                </div>
                                <div className="breathe">
                                    <p className="breatheNum">{data.hx_min} <span className="breatheUnit">次/分钟</span></p>

                                    <div className="breatheState">平均呼吸</div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Chart2 />
                            </div>
                        </div>
                    </div>
                    <div className="item2card2 ">
                        {/* <div className="card2item1">
                            <div className="item2Content cardRight boxShadow">
                                <div className="cardItemTitle">深睡时长</div>
                                <div className="cardItemValue">{computeMin(data.deep_duration)}</div>
                            </div>
                            <div className="item2Content boxShadow">
                                <div className="cardItemTitle">浅睡时长</div>
                                <div className="cardItemValue">{computeMin(data.light_duration)}</div>
                            </div>


                        </div>
                        <div className="card2item2 boxShadow">
                            <div className="segSleepTitles">呼吸暂停</div>
                            <div className="cardItemValue">{data.hxsus_num}</div>
                        </div> */}
                         <div className="item2Content marginBottom boxShadow">
                            <div className="cardItemTitle">深睡时长</div>
                            <div className="cardItemValue">{computeMin(data.deep_duration)}</div>
                        </div>
                        <div className="item2Content marginBottom boxShadow">
                            <div className="cardItemTitle">浅睡时长</div>
                            <div className="cardItemValue">{computeMin(data.light_duration)}</div>
                        </div>
                        <div className="item2Content boxShadow">
                            <div className="cardItemTitle">呼吸暂停</div>
                            <div className="cardItemValue">  <p className="breatheNum">{data.hxsus_num}<span className="breatheUnit">次</span></p></div>
                          
                        </div>
                    </div>
                </div>
                <div className="sleepItem3">
                    <div className="item3card1 ">
                        {/* <div className="item3Content cardRight boxShadow">
                            <div className="cardItemTitle">深睡时长</div>
                            <div className="cardItemValue">{computeMin(data.deep_duration)}</div>
                        </div>
                        <div className="item3Content cardRight boxShadow">
                            <div className="cardItemTitle">浅睡时长</div>
                            <div className="cardItemValue">{computeMin(data.light_duration)}</div>
                        </div>
                        <div className="item3Content boxShadow">
                            <div className="cardItemTitle">呼吸暂停</div>
                            <div className="cardItemValue">{data.hxsus_num}</div>
                        </div> */}
                        <div className="card2item3 boxShadow">
                            <div className="cardItemTitle">
                                睡眠状态
                            </div>
                            <Chart1 />
                        </div>
                        <div className="card2item4 boxShadow">
                            <div className="segSleepTitles">分段睡眠数据</div>
                            <div className="segSleepChart">


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
                        </div>

                    </div>
                    <div className="item3card2 boxShadow">
                        <div className="cardItemTitle">睡眠建议</div>
                        {data.total_duration / 60 < 8 ? <div> <div className='sleepTip'>
                            <div className="redCircle" ></div>
                            <div>睡眠不足</div>

                        </div>
                            <div className='sleepTipDesc'>长期睡眠不足，会使人心情焦急、免疫力降低，由此会导致种种疾病发生。</div>
                        </div> : null}
                        {data.total_duration / 60 > 9 ? <div> <div className='sleepTip'>
                            <div className="redCircle" ></div>
                            <div>睡眠过量</div>

                        </div>
                            <div className='sleepTipDesc'>长期睡眠过量，会使人心情焦急、免疫力降低，由此会导致种种疾病发生。</div>
                        </div> : null}
                        {data.outbed.n > 0 ? <div> <div className='sleepTip'>
                            <div className="redCircle" ></div>
                            <div>夜间易醒</div>

                        </div>
                            <div className='sleepTipDesc'>睡中觉醒会影响睡眠质量，醒来次数越少，睡眠质量越高。</div>
                        </div> : null}
                    </div>
                </div>
            </div> : null}
        </>
    )
}

import React, { useEffect, useState } from 'react'
import './sleep1.css'
import axios from 'axios'
import md5 from 'js-md5'
import * as echarts from 'echarts'
import { TimeMin, toString, computeMin } from '../../../assets/js/computeTime'
import { computeItem } from '../../../assets/js/computeItem'
import { computeData1, } from './Chart'
import { Chart1, Chart2, Chart3 } from './Chart1'
import { Progress } from 'antd';

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


export default function Sleep(props) {
    


    return (
        <>
            {Object.keys(props.data).length > 0 ? <div className='sleepReport'>
                <div className="sleepItem1">
                    <div className="card cardRight boxShadow">
                        <div className="cardItemTitle">睡眠得分</div>
                        <div className="cardItemValue">{props.data.score}</div>

                    </div>
                    <div className="card cardRight boxShadow">
                        <div className="cardItemTitle">睡眠总时长</div>
                        <div className="cardItemValue">{Array.isArray(computeMin(props.data.total_duration)) ?
                            <><p className="breatheNum">{computeMin(props.data.total_duration)[0]}<span className="breatheUnit">h</span></p>
                                <p className="breatheNum">{computeMin(props.data.total_duration)[1]}<span className="breatheUnit">min</span></p></> :
                            <p className="breatheNum">{computeMin(props.data.total_duration)}<span className="breatheUnit">min</span></p>}</div>
                    </div>
                    <div className="card cardRight boxShadow">
                        <div className="cardItemTitle">入睡时刻</div>
                        <div className="cardItemValue">{props.data.sleep_time}</div>
                    </div>
                    <div className="card boxShadow">
                        <div className="cardItemTitle">离床次数</div>
                        <div className="cardItemValue"><p className="breatheNum">{props.data.outbed.n}<span className="breatheUnit">次</span></p> </div>

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
                                    <p className="breatheNum">{props.data.turn_svg_num}<span className="breatheUnit">次/小时</span></p>

                                    <div className="breatheState">平均</div>

                                </div>
                                <div className="breathe">
                                    <p className="breatheNum">{props.data.turn_num}<span className="breatheUnit">次/天</span></p>

                                    <div className="breatheState">总数</div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Chart3 ydata={props.chart3Y} xdata={props.chart2X} index={3} /></div>
                        </div>
                        <div className="item2Chart2 boxShadow">
                            <div className="cardItemTitle">
                                当晚呼吸数据
                            </div>

                            <div className="breathes">
                                <div className="breathe breatheRight">
                                    <p className="breatheNum">{props.data.hx_avg}<span className="breatheUnit">次/分钟</span></p>

                                    <div className="breatheState">平均呼吸</div>

                                </div>
                                <div className="breathe breatheRight">
                                    <p className="breatheNum">{props.data.hx_max}<span className="breatheUnit">次/分钟</span></p>

                                    <div className="breatheState">平均呼吸</div>
                                </div>
                                <div className="breathe">
                                    <p className="breatheNum">{props.data.hx_min} <span className="breatheUnit">次/分钟</span></p>

                                    <div className="breatheState">平均呼吸</div>
                                </div>
                            </div>
                            <div style={{ flex: 1 }}>
                                <Chart2 xdata={props.chart2X} ydata={props.chart2Y} index={2} />
                            </div>
                        </div>
                    </div>
                    <div className="item2card2 ">
                        {/* <div className="card2item1">
                            <div className="item2Content cardRight boxShadow">
                                <div className="cardItemTitle">深睡时长</div>
                                <div className="cardItemValue">{computeMin(props.data.deep_duration)}</div>
                            </div>
                            <div className="item2Content boxShadow">
                                <div className="cardItemTitle">浅睡时长</div>
                                <div className="cardItemValue">{computeMin(props.data.light_duration)}</div>
                            </div>


                        </div>
                        <div className="card2item2 boxShadow">
                            <div className="segSleepTitles">呼吸暂停</div>
                            <div className="cardItemValue">{props.data.hxsus_num}</div>
                        </div> */}
                        <div className="item2Content marginBottom boxShadow">
                            <div className="cardItemTitle">深睡时长</div>
                            <div className="cardItemValue">{Array.isArray(computeMin(props.data.deep_duration)) ?
                                <><p className="breatheNum">{computeMin(props.data.deep_duration)[0]}<span className="breatheUnit">h</span></p>
                                    <p className="breatheNum">{computeMin(props.data.deep_duration)[1]}<span className="breatheUnit">min</span></p> </>
                                : <p className="breatheNum">{computeMin(props.data.deep_duration)}<span className="breatheUnit">min</span></p>}</div>
                        </div>
                        <div className="item2Content marginBottom boxShadow">



                            <div className="cardItemTitle">呼吸暂停</div>
                            <div className="cardItemValue">  <p className="breatheNum">{props.data.hxsus_num}<span className="breatheUnit">次</span></p></div>
                        </div>
                        <div className="item2Content boxShadow">
                            <div className="cardItemTitle">中风风险</div>
                            <div className="cardItemValue">
                                <Progress percent={30} showInfo={false} trailColor={'#ddd'} />
                            </div>

                        </div>
                    </div>
                </div>
                <div className="sleepItem3">
                    <div className="item3card1 ">
                        {/* <div className="item3Content cardRight boxShadow">
                            <div className="cardItemTitle">深睡时长</div>
                            <div className="cardItemValue">{computeMin(props.data.deep_duration)}</div>
                        </div>
                        <div className="item3Content cardRight boxShadow">
                            <div className="cardItemTitle">浅睡时长</div>
                            <div className="cardItemValue">{computeMin(props.data.light_duration)}</div>
                        </div>
                        <div className="item3Content boxShadow">
                            <div className="cardItemTitle">呼吸暂停</div>
                            <div className="cardItemValue">{props.data.hxsus_num}</div>
                        </div> */}
                        <div className="card2item3 boxShadow">
                            <div className="cardItemTitle">
                                睡眠状态
                            </div>
                            <Chart1 index={1} ydata={props.chart1} />
                        </div>
                        <div className="card2item4 boxShadow">
                            <div className="segSleepTitles">分段睡眠数据</div>
                            <div className="segSleepChart">


                                <div className="segSleepIcon">
                                    {
                                        segSleep.map((item, index) => {
                                            return (
                                                <div className="segItem" key={item.name}>
                                                    <div className="circle" style={{ backgroundColor: item.color }} ></div>
                                                    <div className="segTitle">{item.name}</div>
                                                </div>)
                                        })
                                    }
                                </div>
                                <div className="segSleepData">
                                    {
                                        props.data.sleep_arr?.length > 0 ? computeItem(props.data.sleep_arr, props.data.outbed_arr).map((item, index) => {
                                            return <div className="segSleepDataItem" key={`${item}`+`${index}`} style={{ width: `${(100 * item.num / computeItem(props.data.sleep_arr, props.data.outbed_arr).length)}%`, backgroundColor: item.color }}></div>
                                        }) : null
                                    }
                                </div>
                                <div className="segSleepTime">
                                    <div>{toString(props.data.gobed_time)}</div>
                                    <div>{toString(props.data.outbed_time)}</div>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="item3card2 boxShadow">
                        <div className="cardItemTitle">睡眠建议</div>
                        {props.data.total_duration / 60 < 8 ? <div> <div className='sleepTip'>
                            <div className="redCircle" ></div>
                            <div>睡眠不足</div>

                        </div>
                            <div className='sleepTipDesc'>长期睡眠不足，会使人心情焦急、免疫力降低，由此会导致种种疾病发生。</div>
                        </div> : null}
                        {props.data.total_duration / 60 > 9 ? <div> <div className='sleepTip'>
                            <div className="redCircle" ></div>
                            <div>睡眠过量</div>

                        </div>
                            <div className='sleepTipDesc'>长期睡眠过量，会使人心情焦急、免疫力降低，由此会导致种种疾病发生。</div>
                        </div> : null}
                        {props.data.outbed.n > 0 ? <div> <div className='sleepTip'>
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

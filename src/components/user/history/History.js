import React, { useState } from 'react'
import { Chart1, Chart4, Chart5 } from '../sleep/Chart1'
import './history.css'
import { Progress } from 'antd';
export default function History(props) {
    function dateStr1(date) {
        const year = new Date(date).getFullYear()
        const month = new Date(date).getMonth() + 1
        const day = new Date(date).getDate()
        return `${year}/${month}/${day}`
    }

    const [date, setDate] = useState(Date.parse(new Date()))
    return (
        <>{
            Object.keys(props.data).length > 0 ? <div className="historySleep">
                <div className="historyItem1">
                    <div className="historyItem cardRight">
                        <div className="cardItemTitle">
                            睡眠趋势图
                        </div>
                        <div className="historyChart">
                            <Chart4 ydata={props.chart4Y} xdata={props.chart4X} index={4} />
                        </div>
                    </div>
                    <div className="historyItem">
                        <div className="cardItemTitle">
                            入睡时长趋势图
                        </div>
                        <div className="historyChart">
                            <Chart5 ydata={props.chart5Y} xdata={props.chart4X} index={5} /></div>
                    </div>
                </div>
                <div className="historyItem2">
                    <div className="historyItem2Card1">

                        <div className="historycontent">
                            <Progress trailColor="#ddd" type="circle" percent={60} format={percent => `${percent / 5}次`} />
                        </div>
                        <div className="historyInfo">
                            <div className="historyTitle">
                                离床次数
                            </div>
                            <div className="historyDate">
                                {dateStr1(date - 6 * 24 * 3600 * 1000)}-{dateStr1(date)}
                            </div>
                        </div>
                    </div>
                    <div className="historyItem2Card2">
                        <div className="cardItemTitle">
                            睡眠状态
                        </div>
                        <div className="historyChart1">
                            <Chart1 index={7} ydata={props.chart1} />
                        </div>

                    </div>
                    <div className="historyItem2Card3">

                        <div className="historycontent">
                            <Progress trailColor="#ddd" type="circle" percent={30} format={percent => `${percent}%`} />
                        </div>
                        <div className="historyInfo">
                            <div className="historyTitle">
                                中风风险
                            </div>
                            <div className="historyDate">
                                {dateStr1(date - 6 * 24 * 3600 * 1000)}-{dateStr1(date)}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="historyItem3">
                    <div className="historyItem3Card1">
                        <div className="sleepPosition">
                            <div className="cardItemTitle">
                                常用睡姿
                            </div>
                            <div className="cardItemValue">
                                侧睡
                            </div>
                        </div>
                        <div className="sleepAverScore">
                            <div className="cardItemTitle">
                                平均得分
                            </div>
                            <div className="cardItemValue">
                                <p className="breatheNum">{72}<span className="breatheUnit">分</span></p>
                            </div>
                        </div>
                    </div>
                    <div className="historyItem3Card2">
                        <div className="cardItemTitle">
                            护士建议
                        </div>
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
            </div> : null
        }</>
    )
}

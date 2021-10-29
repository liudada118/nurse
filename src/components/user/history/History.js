import React from 'react'
import { Chart4, Chart5 } from '../sleep/Chart1'
import './history.css'
export default function History() {
    return (
        <div className="historySleep">
            <div className="historyItem cardRight">
                <div className="cardItemTitld">
                    睡眠趋势图
                </div>
                <div className="historyChart">
                <Chart4 />
                </div>
            </div>
            <div className="historyItem">
                <div className="cardItemTitld">
                    入睡时长趋势图
                </div>
                <div className="historyChart">
                <Chart5 /></div>
            </div>
        </div>
    )
}

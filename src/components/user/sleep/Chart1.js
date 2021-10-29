import React, { Component } from 'react'
import * as echarts from 'echarts'
import axios from 'axios'
import md5 from 'js-md5'
import { computeData1, initCharts } from './Chart'

const createUrl = 'http://bah.bodyta.com:19356/rec/report'
const key = '13a43a4fd27e4b9e8acee7b82c11e27c'
const timestamp = Date.parse(new Date()) / 1000
const year = new Date().getFullYear()
const month = new Date().getMonth() + 1
const day = new Date().getDate()
const date = `${year}-${month}-${day}`
const deviceId = '474887766'
const dateStr = '2021-10-19'
const historyUrl = 'https://bah.bodyta.com/rec/mark'

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

export class Chart1 extends Component {

    initCharts = (props) => {


        const option = {


            radar: {
                // shape: 'circle',
                radius: '60%',

                name: {
                    show: true,
                    color: '#000',
                    textStyle: {
                        // padding : [0 , -30]
                    },
                    // padding : [-20 , -20]
                },
                indicator: [
                    { name: '睡眠时长', max: 10, color: '#000' },
                    { name: '睡眠中断', max: 10 },
                    { name: '离床次数', max: 10 },
                    { name: '深睡时长', max: 10 },
                    { name: '入睡时刻', max: 10 },
                ],
                splitArea: {
                    show: true,
                    areaStyle: {
                        color: []
                        // 图表背景网格的颜色
                    },
                    name: {
                        textStyle: {
                            color: 'red',
                        }
                    }
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        width: 1,
                        color: ['#999',]
                        // 图表背景网格线的颜色
                    }
                }
            },

            series: [{
                name: '预算 vs 开销（Budget vs spending）',
                type: 'radar',
                data: [
                    {
                        value: props.ydata,
                        name: '预算分配（Allocated Budget）',
                        areaStyle: {
                            // color: 'rgba(255, 228, 52, 0.6)'
                        }
                    },
                ]
            }]
        };
        // myChart.clear()  
        props.myChart.setOption(option);

        window.addEventListener("resize", function () {
            props.myChart.resize();
        });
    }

    componentDidMount() {




        axios.post(createUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            did: deviceId,
            date: dateStr ? dateStr : date
        })
            .then((res) => {
                const data = res.data.data[0]
                console.log(res.data.data[0])

                const chart1 = document.getElementById('chart1')
                var myChart = echarts.init(chart1);
                let chart1Data = computeData1(data.total_duration, data.outbed.n, data.outbed.n, data.deep_duration / data.total_duration, data.sleep_time.split(':')[0])
                console.log(chart1Data, data.total_duration)
                this.initCharts({ myChart: myChart, ydata: chart1Data })
            })
    }

    render() {
        return (
            <div id="chart1" style={{ height: '100%' }}></div>
        )
    }
}


export class Chart2 extends Component {

    initCharts = (props) => {


        const option = {
            tooltip: {
                trigger: 'axis'
            },
            
            title: {
                text: '测试',
                padding: [10, 0, 0, 20],
                show: false,
                textStyle: {
                    fontSize: 14,
                    color: '#000'
                },
                top: '10rpx'
            },
            // backgroundColor: "#000",
            color: ["#006EFF", "#67E0E3", "#9FE6B8"],
            animation: false,
            grid: {
                show: false
            },
            xAxis: {
                type: 'category',
                data: props.xdata,      //x轴上的数据是动态的，所以我作为参数传进来
                axisLabel: {
                    interval: 2000,   //x轴间隔多少显示刻度
                    showMinLabel: true,
                    showMaxLabel: true,
                    fontSize: 12,
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis: {
                splitNumber: 3,
                x: 'center',
                scale: true,
                type: 'value',
                axisLine: { show: true },
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    },
                },

                splitLine: {    //网格线
                    lineStyle: {
                        interval: 1,
                        type: 'dashed',  //设置网格线类型 dotted：虚线   solid:实线
                        opacity: 0.6,
                        color: ["#ddd"]
                    },
                    show: false //隐藏或显示
                }
            },
            series: [{
                type: 'line',
                data: props.ydata,    //y轴上的数据也是动态的，也作为参数传进来
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }]
        };
        // myChart.clear()  
        props.myChart.setOption(option);

        window.addEventListener("resize", function () {
            props.myChart.resize();
        });
    }

    componentDidMount() {




        axios.post(createUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            did: deviceId,
            date: dateStr ? dateStr : date
        })
            .then((res) => {
                const data = res.data.data[0]
                console.log(res.data.data[0])
                const chart2 = document.getElementById('chart2')
                if (chart2) {
                    var myChart = echarts.init(chart2);
                    let xdata = data.dt_arr, ydata = data.hx_arr
                    this.initCharts({ myChart: myChart, xdata, ydata })
                }
            })
    }



    render() {
        return (
            <div id="chart2" style={{ height: '100%' }}></div>
        )
    }
}


export class Chart3 extends Component {

    initCharts = (props) => {


        const option = {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    // var color = params.color;//图例颜色

                    return `${params[0].name}   ${params[0].value == 0 ? '平躺' : params[0].value == 1 ? '趴睡' : params[0].value == 2 ? '侧躺' : null}`

                }
            },
            color: ["#006EFF", "#67E0E3", "#9FE6B8"],
            xAxis: {
                type: 'category',
                data: props.xdata,
                boundaryGap: false,
                axisLabel: {
                    interval: 2000,   //x轴间隔多少显示刻度
                    showMinLabel: true,
                    showMaxLabel: true,
                    fontSize: 12,
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            grid: {
                x: 40
            },
            yAxis: {

                type: 'value',
                splitNumber: 2,
                axisLine: { show: true },
                splitLine: {    //网格线
                    lineStyle: {
                        interval: 1,
                        type: 'dashed',  //设置网格线类型 dotted：虚线   solid:实线
                        opacity: 1,
                        color: ["#000"]
                    },
                    show: false //隐藏或显示
                },
                axisLabel: {
                    show: true,
                    textStyle: {
                        color: '#000'
                    },
                    // 这里重新定义就可以
                    formatter: function (value) {

                        var texts = []
                        if (value === 0 || value === '0' || value == '平躺') {
                            texts.push('平躺')
                        } else if (value === 1 || value === '1' || value == '趴睡') {
                            texts.push('趴睡')
                        } else if (value === 2 || value === '2' || value == '侧躺') {
                            texts.push('侧躺')
                        } else if (value === 4 || value === '4') {
                            texts.push('V类')
                        } else if (value === 5 || value === '5') {
                            texts.push('Ⅵ类')
                        }
                        return texts
                    }
                },
            },
            series: [{
                type: 'line',
                data: props.ydata,    //y轴上的数据也是动态的，也作为参数传进来
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }]
        };
        // myChart.clear()  
        props.myChart.setOption(option);

        window.addEventListener("resize", function () {
            props.myChart.resize();
        });
    }

    componentDidMount() {




        axios.post(createUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            did: deviceId,
            date: dateStr ? dateStr : date
        })
            .then((res) => {
                const data = res.data.data[0]
                console.log(res.data.data[0])
                const chart2 = document.getElementById('chart3')
                var myChart = echarts.init(chart2);
                let xdata = data.dt_arr
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
                this.initCharts({ myChart: myChart, xdata, ydata: postData })
            })
    }

    render() {
        return (
            <div id="chart3" style={{ height: '100%' }}></div>
        )
    }
}

export class Chart4 extends Component {

    initCharts = (props) => {


        const option = {
            tooltip: {
                trigger: 'axis'
            },
            title: {
                text: '测试',
                padding: [10, 0, 0, 20],
                textStyle: {
                    fontSize: 14,
                    color: '#000'
                },
                show : false,
                top: '10rpx'
            },
            // backgroundColor: "#000",
            color: ["#006EFF", "#67E0E3", "#9FE6B8"],
            animation: false,
            grid: {
                show: false
            },
            xAxis: {
                type: 'category',
                data: props.xdata,      //x轴上的数据是动态的，所以我作为参数传进来
                axisLabel: {
                    interval: 2000,   //x轴间隔多少显示刻度
                    showMinLabel: true,
                    showMaxLabel: true,
                    fontSize: 12,
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis: {
                name: '睡眠得分',
                nameTextStyle: {
                    color: '#000'
                },
                splitNumber: 3,
                x: 'center',
                scale: true,
                type: 'value',
                axisLine: { show: true },
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    },
                },
                max : 100,
                splitLine: {    //网格线
                    lineStyle: {
                        interval: 1,
                        type: 'dashed',  //设置网格线类型 dotted：虚线   solid:实线
                        opacity: 0.6,
                        color: ["#ddd"]
                    },
                    show: false //隐藏或显示
                }
            },
            series: [{
                type: 'line',
                data: props.ydata,    //y轴上的数据也是动态的，也作为参数传进来
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }]
        };
        // myChart.clear()  
        props.myChart.setOption(option);

        window.addEventListener("resize", function () {
            props.myChart.resize();
        });
    }

    componentDidMount() {


        console.log(Date.parse(new Date(timestamp)), Date.parse(new Date(timestamp)) - 6 * 24 * 3600 * 1000)

        axios.post(historyUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            start_date: dateStr1(Date.parse(new Date()) - 16 * 24 * 3600 * 1000),
            end_date: dateStr1(Date.parse(new Date()) - 10 * 24 * 3600 * 1000),
            did: deviceId,
        })
            .then((res) => {
                const data = res.data.data
                console.log(res)
                const chart2 = document.getElementById('chart4')
                var myChart = echarts.init(chart2);
                let daArr = []
                res.data.data.dt_arr.forEach((a, index) => {
                    let b = a.split('-')
                    daArr.push(`${b[1]}-${b[2]}`)
                })


                this.initCharts({ myChart: myChart, xdata : daArr, ydata: data.score_arr })
            })
    }

    render() {
        return (
            <div id="chart4" style={{ height: '100%' }}></div>
        )
    }
}

export class Chart5 extends Component {

    initCharts = (props) => {


        const option = {
            tooltip: {
                trigger: 'axis'
            },
            title: {
                text: '测试',
                padding: [10, 0, 0, 20],
                textStyle: {
                    fontSize: 14,
                    color: '#000'
                },
                show : false,
                top: '10rpx'
            },
            // backgroundColor: "#000",
            color: ["#006EFF", "#67E0E3", "#9FE6B8"],
            animation: false,
            grid: {
                show: false
            },
            xAxis: {
                type: 'category',
                data: props.xdata,      //x轴上的数据是动态的，所以我作为参数传进来
                axisLabel: {
                    interval: 2000,   //x轴间隔多少显示刻度
                    showMinLabel: true,
                    showMaxLabel: true,
                    fontSize: 12,
                    textStyle: {
                        color: '#000'
                    }
                }
            },
            yAxis: {
                name: '时长(小时)',
                nameTextStyle: {
                    color: '#000'
                },
                splitNumber: 3,
                x: 'center',
                scale: true,
                type: 'value',
                axisLine: { show: true },
                axisLabel: {
                    textStyle: {
                        color: '#000'
                    },
                },
                splitLine: {    //网格线
                    lineStyle: {
                        interval: 1,
                        type: 'dashed',  //设置网格线类型 dotted：虚线   solid:实线
                        opacity: 0.6,
                        color: ["#ddd"]
                    },
                    show: false //隐藏或显示
                }
            },
            series: [{
                type: 'line',
                data: props.ydata,    //y轴上的数据也是动态的，也作为参数传进来
                symbol: 'none',
                lineStyle: {
                    width: 1
                }
            }]
        };
        // myChart.clear()  
        props.myChart.setOption(option);

        window.addEventListener("resize", function () {
            props.myChart.resize();
        });
    }

    componentDidMount() {


        console.log(Date.parse(new Date(timestamp)), Date.parse(new Date(timestamp)) - 6 * 24 * 3600 * 1000)

        axios.post(historyUrl, {
            sign: md5(key + timestamp),
            timestamp: timestamp,
            start_date: dateStr1(Date.parse(new Date()) - 16 * 24 * 3600 * 1000),
            end_date: dateStr1(Date.parse(new Date()) - 10 * 24 * 3600 * 1000),
            did: deviceId,
        })
            .then((res) => {
                const data = res.data.data
                console.log(res)
                const chart2 = document.getElementById('chart5')
                var myChart = echarts.init(chart2);
                let daArr = []
                res.data.data.dt_arr.forEach((a, index) => {
                    let b = a.split('-')
                    daArr.push(`${b[1]}-${b[2]}`)
                })
                let duration_arr1
                duration_arr1 = res.data.data.duration_arr.map((a) => (timeToNum(a)/60).toFixed(1))


                this.initCharts({ myChart: myChart, xdata : daArr, ydata: duration_arr1 })
            })
    }

    render() {
        return (
            <div id="chart5" style={{ height: '100%' }}></div>
        )
    }
}




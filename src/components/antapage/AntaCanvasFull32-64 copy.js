import React, { useMemo, useRef, useState, useEffect, Suspense, useCallback, ReactDOM } from 'react';
import { Canvas, useFrame, useLoader } from 'react-three-fiber';
// import './styles.css';
import Controls from './Controls';
import { TextureLoader, LoadingManager } from 'three';
import Compute from '../../assets/js/Compute';
import * as echarts from 'echarts'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import 'element-theme-default';
import { Button, Layout, div, Progress, Message } from 'element-react';
// import {}
import { stick } from '../../assets/js/dataStable'
import './anta.css'
import axios from 'axios'
import { Slider } from 'antd'
import { Select } from 'element-react';
import { addSide } from '../../assets/js/addSide';
import on from '../../assets/images/on.png'
import out from '../../assets/images/out.png'
import side from '../../assets/images/side.png'
import sleep from '../../assets/images/sleep.png'
import { Stoke, computeStoke } from '../../assets/js/computeStoke'
import video from '../../assets/images/1.mp4'
let bedStick4 = new stick()
let bedStick1 = new stick()
let bedStick2 = new stick()
let bedStick3 = new stick()
let moveArr = new Array();
let dateArr = new Array();
let timeArr = []
let lastTimeSum = 0
let timeSum = 0
const yMax = 255
let ti
let oldWsData = new Array(1024).fill(0)
let leftStoke = new Stoke(50)
let rightStoke = new Stoke(50)
let reduce = new Stoke(50)

const localurl = 'http://127.0.0.1:8080'
const onwsurl = 'ws://127.0.0.1:9999'
const wsurl = ''
const un = ''
const lourl = localurl
let bedStick = new stick()
let bedFetchData
let count
// import file from './file'
// const { Option } = Select;
//var FileSaver = require('file-saver');
// var fs = require('file')
let Breathes = false
let BreathesArr = []
let printArr = [];
let csvData = []//JSON.parse(localStorage.getItem('collection')) ?JSON.parse(localStorage.getItem('collection')) : []
let wsPointData = [];
let wsPointData1 = [];
const SEPARATION = 20, AMOUNTX = 64 + 2 * 4, AMOUNTY = 128 + 4 * 4;
let ws

let maxv = 0;
let minv = 100;
let dv = 0;

let smoothBig = [];
let bigArr = [];
let bigArrg = [];
let bigArrp = [];
let fixbigArrg = [];

let smoothdiff = 1;
let diffr;
let computeResult;

let weight = localStorage.getItem('weight');
let height = localStorage.getItem('height')

//333

let collection = JSON.parse(localStorage.getItem('collection')) ? JSON.parse(localStorage.getItem('collection')) : []
let lastWsArr = []


/**
3D模型
*/
const Asset = ({ url, x, j }) => {
  var obj = useLoader(OBJLoader, url);
  var mesh = obj.children[0];
  mesh.scale.set(80, 80, 80);

  mesh.position.set(x, 0, 0);
  mesh.rotation.x = -90;
  mesh.rotation.y = j;
  mesh.rotation.z = -280;
  //useFrame(() => (mesh.rotation.x = mesh.rotation.y += 0.01));
  mesh.material.color.setHex(0x0055ff);
  mesh.material.transparent = true;
  mesh.material.opacity = 0.5;
  mesh.material.wireframe = true;
  //mesh.material.metalness =1;


  useFrame(() => {
    smoothdiff = smoothdiff + ((diffr - smoothdiff) + 0.5) / 20;
    mesh.rotation.y = smoothdiff;
  });


  return <primitive object={obj} dispose={null} />;
};









const Box = props => {
  const mesh = useRef();

  const [hovered, setHover] = useState(false);
  const [active, setActive] = useState(false);

  // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));

  return (
    <mesh
      {...props}
      ref={mesh}
      scale={active ? [1.5, 1.5, 1.5] : [1, 1, 1]}
      onClick={e => setActive(!active)}
      onPointerOver={e => setHover(true)}
      onPointerOut={e => setHover(false)}
    >
      <boxBufferGeometry attach='geometry' args={[1, 1, 1]} />
      <meshStandardMaterial
        attach='material'
        color={hovered ? 'hotpink' : 'orange'}
      />
    </mesh>
  );
};


let a = false
function Particles(props) {

  const spite = new TextureLoader().load(require('../../assets/images/circle.png'));
  const attrib = useRef();

  //变量放到内存，高速调用
  const [positions, colors] = useMemo(() => {

    bigArrg = []
    bigArr = []
    bigArrp = []
    printArr = []
    let positions = [], colors = [];
    let i = 0, j = 0;
    for (let iy = 0; iy < AMOUNTX; iy++) {
      for (let ix = 0; ix < AMOUNTY; ix++) {
        positions[i] = ix * SEPARATION - ((AMOUNTX * SEPARATION) / 2) - 1500; // x
        positions[i + 1] = 0; // y
        positions[i + 2] = iy * SEPARATION - ((AMOUNTY * SEPARATION) / 2) + 500; // z


        bigArr.push(1);
        bigArrg.push(1);
        bigArrp.push(1);
        wsPointData.push(1);
        smoothBig.push(1);
        printArr.push(1);
        colors[i] = 1;
        colors[i + 1] = 0.1;
        colors[i + 2] = 0;

        i += 3;
        j++;
      }
    }

    return [new Float32Array(positions), new Float32Array(colors)];
    // }, [pointCount]);
  });


  //钩子循环
  // let timer = null

  let firstNum = 0 //第一页的计数器
  let timer1 = null //开始时候用的定时器
  let timer2 = null // 结束时候用的定时器
  let fSmooth = 0, LSmooth = 0
  useFrame(() => {


    let res = Compute.computeAll(bigArrg, 144, 72);
    computeResult = res;

    fSmooth = res['balance'] ? fSmooth + ((res['balance'] - fSmooth) + 0.5) / 20 : 0

    LSmooth = res['LPC'] ? LSmooth + ((res['LPC'] - LSmooth) + 0.5) / 20 : 0
    // smoothBig[j] = smoothBig[j] + ((value - smoothBig[j]) + 0.5) / 20;
    let lpc = computeResult ? computeResult['LPC'] ? LSmooth : null : null
    let blance = computeResult ? computeResult['balance'] ? fSmooth : null : null

    // props.footType.current.src = !res['LA'] ? normal : res['LA'] == 1 ? high : res['LA'] == 0 ? normal : res['LA'] == -1 ? low : null
    props.lfc.current.style.bottom = lpc ? `calc(${(1 - lpc) * 46 + 23}%)` : '46%'
    // props.balance.current.style.left = blance ? `calc(${(blance + 1) * 46 - 23}%)` : '46%'
    // lastRes = res

    /*
    * 　腰椎图

    */
    //   旋转角度
    let rotate = 30 * (blance - 0.5)
    // 正常值范围

    // props.blaImg.current.style.transform = `rotate(${rotate}deg)`

    //  Compute.test()
    //线性插值
    interp(wsPointData, bigArrp, 32 + 4);
    interp2(bigArrp, bigArr, 64 + 2 * 4);
    //高斯滤波
    gaussBlur_1(bigArr, bigArrg, 128 + 4 * 4, 64 + 2 * 4, props.valueg);
    //缩放
    fixDivide(bigArrg, fixbigArrg, 64 + 2 * 4);
    // if(props.compute){props.compute(Compute.computeAll(bigArrg))}
    // else{

 
    if (wsPointData.length > 0) {
      let i = 0, j = 0;
      for (let ix = 0; ix < AMOUNTX; ix++) {
        for (let iy = 0; iy < AMOUNTY; iy++) {
          // printArr[j] += ((bigArrg[j]-1)/20);
          // const value =printArr[j];
          const value = bigArrg[j] * 2;
          // let value;
          // if(props.props.match.params.step === 3){
          //   printArr[j] += ((bigArrg[j]-1)/20);
          //   value = printArr[j]
          // }else{
          //   value =fixbigArrg[j]
          // }
          // const value = props.props.match.params.step === 3 ? printArr[j] : fixbigArrg[j]
        
          // const value = bigArr[j]/10;
          //const  value= (Math.sin((ix + count) * 0.3) + 1) * 20 +


          //柔化处理smooth
          smoothBig[j] = smoothBig[j] + ((value - smoothBig[j]) + 0.5) / 6;



          positions[i + 1] = smoothBig[j] / 5; // y
          const rgb = jet(0, props.valuej, smoothBig[j]);
          colors[i] = rgb[0] / 255;
          colors[i + 1] = rgb[1] / 255;
          colors[i + 2] = rgb[2] / 255;

          i += 3;
          j++;
        }
      }
      //attrib.current.needsUpdate = true;

  
      //  mesh.rotation.y = mesh.rotation.y += 0.01;
      attrib.current.parent.attributes.position.needsUpdate = true;
      attrib.current.parent.attributes.color.needsUpdate = true;
      count += 0.1;
    }

  });

  //线性插值
  function interp(smallMat, bigMat, Length) {
    for (let x = 1; x <= Length; x++) {
      for (let y = 1; y <= Length; y++) {

        bigMat[(Length * 2 * (y - 1) + (2 * x - 1)) - 1] = (smallMat[(Length * (y - 1) + x) - 1]) * 20;
        //2*y-2
      }
    }
  }

  //线性插值
  function interp2(smallMat, bigMat, Length) {
    for (let x = 1; x <= Length; x++) {
      for (let y = 1; y <= Length; y++) {

        bigMat[(Length * 2 * (2 * y - 2) + (2 * x - 1)) - 1] = (smallMat[(Length * (y - 1) + x) - 1]);
        //2*y-2
      }
    }
  }



  function gaussBlur_1(scl, tcl, w, h, r) {
    var rs = Math.ceil(r * 2.57);     // significant radius
    for (var i = 0; i < h; i++)
      for (var j = 0; j < w; j++) {
        var val = 0, wsum = 0;
        for (var iy = i - rs; iy < i + rs + 1; iy++)
          for (var ix = j - rs; ix < j + rs + 1; ix++) {
            var x = Math.min(w - 1, Math.max(0, ix));
            var y = Math.min(h - 1, Math.max(0, iy));
            var dsq = (ix - j) * (ix - j) + (iy - i) * (iy - i);
            var wght = Math.exp(-dsq / (2 * r * r)) / (Math.PI * 2 * r * r);
            val += scl[y * w + x] * wght;
            wsum += wght;
          }
        tcl[i * w + j] = Math.round(val / wsum);
      }

  }



  function fixDivide(input, output, Length) {
    for (let i = 0; i <= Length * Length; i++) {
      if (input[i] > maxv) {
        maxv = input[i];
      }
      if (input[i] < minv) {
        minv = input[i];
      }
      dv = maxv - minv;
    }

    for (let i = 0; i <= Length * Length; i++) {
      output[i] = input[i] * (100 / dv);
    }
    dv = 0;
    maxv = 0;
    minv = 100;
  }





  function jet(min, max, x) {

    let red, g, blue;
    let dv;
    red = 1.0;
    g = 1.0;
    blue = 1.0;
    if (x < min) {
      x = min;
    }
    if (x > max) {
      x = max;
    }
    dv = max - min;
    if (x < (min + 0.25 * dv)) {

      // red = 0;
      // g = 0;
      // blue = 1.0;


      red = 0;
      g = 4 * (x - min) / dv;
    } else if (x < (min + 0.5 * dv)) {
      red = 0;
      blue = 1 + 4 * (min + 0.25 * dv - x) / dv;
    } else if (x < (min + 0.75 * dv)) {
      red = 4 * (x - min - 0.5 * dv) / dv;
      blue = 0;
    } else {
      g = 1 + 4 * (min + 0.75 * dv - x) / dv;
      blue = 0;
    }
    var rgb = new Array();
    rgb[0] = parseInt(255 * red + '');
    rgb[1] = parseInt(255 * g + '');
    rgb[2] = parseInt(255 * blue + '');
    return rgb;
  }

  function fixDivide(input, output, Length) {
    for (let i = 0; i <= Length * Length; i++) {
      if (input[i] > maxv) {
        maxv = input[i];
      }
      if (input[i] < minv) {
        minv = input[i];
      }
      dv = maxv - minv;
      if (dv < 1.2) {

        dv = 100;
      }
    }
    for (let i = 0; i <= Length * Length; i++) {
      output[i] = input[i] * (200 / dv);

    }
    dv = 0;
    maxv = 0;
    minv = 100;

  }


  return (
    // onPointerOver={hover} onPointerOut={unhover}
    <points position={[props.postitonX, props.postitonY, props.postitonZ]} rotation={[0, props.rotationY, 0]}>

      <bufferGeometry attach='geometry'>
        <bufferAttribute attachObject={['attributes', 'position']} count={positions.length / 3} array={positions}
          itemSize={3} />
        <bufferAttribute ref={attrib} attachObject={['attributes', 'color']} count={colors.length / 3} array={colors}
          itemSize={3} />
        {/*<bufferAttribute ref={attrib} attachObject={["attributes", "size"]} count={colors.length / 3} array={colors} itemSize={1} />*/}
      </bufferGeometry>
      <pointsMaterial map={spite} attach='material' vertexColors size={28} sizeAttenuation={true} transparent={true}
        alphaTest={0.8} />
    </points>
  );
}



// 由于canvas不能重新渲染，也不会重新渲染，但是如果直接改变父组件的state，整个组件都会重新渲染体验不好（闪频情况），于是用一个不渲染组件包起来
class Com extends React.Component {
  constructor(props) {
    super(props)
  }
  shouldComponentUpdate(nextProps) {
    return nextProps.valueg != this.props.valueg || nextProps.valuej != this.props.valuej
  }
  render() {
    return (
      <>{this.props.children}</>
    )
  }
}

function Data() {

}
let myChart1

let oldBedFetchData1 = '', oldBedFetchData2 = '', oldBedFetchData3 = '', oldBedFetchData4 = '', oldSleep = ''
class Anta extends React.Component {

  componentDidMount() {

    let oldTime = new Date().getTime();
    let change = true

    myChart1 = echarts.init(document.getElementById(`myChart1`));
    // moveArr = [1,2,3,4,5]
    
    // this.initCharts({ yData : moveArr, xData :dateArr,   index: 0 + 1, name: 0, myChart: myChart1, })

    // if (localStorage.getItem('id')) {
      let moveSmooth = 0
      // ws = new WebSocket('wss://sensor.bodyta.com/bed/' + localStorage.getItem('id'));
      // ws = new WebSocket('ws://sensor.bodyta.com/:8888/sensor/1')
      ws = new WebSocket('wss://sensor.bodyta.com/bed/' + '34ab95f5eb20');
      // ws = new WebSocket('ws://127.0.0.1:9999')
      ws.onopen = () => {
        // connection opened
        console.info('connect success');
      };
      ws.onmessage = (e) => {

        let num = 0
        lastWsArr = []
        let arr
        let jsonObject = JSON.parse(e.data);
        //处理空数组
  
        if (jsonObject.data != null) {
          wsPointData1 = jsonObject.data;
          wsPointData1 = wsPointData1.map((a) => { if (a < 20) { return 0 } else { return a } })
          wsPointData = addSide(wsPointData1, 32, 32, 2)
          let bedFetchData1 = bedStick1.dataStable(jsonObject.bodytaMove)
          let bedFetchData2 = bedStick2.dataStable(jsonObject.breath)
          let bedFetchData3 = jsonObject.leaveBed
          let bedFetchData4 = jsonObject.breathPause
          // this.bedFetchData1.current.children[0].style = 'unset' 
          if (oldBedFetchData4 != bedFetchData4) {
            // this.breathPause.current.innerHTML = bedFetchData4
          }


          if(bedFetchData3 == 0){
        
            if(!ti){
           
              ti = setTimeout(() => {
                this.footForm.current.innerHTML =Math.floor(14 +  Math.random()*3)
                ti = null
              },2000)
            }
            
            
          }else{
            this.footForm.current.innerHTML = '--'
          }
          if (oldBedFetchData3 != bedFetchData3 && bedFetchData3 == 0) {
            this.bedFetchData1.current.children[1].style.display = 'unset'
            this.bedFetchData1.current.children[0].style.display = 'none'
           
           
          } if (oldBedFetchData3 != bedFetchData3 && bedFetchData3 == 1) {
            this.bedFetchData1.current.children[1].style.display = 'none'
            this.bedFetchData1.current.children[0].style.display = 'unset'
         
          }
  
          if (moveArr.length < 100) {
            moveSmooth = moveSmooth + (jsonObject.bodytaMove - moveSmooth) / 10
            moveArr.push(moveSmooth > yMax ? yMax : moveSmooth)
            dateArr.push(new Date().getTime())
          } else {
            moveArr.shift()
            moveSmooth = moveSmooth + (jsonObject.bodytaMove - moveSmooth) / 10
            moveArr.push(moveSmooth > yMax ? yMax : moveSmooth)
          }
          // moveArr = [1,2,3,4,5]
  
          // this.initCharts({ yData: moveArr, xData: dateArr, index: 0 + 1, name: '体动', myChart: myChart1, })
          
          let leftAndRight = computeStoke([...jsonObject.data],[...oldWsData],32,32)
          let left = leftAndRight[0]
          let right = leftAndRight[1]
          
          leftStoke.addValue(left)
          rightStoke.addValue(right)
          
          let leftRes1 = leftStoke.computeValue(40)
          let rightRes1 = rightStoke.computeValue(40)
          reduce.addValue(Math.abs(leftRes1 - rightRes1))
         
          
            if((leftRes1 >= 25 && rightRes1 < 10) || (rightRes1 >= 25 && leftRes1 < 10) ){
              this.stroke.current.innerHTML = '危险'
            }else{
              this.stroke.current.innerHTML = '正常'
            }
     
            this.initCharts({ yData: reduce.stack, xData: [], index: 0 + 1, name: '中风', myChart: myChart1, })
          
          // if (oldBedFetchData2 != bedFetchData2) {
            // this.footForm.current.innerHTML = bedFetchData2 == 0 ? '--' : bedFetchData2
          // }
          
  
          oldBedFetchData1 = bedFetchData1
          oldBedFetchData2 = bedFetchData2
          oldBedFetchData3 = bedFetchData3
          oldBedFetchData4 = bedFetchData4
        } else {
          let bedFetchData3 = bedStick3.dataStable(jsonObject.predict)
          if (oldSleep != bedFetchData3) {
            this.train.current.innerHTML = bedFetchData3 == '平躺' ? '平躺' : '侧睡'
          }
          oldSleep = bedFetchData3
        }
  
  
        let wsSum = wsPointData1.reduce((a, b) => a + b, 0)
  
        if (timeArr.length < 2) {
          timeArr.push({
            num: wsSum > 350 ? 1 : 0,
            time: new Date().getTime(),
          })
        } else {
          timeArr.shift()
          timeArr.push({
            num: wsSum > 350 ? 1 : 0,
            time: new Date().getTime(),
          })
        }
        if (timeArr.every((a, index) => a.num == 1) && timeArr.length == 2) {
          timeSum += timeArr[1].time - timeArr[0].time
        }
        // this.setState({
        //     time: parseInt(timeSum / 1000)
        // })
        if (parseInt(lastTimeSum / 1000) != parseInt(timeSum / 1000)) {
          // this.setState({
          //   time : parseInt(timeSum / 1000)})
          this.pronation.current.innerHTML = parseInt(timeSum / 1000)
        }
        lastTimeSum = timeSum
  
  
  
  
  
      };
      ws.onerror = (e) => {
        // an error occurred
      };
      ws.onclose = (e) => {
        // connection closed
      };
    // }
    // ws = new WebSocket('wss://sensor.bodyta.com/bed/f4cfa2969408');


  }



  constructor(props) {
    super(props);
    this.start = React.createRef();
    this.drop = React.createRef();
    this.num = React.createRef();
    this.content = React.createRef();
    this.state = {
      fliter: 100,
      IDArr: [],
      ID: '',
      show: false,
      windowWidth: window.innerWidth,
      rotationY: window.innerWidth > 768 ? 0 : Math.PI / 2,
      postitonX: window.innerWidth > 768 ? 0 : 250,
      postitonY: window.innerWidth > 768 ? -300 : -250,
      postitonZ: window.innerWidth > 768 ? 200 : -450,
      time: 0,
      valuej: 400,
      valueg: 2,
      bedFetchData1: 0,
      bedFetchData2: 0,
      sleep: '',
      com: '',
      value: null,
      next: false,
      compute: [],
      twoNum: 5,
      res: [0, 0, 0, 0],
      data: 1,
      options: [{
        value: 1,
        label: '平躺'
      }, {
        value: 2,
        label: '趴睡'
      }, {
        value: 3,
        label: '左侧'
      }, {
        value: 4,
        label: '右侧'
      }],
      csvData: JSON.parse(localStorage.getItem('collection')) ? JSON.parse(localStorage.getItem('collection')) : [],
      number: 0,
      BData: []
    };
    this.bedFetchData1 = React.createRef();
    this.next = React.createRef();
    this.firstImg = React.createRef();
    this.computeRef = React.createRef();
    this.nextRef = React.createRef();
    this.firstImg = React.createRef();
    this.computeRef = React.createRef();
    this.leftOn = React.createRef();
    this.rightOn = React.createRef();
    this.leftIcon = React.createRef();
    this.rightIcon = React.createRef();
    this.canvas = React.createRef();
    this.lfc = React.createRef();
    this.balance = React.createRef();
    this.twoNum = React.createRef();
    this.leftPad = React.createRef();
    this.rightPad = React.createRef();
    this.leftInversion = React.createRef();
    this.rightInversion = React.createRef();
    this.footForm = React.createRef();
    this.train = React.createRef();
    this.pronation = React.createRef();
    this.footType = React.createRef();
    this.footRef = React.createRef();
    this.footZone = React.createRef();
    this.blaImg = React.createRef()
    this.press = React.createRef();
    this.breathPause = React.createRef();
    this.stroke = React.createRef();
  }


  componentWillUnmount() {
    if (ws) {
      ws.close();
    }

  }

  showBullet() {
    this.setState({
      show: !this.state.show
    })
    axios.get('https://sensor.bodyta.com/index/selectSensorByType?type=bed').then((res) => {

      this.setState({
        IDArr: res.data.data
      })
    })
  }

  bindId() {
    let oldTime = new Date().getTime();
    let change = true
    this.setState({
      show: !this.state.show
    })
    localStorage.setItem('id', this.state.ID)
    if (ws) {
      ws.close();
    }
    
   
  }

  setID(e) {
    this.setState({ ID: e })

  }

  initCharts(props) {


    let option = {
      animation: false,
      tooltip: {
        trigger: 'axis',
        show: 'true'
      },
      xAxis: {
        type: 'category',
        data: props.xData,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'transparent'
          },

        },
      },
      grid: {
        top: this.state.windowWidth > 768 ? 40 : 20,
        left: this.state.windowWidth > 768 ? 40 : 10,
        bottom: this.state.windowWidth > 768 ? 40 : 10,
        right: this.state.windowWidth > 768 ? 40 : 10
      },
      yAxis: {
        type: 'value',
        splitLine: { show: false },
        max: yMax,
        axisLabel: {
          show: true,
          textStyle: {
            color: 'transparent'
          },

        },
      },
      series: [
        {
          symbol: "none",
          data: props.yData,
          type: 'line',
          smooth: true,
          color: '#3591c3',


          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 1,
              x2: 0,
              y2: 0,
              colorStops: [{
                offset: 1, color: '#266689' // 0% 处的颜色
              }, {
                offset: 0, color: '#10152b' // 100% 处的颜色
              }],
              global: false // 缺省为 false
            }
          },

        },
        {

        }
      ],
    };

    option && props.myChart.setOption(option);

    window.addEventListener("resize", function () {
      props.myChart.resize();
    });
  }

  changeValueg(value) {
    this.setState({ valueg: value })
  }
  changeValuej(value) {
    this.setState({ valuej: value })
  }
  changeFliter(value) {
    this.setState({ fliter: value })
  }

  render() {
    // let stressCenter = computeResult['LPC'];
    // let balance = computeResult['balance'];

    // const url = require('../../assets/models/left.obj');
    // const url2 = require('../../assets/models/right.obj');

    return (
      <>

        <div ref={this.content} style={{ width: '100%', height: '100%', overflow: 'hidden', position: 'relative' }}>



          <div style={{ width: '100%', height: '100%', overflow: 'hidden' }} ref={this.canvas}>
            <Com valueg={this.state.valueg} valuej={this.state.valuej}>
              {/* <video src={video}></video> */}
              <Canvas
                gl={{ antialias: false, alpha: false }}
                style={{ width: '100%', height: '100%', backgroundColor: 'black' }}
                camera={{ zoom: 1, fov: 65, position: [0, 1400, 2], near: 1, far: 10000 }}
                raycaster={{ params: { Points: { threshold: 0.1 } } }}>

                <pointLight position={[-3000, 13000, -6000]} />
                <ambientLight intensity={0.01} />
                <color attach='background' args={['#070822']} />
                <Controls />

                <Particles
                  fliter={this.state.fliter}
                  postitonX={this.state.postitonX}
                  postitonY={this.state.postitonY}
                  postitonZ={this.state.postitonZ}
                  rotationY={this.state.rotationY}
                  valuej={this.state.valuej}
                  valueg={this.state.valueg}
                  props={this.props}
                  start={this.start}
                  first={this.firstImg}

                  next={this.nextRef} drop={this.drop}
                  canvas={this.canvas}

                  right={this.rightOn}
                  rightIcon={this.rightIcon}
                  leftIcon={this.leftIcon}
                  left={this.leftOn}

                  lfc={this.lfc}
                  balance={this.balance}
                  twonum={this.twoNum}
                  leftPad={this.leftPad}
                  rightPad={this.rightPad}
                  leftInversion={this.leftInversion}
                  rightInversion={this.rightInversion}
                  footForm={this.footForm}
                  train={this.train}
                  pronation={this.pronation}
                  footType={this.footType}
                  footRef={this.footRef}

                  footZone={this.footZone}
                  data={this.data}
                  chair={this.state.data}

                  blaImg={this.blaImg}
                  press={this.press}
                  pointCount={1024} />
                <Suspense fallback={
                  <>
                    <Box position={[0, 0, 0]} />

                  </>}>




                </Suspense>

              </Canvas>
            </Com>
          </div>

          <div className="content" >
            <div className="footCard">
              <div className="infoCard">
                <div className="box-card showCard footbgc " style={{ display: 'flex', flexDirection: 'row' }}>
                  <div className='flexcenter' style={{ flex: 1, borderRight: '2px solid black' }}>
                    <div className="text item footForm whiteColor flexTitle">呼吸</div>
                    <div ref={this.footForm} className="text item footTypeInfo textGradeColor iconText" >--</div>
                  </div>
                  <div className='flexcenter' style={{ flex: 1 }}>
                    <div className="text item footForm whiteColor flexTitle">在床时间</div>
                    <div ref={this.pronation} className="text item footTypeInfo textGradeColor iconText" >0</div>
                  </div>
                </div>
                <div className="box-card trainCard footbgc flexcenter">
                  <div className="text item trainType whiteColor flexTitle">在床状态</div>
                  <div className="text item trainTypeInfo textGradeColor iconText" style={{ width: '40%' }} ref={this.bedFetchData1}>
                    {/* <img ref={this.footType} src={normal} alt="" /> */}
                    {/* {this.state.bedFetchData1} */}
                    <img src="" src={on} style={{ display: 'none' }} alt="" />
                    <img src="" src={out} style={{ display: 'none' }} alt="" />
                  </div>
                </div>
              </div>
              <div className="detailInfoCard">
                <div className="footbgc cordCard">
                  <div className="cordText whiteColor">{`Core  `}</div>
                  <div className="cordProgress">
                    <div className="cordProgressAddress" ref={this.lfc} ></div>
                  </div>

                  {/* `calc(${  props ? props.props['LPA'] * 100 : 0}% + 20px)`} */}
                </div>
                <div className="moreInfoCard">
                  <div className="footInfo footbgc" style={{ position: 'relative' }}>
                    <div className="footText whiteColor" style={{ position: 'absolute', top: 8, left: 8 }}>中风风险趋势</div>
                    {/* <div className="footProgress"> */}
                    {/* <div className="footProgressAddress" ref={this.balance}></div> */}
                    <div id="myChart1" style={{ flex: 1 }}></div>
                    {/* </div> */}

                  </div>
                  <div className="trainInfo">
                    <div className="pronation footbgc " style={{ display: 'flex', flexDirection: 'row' }}>
                      <div className='flexcenter' style={{ flex: 1, borderRightWidth: 2, borderRight: 'solid black' }} >
                        <div className="pronationText whiteColor flexTitle">中风预警</div>
                        <div className="pronationInfo textGradeColor iconText" style={{ fontSize: this.state.windowWidth > 768 ? '30px' : '20px' }} ref={this.stroke} >正常</div>
                      </div>
                      <div className='flexcenter' style={{ flex: 1 }}>
                        <div className="pronationText whiteColor flexTitle">呼吸暂停</div>
                        <div className="pronationInfo textGradeColor iconText" style={{ fontSize: this.state.windowWidth > 768 ? '30px' : '20px' }} ref={this.breathPause}>正常</div>
                      </div>
                    </div>
                    {/* <div className='footbgc flexcenter'>
                        <div className="flexTitle"></div>
                      </div> */}
                    <div className="train footbgc flexcenter">
                      <div className="trainText whiteColor flexTitle">睡姿</div>
                      <div ref={this.train} style={{ fontSize: this.state.windowWidth > 768 ? '30px' : '20px' }} className="trainProportion textGradeColor iconText">
                        {/* {this.state.sleep} */}
                        <img src={side} style={{ display: 'none', height: '80%' }} alt="" />
                        <img src={sleep} style={{ display: 'none', height: '80%' }} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className="footModel footbgc"><Demo props={this.state.res} footZone={this.footZone} /></div>*/}


          </div>

        </div>
      </>
    )
  }
}

export default Anta;








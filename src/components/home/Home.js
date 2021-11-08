import React, { useState, useEffect } from 'react'
import './home.css'
import 'antd/dist/antd.css'
import { Modal, Input, Select, message, Radio, Button } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
import HeadImgSelect from '../headImgSelect/HeadImgSelect'
import { imgArr } from '../headImgSelect/HeadImgSelect'
export let allData
// import { obj } from '../../assets/js/ws'
const demoImgArr = ["b", "c", 'd', 'e', 'f', 'g', 'h']
const ticks = demoImgArr.map(item => require("../../assets/img/" + item + ".jpeg"))
console.log(ticks)

const { Option } = Select;

const funcArr = [{ text: '房间管理', icon: ' &#xe60f;' },
{ text: '今日一览', icon: '&#xe7d2;' },
{ text: '需求通报', icon: '&#xe6e4;' },
{ text: '其他功能', icon: '&#xe641;' }]

let info = [
    {
        name: 'jack',
        state: 'healthy',
        id: 101,
        onBedTime: '3h35min',
        breathe: '16',
        move: '10',
        stroke: false,
        img: ticks[0].default
    },


]



export default function Home() {
    const [normal, setNormal] = useState(true)
    const [isEditVisible, setIsEditVisible] = useState(false)
    const [isAddVisible, setIsAddVisible] = useState(false)
    const [userArr, setUserArr] = useState([])
    const [id, setId] = useState('')
    const [deviceId, setDeviceId] = useState('')
    const [nickName, setNickName] = useState('')
    const [headImg, setHeadImg] = useState('')
    const [roomId, setRoomId] = useState('')
    const [age, setAge] = useState('')
    const [gender, setGender] = useState(0)
    const [introduce, setIntroduce] = useState('')
    const [devicedArr, setDevicedArr] = useState([])
    const showEditModal = (data) => {
        setId(data.id)
        setDeviceId(data.deviceId)
        setNickName(data.nickName)
        setHeadImg(data.headImg)
        setRoomId(data.roomId)
        setAge(data.age)
        setGender(data.gender)
        setIntroduce(data.introduce)
        setIsEditVisible(true);
    };
    const handleEditOk = () => {

        console.log(id)
        axios.post(`http://sensor.bodyta.com:8888/insure/update?id=${id}&nickName=${nickName}&headImg=${headImg}&deviceId=${deviceId}&roomId=${roomId}&age=${age}&gender=${gender}&introduce=${introduce}`)
            .then((res) => {
                if (res.data.msg == 'success') {
                    message.success('修改成功');
                    setIsEditVisible(false);
                    axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
                        .then((res) => {
                            console.log(res.data.data)
                            setUserArr(res.data.data)
                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    message.error('网络错误');
                }

            }).catch(err =>{
                message.error('网络错误');
            })
    };
    const handleEditCancel = () => {

        // axios.post(`http://sensor.bodyta.com:8888/insure/deleteBed?id=${id}`).then((res) => {
        //     if(res.data.msg == 'success'){
        //         message.success('删除成功');
        //         setIsEditVisible(false);
        //         axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
        //         .then((res) => {
        //             console.log(res.data.data)
        //             setUserArr(res.data.data)
        //         }).catch(err => {
        //             console.log(err)
        //         })
        //     }else{
        //         message.error('网络错误');
        //     }



        // }).catch(err => console.log(err))


        setIsEditVisible(false);
    };

    const handleDelete = () => {
        axios.post(`http://sensor.bodyta.com:8888/insure/deleteBed?id=${id}`).then((res) => {
            if (res.data.msg == 'success') {
                message.success('删除成功');
                setIsEditVisible(false);
                axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
                    .then((res) => {
                        console.log(res.data.data)
                        setUserArr(res.data.data)
                    }).catch(err => {
                        console.log(err)
                    })
            } else {
                message.error('网络错误');
            }



        }).catch(err => {
            message.error('网络错误');
        })
    }

    const showAddModal = () => {
        setIsAddVisible(true);
        setId('')
        setDeviceId('')
        setNickName('')
        setHeadImg('')
        setRoomId('')
        setAge('')
        setGender('')
        setIntroduce('')
    };
    const handleAddOk = () => {
        if([nickName , deviceId,roomId].every ( a => a!='')){
            axios.post(`http://sensor.bodyta.com:8888/insure/insertBed?nickName=${nickName}&headImg=${headImg}&deviceId=${deviceId}&roomId=${roomId}&age=${age}&gender=${gender}&introduce=${introduce}`)
            .then((res) => {
                if (res.data.msg == 'success') {
                    setIsAddVisible(false);
                    message.success('添加成功');
                    axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
                        .then((res) => {
                            console.log(res.data.data)
                            setUserArr(res.data.data)
                        }).catch(err => {
                            console.log(err)
                        })
                } else {
                    message.error('网络错误');
                }

            }).catch(err => {
                message.error('网络错误');
            })
        }else{
            message.error(`${nickName == '' ? '名字' : ''} ${deviceId == '' ? '设备' : ''} ${roomId == '' ? '房间号' : ''}不能为空`);
        }
        
    };
    const handleAddCancel = () => {
        setIsAddVisible(false);
    };

    const changeValue = (e, value) => {
        console.log(e, value)
        if (value == 'id') {
            setId(e.target.value)
        }
        if (value == '设备Id') {
            setDeviceId(e.target.value)
        }
        if (value == '名字') {
            setNickName(e.target.value)
        }
        if (value == '头像') {
            setHeadImg(Number(e))
        }
        if (value == '房间号') {
            setRoomId(e.target.value)
        }
        if (value == '年龄') {
            setAge(e.target.value)
        }
        if (value == '性别') {
            setGender(e.target.value)
        }
        if (value == '介绍') {
            setIntroduce(e.target.value)
        }
    }

    function onChange(value) {
        setDeviceId(value)
    }
    function onChangeGender(e) {
        setGender(e.target.value)
    }

    function onBlur() {
        console.log('blur');
    }

    function onFocus() {
        console.log('focus');
    }

    function onSearch(val) {
        console.log('search:', val);
    }

    useEffect(() => {
        axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
            .then((res) => {
                console.log(res.data.data)
                setUserArr(res.data.data)
            }).catch(err => {
                console.log(err)
            })
    }, [])

    useEffect(() => {
        axios.get('http://sensor.bodyta.com:8888/index/selectSensorByType?type=bed')
            .then(res => {
                console.log(res, 'bed')
                if (res.data) {
                    setDevicedArr(res.data.data)
                }
            })
    }, [])
    const editList = [
        { label: '名字', value: nickName },
        { label: '设备Id', value: deviceId },
        { label: '房间号', value: roomId },
        { label: '年龄', value: age },
        { label: '性别', value: gender },
        { label: '介绍', value: introduce },
    ]
    const addList = [
        { label: '名字', value: nickName },
        { label: '设备Id', value: deviceId },
        { label: '房间号', value: roomId },
        { label: '年龄', value: age },
        { label: '性别', value: gender },
        { label: '介绍', value: introduce },
    ]

    useEffect(() => {
        const ws = new WebSocket('ws://sensor.bodyta.com:8888/insure/12')
        ws.onopen = () => {
            console.log('open')
        }
        ws.onmessage = (e) => {
            allData = JSON.parse(e.data)
            // console.log(allData)
        }
    }, [])

    

    return (
        <>
            <Modal title="编辑"
                visible={isEditVisible}
                okText={'确定'}
                cancelText={'取消'}
                onOk={handleEditOk}
                onCancel={handleEditCancel}
                footer={[
                    <Button key="back" onClick={handleEditCancel}>
                        取消
                    </Button>,
                    <Button key="delete" type="primary"
                        onClick={handleDelete}>
                        删除
                    </Button>,
                    <Button
                        key="sure"
                        type="primary"
                        onClick={handleEditOk}
                    >
                        确认
                    </Button>,
                ]}
            >
                <HeadImgSelect changeValue={changeValue} index={headImg} />
                {editList.map(item => {
                    return (
                        <div className='listItem' key={item.label}>
                            {
                                <> <span className='listLabel'>{item.label}:</span>
                                    {item.label == '性别'
                                        ? <Radio.Group onChange={onChangeGender} value={gender}>
                                            <Radio value={0}>男</Radio>
                                            <Radio value={1}>女</Radio>
                                        </Radio.Group>
                                        : item.label == '设备Id' ?
                                            <Select
                                                showSearch
                                                className='listInput'
                                                placeholder="选择设备id"
                                                optionFilterProp="children"
                                                value={item.value}
                                                onChange={onChange}
                                                onFocus={onFocus}
                                                onBlur={onBlur}
                                                onSearch={onSearch}
                                                filterOption={(input, option) =>
                                                    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                }

                                            >
                                                {devicedArr.map((item, index) => {
                                                    return (
                                                        <Option key={item.deviceId} value={item.deviceId}>{item.deviceId}</Option>
                                                    )
                                                })}
                                            </Select>
                                            : <div className='listInput'><Input placeholder={item.label} value={item.value} onChange={(e) => { changeValue(e, item.label) }} /></div>}</>
                            }
                        </div>
                    )
                })}
            </Modal>
            <Modal title="添加" okText={'确定'} cancelText={'取消'} visible={isAddVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                <HeadImgSelect changeValue={changeValue} index={headImg} />
                {addList.map(item => {
                    return (
                        <div className='listItem' key={item.label}>
                            {item.label == '性别'
                                        ? <> <span className='listLabel'>{item.label}:</span><Radio.Group onChange={onChangeGender} value={gender}>
                                            <Radio value={0}>男</Radio>
                                            <Radio value={1}>女</Radio>
                                        </Radio.Group></>
                                        : item.label == '设备Id'
                                ? <>
                                    <span className='listLabel'>{item.label}:</span>
                                    <Select
                                        className='listInput'
                                        showSearch
                                        value={deviceId}
                                        placeholder="选择设备id"
                                        optionFilterProp="children"
                                        onChange={onChange}
                                        onFocus={onFocus}
                                        onBlur={onBlur}
                                        onSearch={onSearch}
                                        filterOption={(input, option) =>
                                            option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                        }
                                    >
                                        {devicedArr.map((item, index) => {
                                            return (
                                                <Option key={item.deviceId} value={item.deviceId}>{item.deviceId}</Option>
                                            )
                                        })}
                                    </Select>
                                </>
                                : <> <span className='listLabel'>{item.label}:</span>
                                    <div className='listInput'>
                                        <Input placeholder={item.label} value={item.value} onChange={(e) => { changeValue(e, item.label) }} /></div></>}
                        </div>
                    )
                })}
            </Modal>
            <div className="homeTitle">
                <div className="homeTitleInfo">
                    <h1 style={{ color: '#fff' }}>照护站管理系统</h1>
                    <div className="funcList">
                        <div className='func borderRight'>
                            <i className='iconfont'>&#xe60f;</i>
                            房间管理
                        </div>
                        <div className='func borderRight'>
                            <i className='iconfont'>&#xe7d2;</i>
                            今日一览
                        </div>
                        <div className='func borderRight'>
                            <i className='iconfont'>&#xe6e4;</i>
                            需求通报
                        </div>
                        <div className='func'>
                            <i className='iconfont'>&#xe641;</i>
                            其他功能
                        </div>
                    </div>
                </div>



            </div>
            <div style={{ display: 'flex', flexDirection: 'row', padding: '40px 120px', backgroundColor: "#eee" }}>
                <div className="homeUsers">
                    {userArr.map((a, index) => {
                        return (
                            <div className="homeUser" key={a.nickName}>
                                <div className="homeUserItem">
                                    <div className="homeNumberTitle">
                                        <div className="homeNumber">{a.roomId}</div>
                                        <i className='iconfont' onClick={() => { showEditModal({ id: a.id, nickName: a.nickName, headImg: a.headImg, deviceId: a.deviceId, roomId: a.roomId, age: a.age, gender: a.gender, introduce: a.introduce }) }}>&#xe600;</i>
                                    </div>
                                    <Link to={`user/${a.deviceId}`}>
                                        <div className="homeInfo">
                                            <div className="homeImg">
                                                <img src={imgArr[Number(a.headImg)]} alt="" />
                                            </div>
                                            <div className="nameAndOther">
                                                <div className='userName'>{a.nickName}</div>
                                                <div>在床{a.onBedTime}</div>
                                                <div>风险:{a.stroke ? '危险' : '正常'}</div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        )
                    })}
                    <div className="homeUser" onClick={() => { showAddModal() }}>
                        <div className="homeUserItem addUser">
                            <i className='iconfont'>&#xe726;</i>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

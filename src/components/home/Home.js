import React, { useState, useEffect } from 'react'
import './home.css'
import 'antd/dist/antd.css'
import { Modal, Input } from 'antd'
import axios from 'axios'
import { Link } from 'react-router-dom'
// import { obj } from '../../assets/js/ws'
const demoImgArr = ["a", "b", "c", 'd', 'e', 'f', 'g', 'h']
const ticks = demoImgArr.map(item => require("../../assets/img/" + item + ".jpeg"))
console.log(ticks)
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
    const [gender, setGender] = useState('')
    const [introduce, setIntroduce] = useState('')
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
        setIsEditVisible(false);
        console.log(id)
        axios.post(`http://sensor.bodyta.com:8888/insure/update?id=${id}&nickName=${nickName}&headImg=${headImg}&deviceId=${deviceId}&roomId=${roomId}&age=${age}&gender=${gender}&introduce=${introduce}`)
            .then((res) => {
                axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
                    .then((res) => {
                        console.log(res.data.data)
                        setUserArr(res.data.data)
                    }).catch(err => {
                        console.log(err)
                    })
            })
    };
    const handleEditCancel = () => {
        setIsEditVisible(false);
    };

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
        setIsAddVisible(false);
        axios.post(`http://sensor.bodyta.com:8888/insure/insertBed?nickName=${nickName}&headImg=${headImg}&deviceId=${deviceId}&roomId=${roomId}&age=${age}&gender=${gender}&introduce=${introduce}`)
        .then(() => {
            axios.get('http://sensor.bodyta.com:8888/insure/selectBed')
            .then((res) => {
                console.log(res.data.data)
                setUserArr(res.data.data)
            }).catch(err => {
                console.log(err)
            })
        })
    };
    const handleAddCancel = () => {
        setIsAddVisible(false);
    };

    const changeValue = (e, value) => {
        console.log(value)
        if (value == 'id') {
            setId(e.target.value)
        }
        if (value == 'deviceId') {
            setDeviceId(e.target.value)
        }
        if (value == 'nickName') {
            setNickName(e.target.value)
        }
        if (value == 'headImg') {
            setHeadImg(e.target.value)
        }
        if (value == 'roomId') {
            setRoomId(e.target.value)
        }
        if (value == 'age') {
            setAge(e.target.value)
        }
        if (value == 'gender') {
            setGender(e.target.value)
        }
        if (value == 'introduce') {
            setIntroduce(e.target.value)
        }
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
    const editList = [
        { label: 'id', value: id },
        { label: 'nickName', value: nickName },
        { label: 'headImg', value: headImg },
        { label: 'deviceId', value: deviceId },
        { label: 'roomId', value: roomId },
        { label: 'age', value: age },
        { label: 'gender', value: gender },
        { label: 'introduce', value: introduce },
    ]
    const addList = [
        { label: 'nickName', value: nickName },
        { label: 'headImg', value: headImg },
        { label: 'deviceId', value: deviceId },
        { label: 'roomId', value: roomId },
        { label: 'age', value: age },
        { label: 'gender', value: gender },
        { label: 'introduce', value: introduce },
    ]
    return (
        <>
            <Modal title="编辑" visible={isEditVisible} onOk={handleEditOk} onCancel={handleEditCancel}>
                {editList.map(item => {
                    return (
                        <div className='listItem'>
                            <span className='listLabel'>{item.label}:</span>
                            {item.label == 'id' ? <span>{item.value}</span> : <Input className='listInput' placeholder={item.label} value={item.value} onChange={(e) => { changeValue(e, item.label) }} />}
                        </div>
                    )
                })}
            </Modal>
            <Modal title="添加" visible={isAddVisible} onOk={handleAddOk} onCancel={handleAddCancel}>
                {addList.map(item => {
                    return (
                        <div className='listItem'>
                            <span className='listLabel'>{item.label}:</span>
                            <Input className='listInput' placeholder={item.label} value={item.value} onChange={(e) => { changeValue(e, item.label) }} />
                        </div>
                    )
                })}
            </Modal>
            <div className="homeTitle">
                <div className="homeTitleInfo">
                    <h1 style={{ color: '#fff' }}>护士控台管理系统</h1>
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
                            <div className="homeUser">
                                <div className="homeUserItem">
                                    <div className="homeNumberTitle">
                                        <div className="homeNumber">{a.roomId}</div>
                                        <i className='iconfont' onClick={() => { showEditModal({ id: a.id, nickName: a.nickName, headImg: a.headImg, deviceId: a.deviceId, roomId: a.roomId, age: a.age, gender: a.gender, introduce: a.introduce }) }}>&#xf0213;</i>
                                    </div>
                                    <Link to={`/${a.deviceId}`}>
                                    <div className="homeInfo">
                                        <div className="homeImg">
                                            <img src={a.img} alt="" />
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

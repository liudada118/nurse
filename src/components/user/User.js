import React, { useState } from 'react'
import Img from '../../assets/img/a.jpeg'
import './user.css'
import System from '../antapage/AntaCanvasFull32-64 copy'
import Sleep from './sleep/Sleep1'
import History from './history/History'

const stateItem = ['实时状态', '睡眠报告', '历史报告']
export default function User() {
    const [state, setState] = useState(1)
    return (
        <div className="userPage">
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
                <div className="userTitle">
                    {/* <div className="userTitleItem">实时状态</div>
                    <div className="userTitleItem">睡眠报告</div>
                    <div className="userTitleItem">历史报告</div> */}
                    {
                        stateItem.map((item, index) => {
                            return (
                                <div className="userTitleItem" style={{ backgroundColor: state == index ? '#91cff3' : 'unset' ,     color: state == index ? '#fff' : 'unset' }}  onClick={() => { setState(index) }}>
                                    <div className="userTitleItemBorder">
                                        <div className='userTitleItemBox' > {item}</div>
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="userContent">
                    {state == 0 ? <System /> : state == 1 ? <Sleep /> : <History />}
                </div>
            </div>
        </div>
    )
}

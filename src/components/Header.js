import React from 'react';
import imgList from '../images/listing.png'
import {Link, Route} from 'react-router-dom'
import Lists from './Lists';
import store from '../store';

// import Router from '../router'

export default class Header extends React.Component{
    constructor(props){
        super(props)
        this.state={
            img:0,
            num:0,//列表下标
            listData:[],//列表数据
            lists:[],//列表内容
        }
        // console.log(this.props,111)
    }
    // 页面加载获取新闻列表信息
    componentDidMount(){
        React.axios.get('https://api03.6bqb.com/toutiao/category?apikey=E62B95523DD8E5ADD92A2B006D94D46D',{
        params:{
        }   
        }).then(res=>{
            this.setState({
                listData:res.data.data,//列表数据
                
            })
        })
        this.getdata()
    }
    // 列表点击事件
    getlist(){
        if(this.state.img===0){
            var x=1
        }else{
            x=0
        }
        this.setState({
            img:x
        })
    }
    onRef = (ref) => {
        this.child = ref
    }
    //获取当前数据
    getdata(i=0,key='__all__'){
        this.setState({
            num:i,
            img:0
        })
        this.child.getdata(key)
    }
    render(){
        return(
            <div className='content'>
                {/* 头部 */}
                <div className='header'>
                    <div className='head-img' onClick={this.getlist.bind(this)}>
                        <img src={imgList} alt="" className={this.state.img===0?'':'anm'} />
                    </div>
                    <div className='head-txt'>
                        News
                    </div>
                </div>
                {/* 隐藏列表 */}
                <div className={this.state.img===0?'hide showL':'show showL'}>
                    {/* <div className='show-li'>首页</div> */}
                    {
                        this.state.listData.map((item,index)=>
                    <div className='show-li' key={index} onClick={this.getdata.bind(this,index,item.key)}>
                        <Link to={'/app/'+item.key} className={this.state.num===index?'color-li':''}>{item.value}</Link>
                    </div>
                        )
                    }
                </div>
                {/* 列表 */}
                <div className={this.state.img===0?'lists':'hig lists'}> 
                    <div className='list'>
                        {
                            this.state.listData.map((item,index)=>
                            <div className='lis' key={index} onClick={this.getdata.bind(this,index,item.key)}>
                                <Link to={'/app/'+item.key} className={this.state.num===index?'color-li':''}>{item.value}</Link>
                            </div>
                            )
                        }
                    </div>
                </div>

                {/* 列表内容 */}
                {/* {this.props.children} */}
                <Lists  onRef={this.onRef}></Lists>
            </div>

        )
    }
}
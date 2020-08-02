import React from 'react';
import ass from '../images/ass.jpg';
import {Link} from 'react-router-dom';
import imgtxt from '../images/txt.png'
// import store from '../store';
// import Router from './router'

export default class Lists extends React.Component{
    constructor(props){
        super(props)
        this.state={
            lists:[],
            num:20,//页数
            tag:null,//当前标签
        }
        // console.log(store.getState())
    }
    componentDidMount(){
        this.props.onRef(this)
    }
    // 获取数据
    getdata(i){
        React.axios.get('https://api03.6bqb.com/toutiao/search?apikey=E62B95523DD8E5ADD92A2B006D94D46D&tag='+i+'&page='+this.state.num,{
        params:{
        }   
        }).then(res=>{
            // console.log(res.data.data)
            this.setState({
                lists:res.data.data,
                tag:i
            })
        })
    }
    // 加载更多
    bmore(){
        var i=20+this.state.num
        this.setState({
            num:i
        })
        this.getdata(this.state.tag)
    }
    render(){
        return(
            <div className='lists-c'>
                {
                    this.state.lists.map((item,index)=>
                    
                        <div className='lst' key={index}>
                            <Link to={'/detail/'+item.real_id}>
                                <div className='lst-img'>
                                    <img src={item.media_info.avatar_url} alt='' />
                                </div>
                                <div className='lst-txt'>
                                    {item.title}
                                </div>
                                <div className='lst-bom'>
                                    <img src={imgtxt} alt="" className='bom-txt' />
                <span className='bom-num'>{item.read_count}</span>
                <span className='bom-br'>{item.source}</span>
                                </div>
                            </Link>
                            
                        </div>
                    )
                }
                <div className='lst'>
                    <Link to='/detail/123'>
                        <div className='lst-img'>
                            <img src={ass} alt='' />
                        </div>
                        <div className='lst-txt' onClick={this.getdata.bind(this)}>
                        “中国太大、经济太强、科技太先进，制裁没用”
                        </div>
                        <div className='lst-bom'>
                            <img src={imgtxt} alt="" className='bom-txt' />
                            <span className='bom-num'>123</span>
                            <span className='bom-br'>中国新闻</span>
                        </div>
                    </Link>
                </div>
                {/* 加载更多 */}
                <div className='but-more'>
                    <div className='more-t' onClick={this.bmore.bind(this)}>换一批</div>
                </div>
            </div>
        )
    }
}
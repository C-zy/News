import React from 'react';
import {Link} from 'react-router-dom';
import imgHome from '../images/home.png';
import imgTop from '../images/top.png';
import imgQq from '../images/qq.png';
import imgQqk from '../images/qqk.png';
import imgWechat from '../images/wechat.png';
import imgWechatk from '../images/wechatk.png';
import imgWb from '../images/wb.png';
import ass from '../images/ass.jpg';

export default class Detail extends React.Component{
    constructor(props){
        super(props)
        this.state={
            cont:null,//内容
            tit:null,//标题
            ope:0,//展开
            texts:[],//评论
            textn:0,//评论长度
        }
    }
    componentDidMount(){
        // console.log(this.props.match.params.id)
        this.getdata(this.props.match.params.id)
    }
    // 获取数据
    getdata(i){
        // 内容
        React.axios.get('https://api03.6bqb.com/toutiao/detail?itemId='+i+'&apikey=E62B95523DD8E5ADD92A2B006D94D46D',{
        params:{
        }   
        }).then(res=>{
            // console.log(res.data.data)
            this.setState({
                cont:res.data.data.content,
                tit:res.data.data.title,
                textn:res.data.data.comment_count
            })
        })
        // 评论
        React.axios.get('https://api03.6bqb.com/toutiao/comment?apikey=E62B95523DD8E5ADD92A2B006D94D46D&itemId='+i+'&page=1',{
        params:{
        }   
        }).then(res=>{
            // console.log(res.data.data)
            if(res.data.data!=='没有更多数据'){
                this.setState({
                    texts:res.data.data
                })
            }
            
        })
    }
    // 展开
    open(){
        this.setState({
            ope:1
        })
    }
    // 返回顶部
    totop(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
    render(){
        return (
            <div className='content'>
                {/* 返回头部 */}
                <div className='top' onClick={this.totop.bind(this)}>
                    <img src={imgTop} alt="" />
                </div>
                {/* 头部 */}
                <div className='header'>
                    <div className='head-img'>
                        <Link to={'/app/__all__'}>
                            <img src={imgHome} alt="" />
                        </Link>
                    </div>
                    <div className='head-txt'>
                        News
                    </div>
                </div>
                {/* 标题 */}
                {/* 测试 */}
                {/* <div className='title'>
                时政新闻眼丨​上亿市场主体注意了！习近平在座谈会上为你们“减压”“加油”
                </div> */}
                <div className='title'>{this.state.tit}</div>
                {/* 时间 */}
                <div className='time'>
                2020-07-22 08:34:25
                </div>
                {/* 内容 */}
                <div className={this.state.ope===0?'de-cont nopen':'de-cont'} dangerouslySetInnerHTML={{__html:this.state.cont}}></div>
                {/* 测试 */}
                {/* <div className={this.state.ope===0?'de-cont nopen':'de-cont'}>
                    <p>2015年，习近平曾到杭州市海康威视数字技术股份有限公司视察，强调企业持续发展之基、市场制胜之道在于创新。作为公司董事长，陈宗年对总书记的嘱托记忆深刻2015年，习近平曾到杭州市海康威视数字技术股份有限公司视察，强调企业持续发展之基、市场制胜之道在于创新。作为公司董事长，陈宗年对总书记的嘱托记忆深刻。2015年，习近平曾到杭州市海康威视数字技术股份有限公司视察，强调企业持续发展之基、市场</p>
                </div> */}
                {/* 点击展开全文 */}
                <div className={this.state.ope===0?'more':'hides'} onClick={this.open.bind(this)}>
                    <div className='s-box'></div>
                    <div>点击展开全文</div>
                </div>
                {/* 分享 */}
                <div className='share'>
                    <div className='share-t'>
                        分享到
                    </div>
                    <div className='share-img'>
                        <div className='share-i'>
                            <img src={imgQq} alt="" />
                        </div>
                        <div className='share-i'>
                            <img src={imgQqk} alt="" />
                        </div>
                        <div className='share-i'>
                            <img src={imgWechat} alt="" />
                        </div>
                        <div className='share-i'>
                            <img src={imgWechatk} alt="" />
                        </div>
                        <div className='share-i'>
                            <img src={imgWb} alt="" />
                        </div>
                    </div>
                </div>

                {/* 评论 */}
                <div className='comments'>
                    <div className='com-title'>
                        热门评论{this.state.textn}条
                    </div>
                    {/* 评论内容 */}
                    {
                        this.state.texts.map((item,index)=>
                            <div className='com-user' key={index}>
                                <div className='user-t'>
                                    <img src={item.user.avatar_url} alt="" />
                                    <span>{item.user.name}</span>
                                </div>
                                <div className='user-cont'>
                                    <div>{item.text}</div>
                                    <div className='cont-time'>
                                        <span className='fl'>3小时前</span>
                                        <div className='cont-tt fr'>
                                            <span>查看回复 {item.reply_count}</span>
                                            <span>回复</span>
                                            <span>举报</span>
                                            <span>踩</span>
                                            <span>赞 {item.digg_count}</span>
                                            <span>收藏</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    }


                    {/* <div className='com-user'>
                        <div className='user-t'>
                            <img src={ass} alt="" />
                            <span>这是一个名字</span>
                        </div>
                        <div className='user-cont'>
                            <div>察，强调企业持续发展之基、市场制胜之道在于创新。作为公司董事长，陈宗年对总书记的嘱托记忆深刻2015年，</div>
                            <div className='cont-time'>
                                <span className='fl'>3小时前</span>
                                <div className='cont-tt fr'>
                                    <span>查看回复</span>
                                    <span>回复</span>
                                    <span>举报</span>
                                    <span>踩</span>
                                    <span>赞</span>
                                    <span>收藏</span>
                                </div>
                            </div>
                        </div>
                    </div> */}

                </div>
            </div>
        )
    }
}
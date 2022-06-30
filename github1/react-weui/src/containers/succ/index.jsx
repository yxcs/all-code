import React, {Component} from 'react'; // 引入了React和PropTypes
// import './index.less';


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props) {
        super(props);
        document.title = '账号注册';
    }

    componentDidMount() {

    }



    render() {
        // const options = this.state.positions && this.state.positions.map(function (model) {
        //         return <option key={model.id} value={model.id}>{model.bdName}</option>
        //     });
        return (
            <div className="page">
                <div className="weui-msg">
                    <div className="weui-msg__icon-area"><i className="weui-icon-success weui-icon_msg"></i></div>
                    <div className="weui-msg__text-area">
                        <h2 className="weui-msg__title">申请成功</h2>
                        <p className="weui-msg__desc mg-top20">将尽快与您取得联系！</p>
                        <p style={{'margin':'50px 0'}}><a href="http://www.linkingmed.com" style={{'color':'#408ee6'}}>《如何登录？》</a></p>
                    </div>
                    <div className="weui-msg__opr-area">
                        <p className="weui-btn-area">
                            <a href="javascript:history.back();" className="weui-btn weui-btn_primary">关闭</a>
                        </p>
                    </div>
                </div>
            </div>
        );
    }
}


export default Main;
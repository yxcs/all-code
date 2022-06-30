import React, {Component} from 'react'; // 引入了React和PropTypes
import logo from '../../assets/logo.png';
import './index.less';
import {showTip} from '../../redux/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {browserHistory} from 'react-router';
import url from '../../config/ip/image';
import xhr from '../../services/xhr/index';


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: true,
            checkState: '获取验证码',
            telValid: false
        };
    }

    componentDidMount() {
        this.showTip = this.props.showTip;
    }

    handleChange() {
        this.setState({checked: !this.state.checked});
    }

    checkTel() {
        if (/^1[34578]\d{9}$/.test(this.refs.tel.value)) {
            this.setState({telValid: true});
        }
    }

    getCode() {
        if (!(/^1[34578]\d{9}$/.test(this.refs.tel.value))) {
            this.show({text: '请输入正确手机号', show: true});
            return false;
        }
        if (!this.state.telValid) {
            this.show({text: '手机号码已注册', show: true})
            return false;
        }
        if (this.state.checkState != '获取验证码') {
            return false;
        }
        let count = 60;
        let timer = '';
        let sleep = () => {
            if (count <= 0) {
                clearTimeout(timer);
                this.setState({checkState: '获取验证码'});
                return;
            }
            count--;
            this.setState({checkState: count + 's'});
            timer = setTimeout(sleep, 1000);
        }

        sleep();
        xhr.get(url.getCode, {phoneNumber: this.refs.tel.value}, () => {
        })
    }

    submit() {
        const {tipMsg} = this.props;
        if (tipMsg.show) {
            return false;
        }
        if (!(/^1[34578]\d{9}$/.test(this.refs.tel.value))) {
            this.show({text: '手机号码必填', show: true});
            return false;
        }

        if (!this.refs.checkcode.value) {
            this.show({text: '验证码必填', show: true});
            return false;
        }
        if (!this.refs.psw.value) {
            this.show({text: '密码必填', show: true});
            return false;
        }
        if (!this.state.checked) {
            this.show({text: '请勾选协议', show: true});
            return false;
        }
        browserHistory.push('/info/2');
        // xhr.post(url.regist, {
        //     account: this.refs.tel.value,
        //     password: this.refs.psw.value,
        //     checkCode: this.refs.checkcode.value
        // }, (data) => {
        //     switch (data.errcode) {
        //         case 0:
        //
        //             break;
        //         default:
        //             this.show({text: data.errmsg, show: true});
        //     }
        // }, {headers: {'Content-Type': 'application/x-www-form-urlencoded'}})
    }

    show(a) {
        this.showTip(a);
        setTimeout(() => {
            this.showTip({text: '', show: false})
        }, 1500)
    }

    render() {
        return (
            <div>
                <div className="imgBox">
                    <img src={logo} alt=""/>
                </div>
                <div className="weui-cells weui-cells_form">
                    <div className="weui-cell">
                        <div className="weui-cell__hd"><label className="weui-label">手机号</label></div>
                        <div className="weui-cell__bd">
                            <input className="weui-input" ref="tel" type="number" pattern="[0-9]*"
                                   onChange={() => {
                                       this.checkTel()
                                   }} placeholder="请输入手机号"/>
                        </div>
                    </div>
                    <div className="weui-cell weui-cell_vcode">
                        <div className="weui-cell__hd">
                            <label className="weui-label">验证码</label>
                        </div>
                        <div className="weui-cell__bd">
                            <input className="weui-input" ref="checkcode" type="number" placeholder="请输入验证码"/>
                        </div>
                        <div className="weui-cell__ft">
                            <button className="weui-vcode-btn" onClick={() => {
                                this.getCode()
                            }}>{this.state.checkState}</button>
                        </div>
                    </div>
                    <div className="weui-cell">
                        <div className="weui-cell__hd"><label className="weui-label">密码</label></div>
                        <div className="weui-cell__bd">
                            <input className="weui-input" type="password" ref="psw" placeholder="设置6位以上登录密码"/>
                        </div>
                    </div>
                </div>
                <label className="weui-agree">
                    <input id="weuiAgree" type="checkbox" checked={this.state.checked} value={1}
                           onChange={() => this.handleChange()} className="weui-agree__checkbox"/>
                    <span className="weui-agree__text">
                            已阅读并同意<a>《xxxx协议》</a>
                    </span>
                </label>
                <div className="weui-btn-area">
                    <a className="weui-btn weui-btn_primary" onClick={() => this.submit()}>下一步</a>
                </div>
            </div>
        );
    }
}

// let select = state => {
//     return state
// };

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showTip: showTip
    }, dispatch);
}

export default connect((state) => state, mapDispatchToProps)(Main);
import React, {Component} from 'react'; // 引入了React和PropTypes
// import './index.less';
import {showTip} from '../../redux/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import url from '../../config/ip/image';
import xhr from '../../services/xhr/index';
import {Link, browserHistory} from 'react-router'


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: true
        };
        document.title = '完善信息';
    }

    componentDidMount() {
        this.showTip = this.props.showTip;
        this.getPosition();
        this.getJob();
        if (this.props.location.state) {
            this.setState({
                posValue: this.props.location.state.pos,
                jobValue: this.props.location.state.job
            });
            this.refs.name.value = this.props.location.state.name
        }
    }

    getPosition() {
        xhr.get(url.dicts, {bdType: 'position', applicationId: '0', mechanismId: '0'}, (data) => {
            this.setState({
                positions: data.respData
            });
        })
    }

    getJob() {
        xhr.get(url.dicts, {bdType: 'user_type', applicationId: '0', mechanismId: '0'}, (data) => {
            this.setState({
                jobs: data.respData
            });
        })
    }

    // getProduct() {
    //     xhr.get(url.dicts, {bdType: 'user_type', applicationId: '0', mechanismId: '0'}, (data) => {
    //         this.setState({
    //             jobs: data
    //         });
    //     })
    // }

    // handleChange() {
    //     this.setState({checked: !this.state.checked});
    // }

    show(a) {
        this.showTip(a);
        setTimeout(() => {
            this.showTip({text: '', show: false})
        }, 1500)
    }

    submit() {
        // const {tipMsg} = this.props;
        // if (tipMsg.show) {
        //     return false;
        // }
        if (!this.refs.name.value) {
            this.show({text: '姓名必填', show: true});
            return false;
        }
        if (!this.state.jobValue) {
            this.show({text: '职业必选', show: true});
            return false;
        }
        if (!this.state.posValue) {
            this.show({text: '职称必选', show: true});
            return false;
        }
        if (!this.props.Hospital.bdName) {
            this.show({text: '医院必选', show: true});
            return false;
        }
        if (!this.props.Departments.bdName) {
            this.show({text: '科室必选', show: true});
            return false;
        }
        const sendMsg = {
            departmentId: this.props.Departments.id,
            hospitalId: this.props.Hospital.id,
            userName: this.refs.name.value,
            userTypeId: this.state.jobValue,
            jobTitleId: this.state.posValue,
            userId: this.props.params.id,
            appIds: [3]
        }
        xhr.post(url.info, sendMsg, () => {
            browserHistory.push('/succ');
        })
    }

    linkTo(url) {
        const urlData = {
            name: this.refs.name.value,
            job: this.state.jobValue,
            pos: this.state.posValue
        }
        browserHistory.push({pathname: url, state: urlData});
    }

    render() {
        const hospital = this.props.Hospital.bdName;
        const department = this.props.Departments.bdName;
        const options_job = this.state.positions && this.state.positions.map(function (model) {
                return <option key={model.id} value={model.id}>{model.bdName}</option>
            });
        const options_pos = this.state.jobs && this.state.jobs.map(function (model) {
                return <option key={model.id} value={model.id}>{model.bdName}</option>
            });
        return (
            <div>
                <div className="weui-cells__title">基本信息</div>
                <div className="weui-cells">
                    <div className="weui-cell">
                        <div className="weui-cell__hd"><label className="weui-label">姓名</label></div>
                        <div className="weui-cell__bd">
                            <input className="weui-input" type="text" ref='name'
                                   placeholder="请填写姓名"/>
                        </div>
                    </div>
                    <div className="weui-cell weui-cell_select weui-cell_select-after">
                        <div className="weui-cell__hd">
                            <label htmlFor="" className="weui-label">职业</label>
                        </div>
                        <div className="weui-cell__bd">
                            <select className="weui-select" name="select2"
                                    onChange={event => this.setState({
                                        jobValue: event.target.value
                                    })}
                                    value={this.state.jobValue}>
                                <option value=""></option>
                                {options_job}
                            </select>
                        </div>
                    </div>
                    <div className="weui-cell weui-cell_select weui-cell_select-after">
                        <div className="weui-cell__hd">
                            <label htmlFor="" className="weui-label">职称</label>
                        </div>
                        <div className="weui-cell__bd">
                            <select className="weui-select" name="select2"
                                    onChange={event => this.setState({
                                        posValue: event.target.value
                                    })}
                                    value={this.state.posValue}>
                                <option value=""></option>
                                {options_pos}
                            </select>
                        </div>
                    </div>

                </div>
                <div className="weui-cells__title">所在机构</div>
                <div className="weui-cells">
                    <Link className="weui-cell weui-cell_access" onClick={() => {
                        this.linkTo('/selectHos/1/' + this.props.params.id + '/')
                    }}>
                        <div className="weui-cell__bd">
                            <p>医院</p>
                        </div>
                        <div className="weui-cell__ft">{hospital || '请选择医院'}</div>
                    </Link>
                    <Link className="weui-cell weui-cell_access" onClick={() => {
                        this.linkTo('/selectHos/2/' + this.props.params.id + '/')
                    }}>
                        <div className="weui-cell__bd">
                            <p>科室</p>
                        </div>
                        <div className="weui-cell__ft">{department || '请选择科室'}</div>
                    </Link>
                </div>
                {/*<div className="weui-cells__title">申请产品</div>*/}
                {/*<div className="weui-cells weui-cells_checkbox">*/}
                {/*{}*/}
                {/*<label className="weui-cell weui-check__label" htmlFor="s11">*/}
                {/*<div className="weui-cell__hd">*/}
                {/*<input type="checkbox" className="weui-check" name="checkbox1" id="s11"/>*/}
                {/*<i className="weui-icon-checked"></i>*/}
                {/*</div>*/}
                {/*<div className="weui-cell__bd">*/}
                {/*<p>standard is dealt for u.</p>*/}
                {/*</div>*/}
                {/*</label>*/}
                {/*</div>*/}
                <div className="weui-btn-area">
                    <a className="weui-btn weui-btn_primary" onClick={() => this.submit()}>下一步</a>
                </div>

            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        Hospital: state.Hospital,
        Departments: state.Departments
    }
}
const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        showTip: showTip
    }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);
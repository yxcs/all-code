import React, {Component} from 'react'; // 引入了React和PropTypes
// import './index.less';
import {Hospital, Departments} from '../../redux/action';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import url from '../../config/ip/image';
import xhr from '../../services/xhr/index';
import {browserHistory} from 'react-router';


/* 以类的方式创建一个组件 */
class Main extends Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            checked: true
        };
        document.title = this.props.params.id == 1 ? '选择医院' : '选择科室';
    }

    componentDidMount() {
        this.hospital = this.props.hospital;
        this.department = this.props.department;
        this.getlist();
        console.log(this.props.location.state)
    }

    getlist(v) {
        const type = this.props.params.id;
        xhr.get(url.dicts, {
            bdType: type == 1 ? 'hospital' : 'department',
            applicationId: '0',
            mechanismId: '0',
            bdName: v ? v : null
        }, (data) => {
            this.searchFlag = false;
            this.setState({
                lists: data.respData
            });
        })
    }

    searchFocus() {
        this.refs.searchBar.className += ' weui-search-bar_focusing';//class 前面的空格是必须的。。
        this.refs.searchInput.focus();
    }

    searchCancel() {
        this.refs.searchBar.className = 'weui-search-bar';
        this.refs.searchInput.blur();
        this.refs.searchInput.value = '';
    }

    chooseItem(v) {
        this.props.params.id == 1
            ? this.hospital(v)
            : this.department(v)
        browserHistory.push({ pathname: '/info/' + this.props.params.user, state: this.props.location.state});
    }

    filterText() {
        if (!this.searchFlag) {
            this.getlist(this.refs.searchInput.value)
            this.searchFlag = true;
        }
    }


    render() {
        // const options = this.state.positions && this.state.positions.map(function (model) {
        //         return <option key={model.id} value={model.id}>{model.bdName}</option>
        //     });
        return (
            <div className="page">
                <div className="page__bd">
                    <div className="weui-search-bar" ref="searchBar">
                        <form className="weui-search-bar__form">
                            <div className="weui-search-bar__box">
                                <i className="weui-icon-search"></i>
                                <input type="search" className="weui-search-bar__input" ref="searchInput"
                                       onChange={() => {
                                           this.filterText()
                                       }} placeholder="医院名称" required/>
                                <a href="javascript:" className="weui-icon-clear" id="searchClear" onClick={() => {
                                    this.refs.searchInput.value = '';
                                    this.refs.searchInput.focus();
                                }}></a>
                            </div>
                            <label className="weui-search-bar__label" id="searchText" onClick={() => {
                                this.searchFocus()
                            }}>
                                <i className="weui-icon-search"></i>
                                <span>搜索</span>
                            </label>
                        </form>
                        <a href="javascript:" className="weui-search-bar__cancel-btn" id="searchCancel" onClick={() => {
                            this.searchCancel()
                        }}>取消</a>
                    </div>
                    <div className="weui-cells searchbar-result" id="searchResult">
                        {this.state.lists && this.state.lists.map(v => {
                            return <div key={v.id} className="weui-cell weui-cell_access" onClick={() => {
                                this.chooseItem(v)
                            }}>
                                <div className="weui-cell__bd weui-cell_primary">
                                    <p >{v.bdName}</p>
                                </div>
                            </div>
                        })}
                    </div>
                </div>

            </div>
        );
    }
}

const select = state => {
    return state
};

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        hospital: Hospital,
        department: Departments
    }, dispatch);
}


export default connect(select, mapDispatchToProps)(Main);
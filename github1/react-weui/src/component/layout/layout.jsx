import React, {Component} from 'react'; // 引入了React和PropTypes。PropTypes是用于检查props参数类型，可有可无，最好是有

import {is, fromJS} from 'immutable';

import {connect} from 'react-redux';


// 公共底部
// import {Lfooter} from './lfooter';

// 布局样式


// const SubMenu = Menu.SubMenu;

/**
 * (路由根目录组件，显示当前符合条件的组件)
 *
 * @class Main
 * @extends {Component}
 */
class Main extends Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        // const {showTip} = this.props;
        // console.log(this.props)
    }

    shouldComponentUpdate(nextProps, nextState) {
        return !is(fromJS(this.props), fromJS(nextProps)) || !is(fromJS(this.state), fromJS(nextState))
    }

    render() {
        console.log(this.props)
        // 这个组件是一个包裹组件，所有的路由跳转的页面都会以this.props.children的形式加载到本组件下
        const {msg} = this.props;
        return (
            <div className="container">
                <div ref="test" className="weui-toptips weui-toptips_warn"
                     style={{'display': msg.show ? 'block' : 'none'}}>{msg.text}</div>
                <div className="page">{this.props.children}</div>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        msg: state.tipMsg,
    }
}

export default connect(mapStateToProps)(Main);
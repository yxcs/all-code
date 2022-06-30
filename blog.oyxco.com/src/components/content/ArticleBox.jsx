import React from 'react';
import ReactMarkdown from 'react-markdown'
import './content.scss';
import CodeBlock from '../md/CodeBlock'
import HeadingBlock from '../md/HeadingBlock'
class ArticleBox extends React.Component {
  state = {
    md: ''
  }
  componentDidMount() {
    fetch('/docs/api.md')
      .then(response => {
        return response.text()
      })
      .then(res => {
        console.log(res)
        this.setState({ md: res })
      })
  }
  render() {
    return (
      <div className="article__box--wrap">
        <div className="title">搭建vue脚手架-02vue介绍</div>
        <div className="desc">
          <span>前端</span>
          <span>vue</span>
          <span>2020/12/20</span>
        </div>
        <div className="content">
          <ReactMarkdown
            source={this.state.md}
            escapeHtml={false}
            renderers={{
              code: CodeBlock,
              heading: HeadingBlock
            }}
          />
        </div>
      </div>
    )
  }
}

export default ArticleBox;

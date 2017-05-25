import React, { PropTypes } from 'react';
import cn from 'classnames';
import Markdown from './index';

const MarkdownPage = ({ style, className, markdownStyle, markdownClassName, markdown }) => (
  <section style={style} className={cn('md-grid', className)}>
    <Markdown style={markdownStyle} className={cn('md-text-container', markdownClassName)} markdown={markdown} component="div" />
  </section>
);

MarkdownPage.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
  markdownStyle: PropTypes.object,
  markdownClassName: PropTypes.string,
  markdown: PropTypes.string,
};

MarkdownPage.defaultProps = {
  markdown: '',
};

export default MarkdownPage;

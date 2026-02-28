import React from 'react';

const TAG_CLASS = {
  state: 'tag-state',
  timing: 'tag-timing',
  data: 'tag-data',
  dom: 'tag-dom',
  utility: 'tag-utility',
};

export default function DemoCard({ title, category, children }) {
  return (
    <div className='demo-card' data-category={category}>
      <div className='card-header'>
        <h3>{title}</h3>
        <span className={`card-tag ${TAG_CLASS[category]}`}>{category}</span>
      </div>
      <div className='card-body'>{children}</div>
    </div>
  );
}

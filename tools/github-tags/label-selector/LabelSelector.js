import React, { useState } from 'react';
import './LabelSelector.css';

// 초기 라벨 데이터
const initialLabels = [
  { id: 1, name: 'documentation', description: 'Improvements or additions to documentation', color: '#0366d6' },
  { id: 2, name: 'enhancement', description: 'New feature or request', color: '#a2eeef' },
  { id: 3, name: 'good first issue', description: 'Good for newcomers', color: '#7057ff' },
  { id: 4, name: 'bug', description: 'Something isn\'t working', color: '#d73a4a' },
  { id: 5, name: 'duplicate', description: 'This issue or pull request already exists', color: '#cfd3d7' },
  { id: 6, name: 'help wanted', description: 'Extra attention is needed', color: '#008672' },
  { id: 7, name: 'invalid', description: 'This doesn\'t seem right', color: '#e4e669' },
  { id: 8, name: 'question', description: 'Further information is requested', color: '#d876e3' }
];

const LabelSelector = () => {
  const [selectedLabels, setSelectedLabels] = useState([]);
  const [filterText, setFilterText] = useState('');

  // 라벨 선택 토글
  const toggleLabelSelection = (labelId) => {
    setSelectedLabels(prev => 
      prev.includes(labelId) ? prev.filter(id => id !== labelId) : [...prev, labelId]
    );
  };

  // 필터링된 라벨 목록
  const filteredLabels = initialLabels.filter(label =>
    label.name.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <div className="label-selector">
      <h2>Labels</h2>
      <div className="selected-labels">
        {selectedLabels.map(labelId => {
          const label = initialLabels.find(label => label.id === labelId);
          return (
            <span 
              key={label.id} 
              className="selected-label" 
              style={{ backgroundColor: label.color }}
            >
              {label.name}
            </span>
          );
        })}
      </div>
      <input 
        type="text" 
        placeholder="Filter labels" 
        value={filterText} 
        onChange={(e) => setFilterText(e.target.value)} 
      />
      <div className="label-list">
        {filteredLabels.map(label => (
          <div 
            key={label.id} 
            className="label-item" 
            onClick={() => toggleLabelSelection(label.id)}
          >
            <input 
              type="checkbox" 
              checked={selectedLabels.includes(label.id)} 
              onChange={() => toggleLabelSelection(label.id)} 
            />
            <span 
              className="label-color" 
              style={{ backgroundColor: label.color }} 
            />
            <span className="label-name">{label.name}</span>
            <span className="label-description">{label.description}</span>
          </div>
        ))}
      </div>
      <button className="edit-labels-btn">Edit labels</button>
    </div>
  );
};

export default LabelSelector;

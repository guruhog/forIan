import React from 'react';
import ReactDOM from 'react-dom';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import { Segment, Label, Header } from 'semantic-ui-react';
import styled from 'styled-components';

const Phase = styled.div`
  position: relative;
  ${props =>
    props.inPortal
      ? `
    ::after {
      position: absolute;     
      bottom: 0;
      right: 0;     
    }
  `
      : ''};
`;

const portal = document.createElement('div');

if (!document.body) {
  throw new Error('body not ready for portal creation!');
}

document.body.appendChild(portal);

export default function Panel({ listId, phases, title, makeActive }) {
  return (
    <>
      <Header>{title}</Header>
      <Segment basic style={{ border: '1px solid #ccc', height: '70px', padding: '10px' }}>
        <Droppable droppableId={listId} type="CARD" direction="horizontal" isCombineEnabled={false}>
          {dropProvided => (
            <div {...dropProvided.droppableProps} style={{ height: '100%' }}>
              <div style={{ display: 'flex', height: '100%' }} ref={dropProvided.innerRef}>
                {phases.map((phase, index) => (
                  <Draggable key={phase._id} draggableId={phase._id} index={index}>
                    {(dragProvided, snapshot) => (
                      <Item
                        dragProvided={dragProvided}
                        snapshot={snapshot}
                        phase={phase}
                        makeActive={makeActive}
                      />
                    )}
                  </Draggable>
                ))}

                {dropProvided.placeholder}
              </div>
            </div>
          )}
        </Droppable>
      </Segment>
    </>
  );
}

const Item = ({ dragProvided, snapshot, phase, makeActive }) => {
  const usePortal = snapshot.isDragging;

  const child = (
    <Phase
      {...dragProvided.dragHandleProps}
      {...dragProvided.draggableProps}
      ref={dragProvided.innerRef}
      inPortal={usePortal}
    >
      <Label
        size="large"
        pointing="right"
        style={{ padding: '15px' }}
        onClick={() => makeActive(phase._id)}
        {...(phase.active ? { color: 'blue' } : '')}
      >
        {phase.title}
      </Label>
    </Phase>
  );

  if (!usePortal) {
    return child;
  }
  // if dragging - put the item in a portal
  return ReactDOM.createPortal(child, portal);
};

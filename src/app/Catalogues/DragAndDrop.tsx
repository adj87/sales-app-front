import React, { useState, useMemo } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export const DragAndDropList = ({ items, setItems }: any) => {
  return (
    <DragDropContext onDragEnd={(result: any) => onDragEnd(result, setItems, items)}>
      <Droppable droppableId="list">
        {(provided: any) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            <ItemsList items={items} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

const ItemsList = React.memo(function ItemsList({ items }: { items: any }) {
  return items.map((item: any, index: number) => <Item item={item} index={index} key={item.id} />);
});

const Item = ({ item, index }: any) => {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided: any) => (
        <div
          className="bg-primary-light text-center text-white rounded-md mt-2 shadow-2xl"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {item.name}
        </div>
      )}
    </Draggable>
  );
};

const onDragEnd = (result: any, setItems: any, list: any) => {
  if (!result.destination) {
    return;
  }

  if (result.destination.index === result.source.index) {
    return;
  }

  const quotes = reorder(list, result.source.index, result.destination.index);

  setItems(quotes);
};

const reorder = (list: any, startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

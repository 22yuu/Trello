import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{ isDragging: boolean }>`
  border-radius: 5px;
  padding: 10px 10px;
  margin-bottom: 5px;
  background-color: ${(props) =>
    props.isDragging ? "#74b9ff" : props.theme.cardColor};
  box-shadow: ${(porps) =>
    porps.isDragging ? "0px 2px 5px rgba(0,0,0,0.5)" : "none"};
`;

interface IDragabbleCardProps {
  toDoId: number;
  toDoText: string;
  index: number;
}

function DragabbleCard({ toDoId, toDoText, index }: IDragabbleCardProps) {
  //   console.log(toDo, "has been rendered");
  return (
    <Draggable draggableId={toDoId + ""} index={index}>
      {/* key와 draggableId 는 같아야 한다. */}
      {(magic, snapshot) => (
        <Card
          isDragging={snapshot.isDragging}
          ref={magic.innerRef}
          {...magic.draggableProps}
          {...magic.dragHandleProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);

/*
    toDos 배열 안에 [a,b,c,d,e,f]가 있다.
    여기서 만약 내가 f를 a와 위치를 변경하고자 할 때, a, f만 변하기 때문에
    변한 부분 즉, a,f의 위치만 리렌더링하만 된다.

    하지만 React memo를 사용하지 않으면, a와 f 위치를 바꾸면 모든 요소들이 리렌더링된다.
    
    전체적으로 리렌더링 시키게 되면 모든 todo들을 렌더링 해야하므로 리소스적으로 매우 비효율적이다.

    따라서 React.memo를 사용하여 해당 현상을 해결한다.

    React.memo는 리액트에게 prop이 변하지 않았다면 해당 요소는 (여기서는 DraggableCard) 다시 렌더링하지 않게 해주는 기능이다.

    React memo는 가끔 prop이 바뀌지 않는다면 다시 렌더링할 필요가 없는 component들에 사용하면 최적화하는데 도움이 된다!

    React memo를 사용할 때, function에서 export를 하면 안됨.
*/

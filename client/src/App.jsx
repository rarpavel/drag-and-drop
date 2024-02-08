import { useQuery, useMutation } from "@apollo/client";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { useEffect, useState, useCallback } from "react";
import {
  ModalItem,
  Loader,
  DroppableTitle,
  DraggableItem,
  ModalItemEdit,
} from "./components";
import {
  GET_DASHBOARD,
  MOVE_TASK,
  DELETE_TASK,
  CREATE_TASK,
  EDIT_TASK,
} from "./queries";

function App() {
  const { loading, data, refetch } = useQuery(GET_DASHBOARD);
  const [moveTask, { data: dataMove, loadingMove }] = useMutation(MOVE_TASK);
  const [deleteTask, { data: dataDelete, loadingDelete }] =
    useMutation(DELETE_TASK);
  const [createTask, { data: dataCreate, loadingCreate }] =
    useMutation(CREATE_TASK);
  const [editTask, { data: dataEdit, loadingEdit }] = useMutation(EDIT_TASK);
  const [list, setList] = useState([]);
  const [statusId, setStatusId] = useState(null);
  const [isShowItemModal, setIsShowItemModal] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isShowItemEditModal, setIsShowItemEditModal] = useState(false);
  const grid = 8;

  useEffect(() => {
    if (dataCreate) {
      setIsShowItemModal(false);
    }
  }, [dataCreate]);

  useEffect(() => {
    if (dataCreate || dataDelete || dataMove || dataEdit) {
      refetch();
    }
  }, [dataCreate, dataDelete, dataMove, dataEdit, refetch]);

  useEffect(() => {
    if (data) {
      setList(data?.getDashboard);
    }
  }, [data]);

  useEffect(() => {
    if (dataEdit) {
      setIsShowItemEditModal(false);
    }
  }, [dataEdit]);

  const onDragEnd = useCallback(
    (result) => {
      const { source, destination, ...rest } = result;
      const destinationTaskStatusId = destination?.droppableId;
      const sourceTaskStatusId = source?.droppableId;
      const destinationTaskOrder = destination?.index;
      const sourceTaskOrder = source?.index;
      const sourceTaskId = rest?.draggableId;

      if (
        destinationTaskStatusId === sourceTaskStatusId &&
        destinationTaskOrder === sourceTaskOrder
      ) {
        return;
      }

      const listOld = [...list];
      let sourceItem = null;
      const listNew = listOld?.map((statusItem) => {
        if (statusItem?.status?._id === sourceTaskStatusId) {
          sourceItem = statusItem?.tasks.filter(
            (item) => item._id === sourceTaskId,
          )[0];
          const newStatusItem = {
            ...statusItem,
            tasks: statusItem?.tasks.filter(
              (item) => item._id !== sourceTaskId,
            ),
          };
          return newStatusItem;
        }
        return statusItem;
      });
      const destinationList = listNew?.map((destinationItem) => {
        if (destinationItem?.status?._id === destinationTaskStatusId) {
          const tasks = [...destinationItem?.tasks];
          tasks.splice(destinationTaskOrder, 0, sourceItem);
          const newDestinationItem = {
            destinationItem,
            tasks,
          };
          return newDestinationItem;
        }
        return destinationItem;
      });
      setList(destinationList);
      setTimeout(() => {
        moveTask({
          variables: {
            sourceTaskId,
            sourceTaskStatusId,
            destinationTaskStatusId,
            destinationTaskOrder,
          },
        });
      }, 10);
    },
    [list, moveTask],
  );

  const getListStyle = (isDraggingOver) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    margin: grid,
    width: "25%",
  });

  const handleDeleteItem = (id) => {
    deleteTask({
      variables: { id },
    });
  };

  const handleEditItem = (item) => {
    setEditedItem(item);
    setIsShowItemEditModal(true);
  };

  const handleAddItem = ({ value }) => {
    createTask({
      variables: { name: value, status: statusId },
    });
  };

  const handleAddItemEdit = ({ value }) => {
    editTask({
      variables: { name: value, id: editedItem?._id },
    });
  };

  const handleOpenModalAddItem = (id) => {
    setIsShowItemModal(true);
    setStatusId(id);
  };

  return (
    <div className="flex flex-col w-screen h-full min-h-full overflow-auto text-gray-700 bg-gradient-to-tr from-blue-200 via-indigo-200 to-pink-200 relative">
      {loading ||
      loadingMove ||
      loadingDelete ||
      loadingCreate ||
      loadingEdit ? (
        <Loader />
      ) : null}
      <ModalItem
        handleAction={handleAddItem}
        handleClose={() => setIsShowItemModal(false)}
        show={isShowItemModal}
      />
      <ModalItemEdit
        valueProp={editedItem?.name}
        handleAction={handleAddItemEdit}
        handleClose={() => setIsShowItemEditModal(false)}
        show={isShowItemEditModal}
      />
      <div className="flex min-h-full">
        <DragDropContext onDragEnd={onDragEnd}>
          {list?.map((item, index) => (
            <Droppable
              key={item?.status?._id || index}
              droppableId={`${item?.status?._id || index}`}
            >
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <DroppableTitle
                    name={item?.status?.name}
                    action={() => handleOpenModalAddItem(item?.status?._id)}
                  />
                  {item?.tasks?.map((task, indexTask) => (
                    <Draggable
                      key={task._id}
                      draggableId={task._id}
                      index={indexTask}
                      name={task?.name}
                    >
                      {(provided) => (
                        <DraggableItem
                          item={task}
                          provided={provided}
                          actionDelete={() => handleDeleteItem(task._id)}
                          actionEdit={() => handleEditItem(task)}
                        />
                      )}
                    </Draggable>
                  ))}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;

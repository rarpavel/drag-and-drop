import Button, { buttonType } from "./Button";

export default function DraggableItem({
  provided,
  actionDelete,
  item,
  actionEdit,
}) {
  return (
    <div
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
      className="h-[75px] relative flex flex-col items-start p-4 mt-3 bg-white rounded-lg cursor-pointer bg-opacity-90 group hover:bg-opacity-100"
    >
      <div className="flex justify-between w-full items-center">
        {item?.name}
        <div>
          <Button type={buttonType.ok} action={actionEdit}>
            Edit
          </Button>
          <Button type={buttonType.cancel} action={actionDelete}>
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
}

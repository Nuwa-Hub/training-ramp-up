import * as React from "react";
import * as ReactDOM from "react-dom";
import {
  Grid,
  GridCellProps,
  GridColumn as Column,
  GridItemChangeEvent,
  GridToolbar,
} from "@progress/kendo-react-grid";

import { MyCommandCell } from "../helpers/MyCommandCell";
import {
  insertItem,
  getItems,
  updateItem,
  deleteItem,
} from "../helpers/Services";
import { Product } from "../helpers/interface";

const editField: string = "inEdit";

export const Table = () => {
  const [data, setData] = React.useState<Product[]>([]);

  React.useEffect(() => {
    let newItems = getItems();
    setData(newItems);
  }, []);

  // modify the data in the store, db etc
  const remove = (dataItem: Product) => {
    const newData = [...deleteItem(dataItem)];
    setData(newData);
  };

  const add = (dataItem: Product) => {
    dataItem.inEdit = true;

    const newData = insertItem(dataItem);
    setData(newData);
  };

  const update = (dataItem: Product) => {
    dataItem.inEdit = false;
    const newData = updateItem(dataItem);
    setData(newData);
  };

  // Local state operations
  const discard = () => {
    const newData = [...data];
    newData.splice(0, 1);
    setData(newData);
  };

  const cancel = (dataItem: Product) => {
    const originalItem = getItems().find(
      (p) => p.ProductID === dataItem.ProductID
    );
    const newData = data.map((item) =>
      item.ProductID === originalItem?.ProductID ? originalItem : item
    );

    setData(newData);
  };

  const enterEdit = (dataItem: Product) => {
    setData(
      data.map((item) =>
        item.ProductID === dataItem.ProductID ? { ...item, inEdit: true } : item
      )
    );
  };

  const itemChange = (event: GridItemChangeEvent) => {
    const newData = data.map((item) =>
      item.ProductID === event.dataItem.ProductID
        ? { ...item, [event.field || ""]: event.value }
        : item
    );

    setData(newData);
  };

  const addNew = () => {
    const newDataItem: Product = {
      inEdit: true,
      Discontinued: false,
      ProductID: 0,
    };

    setData([newDataItem, ...data]);
  };

  const CommandCell = (props: GridCellProps) => (
    <MyCommandCell
      {...props}
      edit={enterEdit}
      remove={remove}
      add={add}
      discard={discard}
      update={update}
      cancel={cancel}
      editField={editField}
    />
  );

  return (
    <Grid
      style={{ height: "520px" }}
      data={data}
      onItemChange={itemChange}
      editField={editField}
    >
      <GridToolbar>
        <button
          title="Add new"
          className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-error"
          onClick={addNew}
        >
          Add new
        </button>
      </GridToolbar>
      <Column field="ProductID" title="Id" width="100px" editable={false} />
      <Column field="ProductName" title="Product Name" width="200px" />
      <Column
        field="FirstOrderedOn"
        title="First Ordered"
        editor="date"
        format="{0:d}"
        width="150px"
      />
      <Column
        field="UnitsInStock"
        title="Units"
        width="120px"
        editor="numeric"
      />
      <Column field="Discontinued" title="Discontinued" editor="boolean" />
      <Column cell={CommandCell} width="300px" />
    </Grid>
  );
};

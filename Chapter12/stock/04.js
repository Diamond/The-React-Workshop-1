import React from "react";

const STORAGE_LIMIT = 10;

const Row = React.memo(props => {
  console.log("props");

  return (
    <div>
      {props.name} {props.weight}kg x {props.quantity}{" "}
      <button onClick={props.increase}>increase quantity</button>
    </div>
  );
});

const Stock = () => {
  const [storageLimit, setStorageLimit] = React.useState(STORAGE_LIMIT);
  const [stock, setStock] = React.useState([
    {
      product_name: "milk",
      weight: 1,
      quantity: 1
    },
    {
      product_name: "steak",
      weight: 3,
      quantity: 3
    }
  ]);

  return (
    <>
      <div>{storageLimit}</div>
      <button
        onClick={() => {
          setStock([]);
        }}
      >
        clear
      </button>
      <button
        onClick={() => {
          const newItem = {
            product_name: "lettuce",
            weight: 1,
            quantity: 3
          };

          const index = stock.findIndex(
            item => item.product_name === newItem.product_name
          );

          if (
            storageLimit - newItem.weight * newItem.quantity >= 0 &&
            index === -1
          ) {
            setStock(prevStock => {
              return [...prevStock, newItem];
            });

            setStorageLimit(storageLimit - newItem.weight * newItem.quantity);
          }
        }}
      >
        add item
      </button>
      {stock.map(item => {
        return (
          <Row
            key={item.product_name}
            name={item.product_name}
            weight={item.weight}
            quantity={item.quantity}
            increase={() => {
              if (storageLimit - item.weight >= 0) {
                setStock(prevStock => {
                  return prevStock.map(stockItem => {
                    if (stockItem.product_name === item.product_name) {
                      return {
                        ...stockItem,
                        quantity: stockItem.quantity + 1
                      };
                    }

                    return stockItem;
                  });
                });
                setStorageLimit(prevLimit => prevLimit - item.weight);
              }
            }}
          />
        );
      })}
    </>
  );
};

export default Stock;

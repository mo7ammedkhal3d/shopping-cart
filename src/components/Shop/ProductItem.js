import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { cartActions } from '../../store/cart-slice';

const ProductItem = (props) => {
  const { title, price, description, id } = props;

  const cartDispatch = useDispatch();

  const AddToCartHandler = () => {

    cartDispatch(cartActions.addItemtoCart({ 
      id: id, 
      title: title, 
      price: price,  
      description: description
    }));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>${price.toFixed(2)}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={AddToCartHandler}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;

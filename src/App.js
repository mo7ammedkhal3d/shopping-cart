import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'; 
import { sentCartData, fetchCartData } from './store/cart-actions';

let isInitial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartVisibility);
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {
    dispatch(fetchCartData());
  }, [dispatch])

  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }

    if (!cart.changed) {
      return;
    }
    
    dispatch(sentCartData(cart));

  }, [cart, dispatch]);

  return (
    <Fragment>
      {notification && <Notification 
        status={notification.status}
        title={notification.title} 
        message={notification.message}/>
      }
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </Fragment>

  );
}

export default App;

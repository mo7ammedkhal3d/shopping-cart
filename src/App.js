import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification'; 
import { sentCartData } from './store/cart-slice';

let isInitial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartVisibility);
  const cart = useSelector(state => state.cart);
  const uiDispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {

    if (isInitial) {
      isInitial = false;
      return;
    }
    
    uiDispatch(sentCartData(cart));

  }, [cart, uiDispatch]);

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

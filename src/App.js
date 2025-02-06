import { useSelector, useDispatch } from 'react-redux';
import { Fragment, useEffect } from 'react';
import { uiActions } from './store/ui-slice';
import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

 let isInitial = true;

function App() {

  const showCart = useSelector(state => state.ui.cartVisibility);
  const cart = useSelector(state => state.cart);
  const uiDispatch = useDispatch();
  const notification = useSelector(state => state.ui.notification);

  useEffect(() => {

    uiDispatch(uiActions.showNotification({
      status: 'pending',
      title: 'Sending...',
      message: 'Sending cart data'
    }));

    const sentCartData = async () => {
      const response = await fetch('https://react-http-e7d8f-default-rtdb.firebaseio.com/cart.json',{
        method: 'PUT',
        body: JSON.stringify(cart),
      }); 

      if (response.ok){
        throw new Error('Sending cart data failed.');
      }

      const responseData = await response.json();
    };

    uiDispatch(uiActions.showNotification({
      status: 'success',
      title: 'Success',
      message: 'Send cart data successfully'
    }));

    if (isInitial) {
      isInitial = false;
      return;
    }

    sentCartData().catch((error) => {
      uiDispatch(uiActions.showNotification({
        status: 'error',
        title: 'Error!',
        message: 'Send cart data failed'
      }));
    })

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

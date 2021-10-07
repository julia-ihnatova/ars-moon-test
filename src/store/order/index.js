
const order = {
    state:{
        order: {},
        orderId: null,
        customerId: null,
    },
    mutations: {
        setOrder(state, order){
            state.order = order
        },
        setCustomerId(state, order){
            state.customerId = order.customers_id
        },
        setOrderId(state, order){
            state.orderId = order.orders_id
        },
        updateOrder(state, order){
            state.order = order;
        },
        updateProduct(state, orderProduct){
            const productIndex = state.order.order_products.findIndex(x => x.products_id === orderProduct.productId);
            state.order.order_products[productIndex] = orderProduct.product;
            // console.log('mutation updateProduct',state.order.order_products)
        },
        deleteProduct(state, orderProductId){
            const productIndex = state.order.order_products.findIndex(x => x.products_id === orderProductId);
            state.order.order_products.splice(productIndex, 1);
        },
        addProduct(state, newProduct){
            state.order.order_products.push(newProduct)
        }
    },
    actions: {
        fetchOrder ({ commit }, id) {
            return axios
                .get(`/api/orders/${id}?
                with[]=order_sub_total&
                with[]=order_shipping&
                with[]=order_total&
                with[]=order_products.product:products_id,products_weight
                `)
                .then(response => {
                    commit('setOrder', response.data.data[0])
                    commit('setCustomerId', response.data.data[0])
                    commit('setOrderId', response.data.data[0])
                }).catch((error) => {
                    console.log(error);
                    console.warn('Request was not sent properly. Order is not present.');
                })
        },
        updateOrder(context, order){
            return axios
                .put(`/api/orders/${context.state.orderId}`,  order)
                .then((response) => {
                    console.log(response)
                    context.commit('updateOrder', order)
                })
                .catch(error => console.log(error))
        },
        updateOrderProducts(context, orderProduct){
            axios.put(`/api/orders_products/${orderProduct.orders_products_id}`, orderProduct)
                .then((response) => {
                    context.commit('updateProduct', {'productId': orderProduct.products_id, 'product':orderProduct})
                    context.state.order.order_sub_total.value = context.state.order.order_products.reduce(function(a, c){return a + Number((c.products_quantity*c.products_price) || 0)}, 0)
                    context.state.order.order_total.value = context.state.order.order_sub_total.value + context.state.order.order_shipping.value
                    context.dispatch('updateOrder', context.state.order);
                })
                .catch(err => {
                    console.log(err)
                })
        },
        deleteOrderProducts(context, payload){
            axios.delete(`/api/orders_products/${payload.orderProductId}`)
                .then((response) => {
                    context.commit('deleteProduct', payload.productId)
                    context.dispatch('fetchOrder', context.state.order.orders_id)
                })
                .catch(err => {
                    console.log(err)
                })
        },
        newProductAdd(context, newProduct){
            axios.post('/api/orders_products', newProduct)
                .then(response => {
                    let prod = response.data
                    context.commit('addProduct', prod)
                    context.dispatch('fetchOrder', prod.orders_id)
                })
        },

        newOrderAdd({ commit }, newOrder){
                newOrder.orders_id = Math.ceil(Math.random() * 10);
                newOrder.customerId = Math.ceil(Math.random() * 10);
                newOrder.order_products = [];
                newOrder.currency = 'US';
                newOrder.order_products = [];

                commit('setOrder', newOrder)
                commit('setCustomerId', newOrder)
                commit('setOrderId', newOrder);
        }
    },
    getters: {
        order: state => state.order,
        customerId: state => state.customerId,
        orderId:  state => state.orderId,
    }
}

export default order
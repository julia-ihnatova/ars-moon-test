const product = {
    state:{
        product: null,
        productId: null,
        productStatus: null,
        // priceHistoryData: null,
    },
    mutations: {
        setProduct(state, product){
            state.product = product
        },
        setProductId(state, product){
            state.productId = product.products_id
        },
        setProductStatus(state, status){
            state.productStatus = status
        },
        // setPriceHistoryData(state, priceHistoryData){
        //     state.priceHistoryData = priceHistoryData
        // }
    },
    actions: {
        fetchProduct ({ commit }, id) {
            return axios
                .get(`/api/products/?
                    filterGroups[0][field]=products_id
                    &filterGroups[0][filters][0][value]=${id}
                    &filterGroups[0][filters][0][condition]=EQUAL
                    &filterGroups[0][filters][0][type]=numericfilter
                    &filterGroups[0][filters][0][operator]=or
                    &filterGroups[0][operator]=or
                    &with[]=descriptions
                    &with[]=product_set
                    &with[]=ebay_categories
                    &with[]=products_parts`)
                .then(response => {
                    commit('setProduct', response.data.data[0])
                    commit('setProductId', response.data.data[0])
                    commit('setProductStatus', response.data.data[0].products_status.toString())
                }).catch((error) => {
                    console.log(error);
                    console.warn('Request was not sent properly. Product is not present.');
                })
        },
        // fetchPriceHistoryData({ commit, state }){
        //     return axios
        //         .get(`/api/products_price?
        //         filterGroups[0][field]=products_id
        //         &filterGroups[0][filters][0][value]=${state.productId}
        //         &filterGroups[0][filters][0][condition]=EQUAL
        //         &filterGroups[0][filters][0][type]=numericfilter
        //         &filterGroups[0][filters][0][operator]=or
        //         &filterGroups[0][operator]=and
        //         &filterGroups[1][field]=start
        //         &filterGroups[1][filters][0][value]=0
        //         &filterGroups[1][filters][0][condition]=EQUAL
        //         &filterGroups[1][filters][0][type]=numericfilter
        //         &filterGroups[1][filters][0][operator]=or
        //         &filterGroups[1][operator]=and
        //         &pagesize=100000`)
        //         .then(response => {
        //             console.log(response.data.data)
        //             commit('setPriceHistoryData', response.data.data)
        //         }).catch((error) => {
        //             console.log(error);
        //             console.warn('Request was not sent properly. Price Data is not present.');
        //         })
        //
        // },
        updateProductStatus({commit}, statusVal){
            commit('setProductStatus', statusVal.toString());
            //TODO update product
        }
    },
    getters: {
        product: state => state.product,
        productId:  state => state.productId,
        productStatus:  state => state.productStatus,
        // priceHistoryData: state => state.priceHistoryData,
    }

}

export default product;
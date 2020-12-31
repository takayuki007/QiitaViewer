// window.vue = require('vue');
//
// vue.component('search-component', require('./components/searchComponent.vue').default);
//
// const app = new Vue({
//     el: '#app',
// });
//
import Vue from 'vue';
import axios from 'axios';

new Vue({
    el: '#app',
    data: {
        userID: '',
        //存在しないユーザーの場合にアナウンスするため、空ではなくあえて初期状態は1を入れておく。
        datas: 1,
        message: '',
        article: ''
    },
    methods: {
        requestQiitaApi: function (){
            if (this.userID === ''){
                this.message = '入力フォームが空です。'
            }else if (!this.userID.match(/^[a-zA-Z0-9!-/:-@¥[-`{-~]*$/)){
                this.message = '入力フォームには半角英数字記号のみご利用いただけます。'
            }else {
                //messageに何か入っているといけないので、空にする。
                this.message = '';
                axios.get(`https://qiita.com/api/v2/users/${this.userID}/items?per_page=100`)
                    .then((res)=> {
                        this.datas = res.data;
                    })
                    .catch((res)=>{
                        console.error(res);
                    })
            }
        },
        // requestQiitaArticle: function (id){
        //     console.log(id);
        //     axios.get(`https://qiita.com/api/v2/items/${id}`)
        //         .then((res)=> {
        //             this.article = res.data;
        //         })
        //         .catch((res)=>{
        //             console.error(res);
        //         })
        //
        // }
    }
})
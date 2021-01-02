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
        title: '',
        article: '',
        tag: '',
        postMessage: '',
        yourToken: '',
        resArticles: [],

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
        postArticleApi: function (){
            if (this.yourToken === '' || this.title === '' || this.tag === '' || this.article === ''){
                this.postMessage = '全て入力必須です。'
            }else{
                this.postMessage = '';
                const ApiEndpoint = 'https://qiita.com/api/v2/items';
                // const QiitaToken = this.yourToken;
                const headers = {
                    'Authorization' : `Bearer ${this.yourToken}`,
                    'Content-Type': 'application/json'
                }
                const params = {
                    // body: this.article,
                    // private: true,
                    // title: 'test',
                    // tags: [
                    //     {
                    //         name: 'hoge',
                    //         versions: []
                    //     }
                    // ]
                    body: this.article,
                    coediting: false,
                    group_url_name: 'dev',
                    private: false,
                    tags: [
                        {
                            name: this.tag,
                            versions: []
                        }
                    ],
                    title: this.title,
                    tweet: false
                }
                const json = JSON.stringify(params);
                const jsonHeaders = JSON.stringify(headers);
                console.log(json);
                axios.post(ApiEndpoint,{json: json, headers: jsonHeaders})
                    .then((res)=> {
                        this.resArticles = res.data;
                        console.log(this.resArticles);
                    })
                    .catch(error=>{
                        // console.error(res);
                        console.log(error);
                        if (error){
                            this.postMessage = ' エラーが発生しました。後ほど再度お試しください。';
                        }
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
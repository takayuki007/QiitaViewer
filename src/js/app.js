import Vue from 'vue';
import axios from 'axios';
import marked from 'marked';

//APIの詳細はQiitaの記事を参照
//https://qiita.com/api/v2/docs
new Vue({
    el: '#app',
    data: {
        userID: '',
        //存在しないユーザーの場合にアナウンスするため、空ではなくあえて初期状態は1を入れておく。
        datas: 1,
        //エラーメッセージを入れる
        message: '',
        yourToken: '',
        title: '',
        tag: '',
        article: '',
        //エラーメッセージを入れる（エラー内容が違うため、別で設ける）
        postMessage: '',
        resArticles: [],
        articleFlg: false
    },
    methods: {
        //該当ユーザーの記事一覧を取り寄せる。
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
                    .catch(error=>{
                        if (error){
                            this.message = ' エラーが発生しました。後ほど再度お試しください。';
                        }
                    })
            }
        },
        //記事を投稿する
        postArticleApi: function (){
            if (this.yourToken === '' || this.title === '' || this.tag === '' || this.article === ''){
                this.postMessage = '全て入力必須です。'
            }else{
                //エラーメッセージに何か入っているといけないので削除する。
                this.postMessage = '';
                const ApiEndpoint = 'https://qiita.com/api/v2/items';
                const headers = {
                    'Authorization' : `Bearer ${this.yourToken}`,
                    'Content-Type': 'application/json'
                }
                const params = {
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
                axios.post(ApiEndpoint,{json: json, headers: jsonHeaders})
                    .then((res)=> {
                        this.resArticles = res.data;
                    })
                    .catch(error=>{
                        if (error){
                            this.postMessage = ' エラーが発生しました。後ほど再度お試しください。';
                        }
                    })
            }
        },
        //個別記事を表示する
        gotoArticle: function (id){
            axios.get(`https://qiita.com/api/v2/items/${id}`)
                .then((res)=>{
                    this.article = res.data;
                    //帰ってきた記事はマークダウン形式なので、HTMLに変換する
                    this.article = marked(this.article['body']);
                    //記事表示を行う。
                    this.articleFlg = true;
                })
                .catch(error=>{
                    if (error){
                        this.message = ' エラーが発生しました。後ほど再度お試しください。';
                    }
                })
        }
    }
})

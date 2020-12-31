<!--<template>-->
<!--  <div class="c-wrapper">-->
<!--    <form action="" class="c-searchForm" method="get">-->
<!--      <p class="c-title p-textWhite">Get Qiita's Article</p>-->
<!--      <div class="c-inputArea">-->
<!--        <i class="fas fa-search"></i>-->
<!--        <input type="text" class="c-inputText" v-model="userID" placeholder="ここにユーザーIDを入力">-->
<!--      </div>-->
<!--      <input type="submit" class="u-btn" value="検索" v-on:click="requestQiita">-->
<!--      <p class="c-smallText u-smallText">ユーザーIDでQiitaの記事を検索できます。</p>-->
<!--    </form>-->
<!--  </div>-->
<!--</template>-->

<!--<script>-->
<!--  import axios from "axios";-->

<!--  export default {-->
<!--    props:[],-->
<!--    data: function (){-->
<!--      return{-->
<!--        el: '#app',-->
<!--        data: {-->
<!--          userID: '',-->
<!--        },-->
<!--      }-->
<!--      methods:{-->
<!--        requestQiita: function(){-->
<!--          const datas = axios.get(`https://qiita.com/api/v2/users/${this.userID}/items?per_page=100`);-->
<!--        }-->
<!--      }-->

<!--    }-->
<!--  }-->
<!--</script>-->